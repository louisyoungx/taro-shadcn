#!/bin/bash
set -Eeuo pipefail

start_service() {
    cd "${COZE_WORKSPACE_PATH}/server/dist"

    local port="${DEPLOY_RUN_PORT:-3000}"
    echo "Starting Static File Server on port ${port} for deploy..."

    node ./main.js -p "${port}"
}

echo "Starting HTTP service for deploy..."
start_service
