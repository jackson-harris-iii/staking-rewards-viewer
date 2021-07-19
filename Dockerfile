FROM node:lts as dependencies
WORKDIR /staking-rewards-viewer
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /staking-rewards-viewer
COPY . .
COPY --from=dependencies /staking-rewards-viewer/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /staking-rewards-viewer
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /staking-rewards-viewer/next.config.js ./
COPY --from=builder /staking-rewards-viewer/public ./public
COPY --from=builder /staking-rewards-viewer/.next ./.next
COPY --from=builder /staking-rewards-viewer/node_modules ./node_modules
COPY --from=builder /staking-rewards-viewer/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]