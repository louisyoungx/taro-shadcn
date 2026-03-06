#!/bin/bash
echo "⚙️ dev_run.sh 开始运行"
set -Eeuo pipefail

cd "${COZE_WORKSPACE_PATH}"

# ---------------------------------------------------------
# PID 文件，用于追踪上一次启动的进程树
# ---------------------------------------------------------
PID_FILE="/tmp/coze-dev-run.pid"

# ---------------------------------------------------------
# 工具函数
# ---------------------------------------------------------
kill_process_tree() {
    local pid=$1
    local children
    children=$(pgrep -P "${pid}" 2>/dev/null || true)
    for child in ${children}; do
        kill_process_tree "${child}"
    done
    if kill -0 "${pid}" 2>/dev/null; then
        echo "Killing PID ${pid}"
        kill -9 "${pid}" 2>/dev/null || true
    fi
}

kill_port_if_listening() {
    local port=$1
    local pids
    pids=$(ss -H -lntp 2>/dev/null | awk -v port="${port}" '$4 ~ ":"port"$"' | grep -o 'pid=[0-9]*' | cut -d= -f2 | sort -u | paste -sd' ' - || true)
    if [[ -z "${pids}" ]]; then
        echo "Port ${port} is free."
        return
    fi
    echo "Port ${port} in use by PIDs: ${pids}"
    for pid in ${pids}; do
        kill_process_tree "${pid}"
    done
    sleep 1
    pids=$(ss -H -lntp 2>/dev/null | awk -v port="${port}" '$4 ~ ":"port"$"' | grep -o 'pid=[0-9]*' | cut -d= -f2 | sort -u | paste -sd' ' - || true)
    if [[ -n "${pids}" ]]; then
        echo "Warning: port ${port} still busy after cleanup, PIDs: ${pids}"
    else
        echo "Port ${port} cleared."
    fi
}

# ---------------------------------------------------------
# 1. 清理上一次运行残留的整棵进程树
# ---------------------------------------------------------
cleanup_previous_run() {
    # 1a. 通过 PID 文件清理上次的进程树
    if [[ -f "${PID_FILE}" ]]; then
        local old_pid
        old_pid=$(cat "${PID_FILE}" 2>/dev/null || true)
        if [[ -n "${old_pid}" ]] && kill -0 "${old_pid}" 2>/dev/null; then
            echo "🧹 Killing previous dev process tree (root PID: ${old_pid})..."
            kill_process_tree "${old_pid}"
        fi
        rm -f "${PID_FILE}"
    fi

    # 1b. 兜底：按特征匹配清理所有残留的相关进程（排除自身）
    echo "🧹 Cleaning up any orphaned dev processes..."
    local patterns=(
        "pnpm dev"
        "concurrently.*dev:web.*dev:server"
        "nest start --watch"
        "taro build --type h5 --watch"
        "node --enable-source-maps.*/workspace/projects/server/dist/main"
        "esbuild --service.*--ping"
    )
    for pattern in "${patterns[@]}"; do
        local pids
        pids=$(pgrep -f "${pattern}" 2>/dev/null || true)
        for pid in ${pids}; do
            # 不杀自己和自己的父进程链
            if [[ "${pid}" != "$$" ]] && [[ "${pid}" != "${PPID}" ]]; then
                echo "  Killing orphan PID ${pid} matching '${pattern}'"
                kill -9 "${pid}" 2>/dev/null || true
            fi
        done
    done
    sleep 1
}

# ---------------------------------------------------------
# 2. 安装依赖
# ---------------------------------------------------------
echo "📦 Installing dependencies..."
pnpm install
echo "✅ Dependencies installed successfully!"

# ---------------------------------------------------------
# 3. 清理旧进程 + 端口
# ---------------------------------------------------------
SERVER_PORT=3000

cleanup_previous_run

echo "Clearing port ${DEPLOY_RUN_PORT} (web) before start."
kill_port_if_listening "${DEPLOY_RUN_PORT}"
echo "Clearing port ${SERVER_PORT} (server) before start."
kill_port_if_listening "${SERVER_PORT}"

# ---------------------------------------------------------
# 4. 退出时自动清理子进程（信号 trap）
# ---------------------------------------------------------
cleanup_on_exit() {
    echo "🛑 dev_run.sh exiting, cleaning up child processes..."
    # 杀掉当前脚本的所有子进程
    kill -- -$$ 2>/dev/null || true
    rm -f "${PID_FILE}"
    exit 0
}
trap cleanup_on_exit EXIT INT TERM HUP

# ---------------------------------------------------------
# 5. 启动服务
# ---------------------------------------------------------
start_service() {
    cd "${COZE_WORKSPACE_PATH}"

    # 动态注入环境变量
    if [ -n "${COZE_PROJECT_DOMAIN_DEFAULT:-}" ]; then
        export PROJECT_DOMAIN="$COZE_PROJECT_DOMAIN_DEFAULT"
        echo "✅ 环境变量已动态注入: PROJECT_DOMAIN=$PROJECT_DOMAIN"
    else
        echo "⚠️  警告: COZE_PROJECT_DOMAIN_DEFAULT 未设置，使用 .env.local 中的配置"
    fi

    # 启动 Taro H5 和 NestJS Server
    echo "Starting Taro H5 Dev Server and NestJS Server..."

    export PORT=${DEPLOY_RUN_PORT}
    rm -f /tmp/coze-logs/dev.log
    mkdir -p /tmp/coze-logs

    # 后台启动并记录 PID
    pnpm dev 2>&1 | tee /tmp/coze-logs/dev.log &
    local dev_pid=$!
    echo "${dev_pid}" > "${PID_FILE}"
    echo "📝 Dev process started with PID: ${dev_pid} (saved to ${PID_FILE})"

    # 前台等待，保证 trap 能正常捕获信号
    wait "${dev_pid}" || true
}

echo "Starting HTTP services on port ${DEPLOY_RUN_PORT} (web) and ${SERVER_PORT} (server)..."
start_service
