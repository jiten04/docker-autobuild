FROM firstandthird/node:8.9-2-onbuild

USER root
RUN apk add --update docker curl bash py-pip curl-dev

RUN pip install docker-compose

RUN curl https://raw.githubusercontent.com/firstandthird/docker-builder/2.6.0/builder > /home/app/builder
RUN chmod +x /home/app/builder

ENV PORT=8080
ENV SECRET=""
ENV GITHUB_TOKEN=""
ENV REPOS=/repos
ENV NODE_ENV production

VOLUME /repos

EXPOSE 8080
