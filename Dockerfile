
# ============================================================
# ETAPA 1: Construcción de Angular
# ============================================================
FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Elimina dependencias de desarrollo para la imagen final
RUN npm prune --omit=dev


# ============================================================
# ETAPA 2: Ejecución de Angular SSR
# ============================================================
FROM node:24-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 4000

CMD ["node", "dist/mi_foro_angular/server/server.mjs"]
