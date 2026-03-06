# build_weapp.sh - 通过 PID 文件精确杀掉自己上次的构建进程
export OUTPUT_ROOT=dist
PID_FILE="/tmp/coze-build_weapp.pid"

# 杀掉上次的构建进程组
if [ -f "$PID_FILE" ]; then
    OLD_PID=$(cat "$PID_FILE")
    if kill -0 "$OLD_PID" 2>/dev/null; then
        echo "正在终止上次的构建进程组 (PID: $OLD_PID)..."
        # 关键：kill 负数 PID = 杀掉整个进程组
        kill -9 -"$OLD_PID" 2>/dev/null
        sleep 1
    fi
    rm -f "$PID_FILE"
fi

# 用 setsid 创建新的进程组，方便下次整组杀掉
setsid pnpm build:weapp &
echo $! > "$PID_FILE"

echo "构建已启动 (PID: $(cat $PID_FILE))"

wait $!
rm -f "$PID_FILE"
