FROM node:alpine AS build

# install turbo and pnpm
RUN npm install -g turbo pnpm

WORKDIR /app

# set env
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Run build
COPY . ./
RUN turbo run build

# Run project
COPY .next ./.next
CMD ["turbo", "run", "dev"]
