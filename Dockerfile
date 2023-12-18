COPY .turbo node_modules

COPY package.json pnpm-lock.yaml ./package.json ./pnpm-lock.yaml
RUN npm install turbo pnpm

RUN pnpm install

CMD ["turbo", "run", "dev"]
