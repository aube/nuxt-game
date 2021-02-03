FROM node:12-alpine

ENV APP_ROOT /app
ENV NODE_ENV production

WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN npm install && npm audit fix
RUN npm run build

EXPOSE 3000

ENV HOST 0.0.0.0

CMD ["npm", "run", "start"]