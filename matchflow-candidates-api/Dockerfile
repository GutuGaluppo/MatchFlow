FROM node:22-alpine
WORKDIR /app
COPY package.json tsconfig.json ./
COPY src ./src
COPY data/seed-candidates.json ./data/seed-candidates.json
ENV HOST=0.0.0.0 PORT=4000
EXPOSE 4000
CMD ["node", "--experimental-strip-types", "src/index.ts"]
