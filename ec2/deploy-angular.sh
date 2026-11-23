
#!/usr/bin/env bash
set -Eeuo pipefail

AWS_REGION=""
SERVICE=""
IMAGE=""
CONTAINER_NAME="mi-foro-angular"
HOST_PORT="4000"
CONTAINER_PORT="4000"

while (($#)); do
  case "$1" in
    --region) AWS_REGION="${2:?}"; shift 2 ;;
    --service) SERVICE="${2:?}"; shift 2 ;;
    --image) IMAGE="${2:?}"; shift 2 ;;
    --container-name) CONTAINER_NAME="${2:?}"; shift 2 ;;
    --host-port) HOST_PORT="${2:?}"; shift 2 ;;
    --container-port) CONTAINER_PORT="${2:?}"; shift 2 ;;
    *)
      echo "ERROR: Argumento desconocido: $1" >&2
      exit 2
      ;;
  esac
done

[[ -n "$AWS_REGION" ]] || { echo "Falta --region"; exit 2; }
[[ "$SERVICE" == "angular" ]] || { echo "Servicio inválido"; exit 2; }
[[ -n "$IMAGE" ]] || { echo "Falta --image"; exit 2; }

REGISTRY="${IMAGE%%/*}"

echo "Desplegando Angular..."
echo "Imagen: $IMAGE"

aws ecr get-login-password --region "$AWS_REGION" \
  | docker login --username AWS --password-stdin "$REGISTRY"

docker pull "$IMAGE"

docker stop "$CONTAINER_NAME" 2>/dev/null || true
docker rm "$CONTAINER_NAME" 2>/dev/null || true

docker run -d \
  --name "$CONTAINER_NAME" \
  --restart unless-stopped \
  -e NODE_ENV=production \
  -e PORT="$CONTAINER_PORT" \
  -p "127.0.0.1:${HOST_PORT}:${CONTAINER_PORT}" \
  "$IMAGE"

echo "Esperando respuesta de Angular..."

for attempt in $(seq 1 30); do
  if curl -fsS "http://127.0.0.1:${HOST_PORT}/" >/dev/null; then
    echo "Angular está funcionando."
    exit 0
  fi
  sleep 2
done

echo "ERROR: Angular no respondió."
docker logs --tail 100 "$CONTAINER_NAME" || true
exit 1
