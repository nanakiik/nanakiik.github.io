---
title: 不实用工具
createdAt: 2023-07-23
category: uncategorized
tags: [cheatsheet]
summary: 不实用小工具及其常见用法
---

[static-web-server](https://github.com/static-web-server/static-web-server)
```
static-web-server --root . -p 1234 -a 127.0.0.1
```

[cmake](https://cmake.org/cmake/help/latest/)
```
cmake -S . -B build  -G Ninja -A x64 -DCMAKE_EXPORT_COMPILE_COMMANDS=ON
cmake --build build --config Release 
cmake --install build

cmake .. --graphviz=dot & dot Tsvg dot -o dot.svg

cmake --find-package -DNAME=ZLIB -DCOMPILER_ID=GNU -DLANGUAGE=C -DMODE=LINK
```

[git](https://git-scm.com/)
```
git config --global --list
git config user.name makishinanakishi
git config user.email makishinanakishi@outlook.com
git config user.signingkey ~/.ssh/makishi.pub
git config gpg.format ssh
git config commit.gpgsign true

git config --list --show-origin

git push origin :refs/tags/v0.1.0 删除远程tag
git tag -d v0.1.0 删除本地tag
git push origin v0.1.0 推送tag
git tag v0.1.0 新建tag

git remote set-url origin <url>

git submodule add --depth 1 <url> <name>
git submodule update --init --recursive --depth 1 --recommend-shallow
```

[wireshark](https://www.wireshark.org/docs/man-pages/)
```
tshark -D
tshark -i 5 -f "host 1.1.1.1 and tcp port 80"
```

[curl](https://curl.se/docs/manpage.html)
```
curl -x "" -v -4 http://example.com
```


[wsl](https://github.com/microsoft/WSL)
```
https://learn.microsoft.com/en-us/windows/wsl/wsl-config
wslc
```

[yt-dlp](https://github.com/yt-dlp/yt-dlp)
```
yt-dlp --skip-download  --write-pages 
yt-dlp --list-extractors
```