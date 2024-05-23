---
layout: post
title: Extract json value by using python
tags: ["bash","python","json"]
---
Use python json library

```bash
echo '{"hostname":"test","domainname":"example.com"}' | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["hostname"]'
```

Multiple dimension array

```bash
echo '{"hostname":"test","domainname":"example.com","tags":{"name":"domain","description":"example domain"}}' | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["tags"]["name"]'
```

See more:
- [https://stackoverflow.com/questions/1955505/parsing-json-with-unix-tools](https://stackoverflow.com/questions/1955505/parsing-json-with-unix-tools)
