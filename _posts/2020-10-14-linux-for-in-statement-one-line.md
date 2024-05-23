---
layout: post
title: Linux `for in` statement one line
tags: ["bash","linux","one-line"]
---
Normal statement

```bash
START=1
END=100
INCREASE=1
for i in $(seq $START $INCREASE $END); do echo $i; done;
```

Write one line like that
```bash
for i in $(seq 0 1 100); do echo $i; done;
```

For in from 100 to 0
```bash
for i in $(seq 100 -1 0); do echo $i; done;
```

Three-expression bash for loops syntax to improve performance (increase each step by one)
```bash
for (( c=1; c<=500000000000; c++ )); do echo "$c"; done;
```

Increase each step more than one
```bash
for (( c=0; c<=500000000000; ((c+=10)) )); do echo "$c"; done;
```

See more:
- [https://www.cyberciti.biz/faq/bash-for-loop/](https://www.cyberciti.biz/faq/bash-for-loop/)
