FROM yarnpkg/node-yarn:node7

# dumb-init makes it easier to use interactive containers, e.g. hit Ctrl+C to kill a container
RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64
RUN chmod +x /usr/local/bin/dumb-init

# This dockerfile runs yarn install to cache the node_modules for CI.  CI will use this image to run the build

ENV HOME=/home/node

COPY package.json yarn.lock $HOME/project/

WORKDIR $HOME/project

RUN yarn install

ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]

CMD ["yarn", "start"]
