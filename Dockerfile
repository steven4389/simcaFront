
# stage 1

FROM node:14-alpine AS simca-front
WORKDIR /app
COPY . .
RUN npm run build

# stage 2

FROM nginx:alpine
COPY --from=simca-front /app/dist/app-to-run-inside-docker /usr/share/nginx/html
EXPOSE 80