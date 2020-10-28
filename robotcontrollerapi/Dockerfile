FROM node:latest
RUN mkdir /robotcontrollerapi
WORKDIR /robotcontrollerapi
COPY ./package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "app.js" ]