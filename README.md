# start sites

```bash
docker-compose up -d
```

Run the site on http://localhost:4000

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
