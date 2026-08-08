 FROM node:20

WORKDIR /app

RUN npm install -g pnpm

# copy dependency files first
COPY package.json pnpm-lock.yaml* ./

# install dependencies
RUN pnpm install --shamefully-hoist

# copy rest of the project
COPY . .

EXPOSE 5173

CMD ["pnpm", "dev", "--host"]