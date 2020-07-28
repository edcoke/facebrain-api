FROM node:12.16.1

WORKDIR /usr/src/facebrain-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]
