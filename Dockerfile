# Multistage docker file to build this site and then host it with nginx.
# Build with `docker build -t {name} .`
# Run with `docker run --rm -p 8080:80 {name}` then navigate to http://localhost:8080 in a browser.

## Build site with jekyll and github pages in first stage and name this stage 'builder'
FROM alpine:latest AS builder

### Make a work directory called "site" and copy this repo's files into it
WORKDIR /site
COPY ./ /site

### Install all dependencies
RUN apk update && \
    apk --update add \
    gcc \
    g++ \
    make \
    curl \
    bison \
    ca-certificates \
    tzdata \
    ruby \
    ruby-rdoc \
    ruby-irb \
    ruby-bundler \
    ruby-nokogiri \
    ruby-dev \
    glib-dev \
    zlib-dev \
    libc-dev && \
    echo 'gem: --no-document' > /etc/gemrc && \
    gem install github-pages --version 226 && \
    gem install jekyll-watch && \
    gem install jekyll-admin && \
    apk del gcc g++ binutils bison perl nodejs make curl && \
    rm -rf /var/cache/apk/*

### Build the site
RUN jekyll build


## Final stage, hosts the site with nginx
FROM nginx:alpine

### Copy build artifacts from builder stage into nginx html directory for hosting
COPY --from=builder /site/_site /usr/share/nginx/html/

### Run nginx in foreground so container doesn't immediately exit.
CMD ["nginx", "-g", "daemon off;"]
