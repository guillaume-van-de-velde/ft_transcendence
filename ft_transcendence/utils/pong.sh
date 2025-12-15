#!/bin/bash

API_URL="http://localhost:4400/api/game"
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInZlcnNpb24iOjEsImlhdCI6MTc2NDg4NDc3OSwiZXhwIjoxNzY0OTcxMTc5fQ.XjaAdi5f3AgIbiQxXhGt0Z_rVLcueB9zWZYjlofHHNc"

moveUp() {
  curl -s -X POST "$API_URL/move" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"direction":"up"}'
}

moveDown() {
  curl -s -X POST "$API_URL/move" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"direction":"down"}'
}

stopUp() {
  curl -s -X POST "$API_URL/stop" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"direction":"up"}'
}

stopDown() {
  curl -s -X POST "$API_URL/stop" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"direction":"down"}'
}

case "$1" in
  moveUp) moveUp ;;
  moveDown) moveDown ;;
  stopUp) stopUp ;;
  stopDown) stopDown ;;
  *)
    echo "Usage : ./pong.sh {moveUp|moveDown|stopUp|stopDown}"
    ;;
esac
