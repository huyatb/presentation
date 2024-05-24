---
layout: post
title: Use jekyll with docker
---

# Create [.Dockerfile](/present/.Dockerfile)

```Dockerfile
FROM jekyll/jekyll

# Set the working directory
WORKDIR /app
RUN gem install bundler webrick \
```

# Create [docker-compose.yml](/present/docker-compose.yml)

```yaml
version: '3'
services:
  jekyll:
    build:
        context: .
        dockerfile: .Dockerfile
    image: jekyll-build
    container_name: jekyll
    working_dir: /app
    volumes:
      - ./:/app
    ports:
      - "4000:4000"
    command: "bundle exec jekyll serve --host 0.0.0.0 --trace --incremental"
```

# Create new blog

```bash
docker-compose run --rm jekyll jekyll new blog --force
```

# Copy file from blog to present

```bash
cp -r blog/* ./
sudo rm -rf blog
sudo chmod 777 -R .
```

# Add gem to Gemfile

```bash
docker-compose run --rm jekyll bundle add webrick
```

# Run jekyll

```bash
docker-compose up
```

# Open browser and access to [your blog](http://localhost:4000/present/)

# override the default template

- Show the default template location: `/usr/gem/gems/minima-2.5.1`
```bash
docker-compose run --rm jekyll bundle info minima
```

- Override the default template by copying the default template to the `_layouts` folder

```bash
docker-compose run --rm jekyll cp -r /usr/gem/gems/minima-2.5.1/_layouts .
docker-compose run --rm jekyll cp -r /usr/gem/gems/minima-2.5.1/_sass .
```

# References:
- [https://jekyllrb.com/docs/installation/docker/](https://jekyllrb.com/docs/installation/docker/)
- [https://jekyllrb.com/](https://jekyllrb.com/)
- [https://pages.github.com/](https://pages.github.com/)
- [https://www.markdownguide.org/tools/jekyll/](https://www.markdownguide.org/tools/jekyll/)
- [https://en.wikipedia.org/wiki/History_of_writing](https://en.wikipedia.org/wiki/History_of_writing)
- [https://talk.jekyllrb.com/t/jekyll-showcase-share-your-sites-built-with-jekyll/44/1](https://talk.jekyllrb.com/t/jekyll-showcase-share-your-sites-built-with-jekyll/44/1)
- [https://github.com/jekyll/minima/tree/2.5-stable](https://github.com/jekyll/minima/tree/2.5-stable)
