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

---

[cmake](https://cmake.org/cmake/help/latest/)
```
cmake -S . -B build -A x64
cmake --build build --config Release 
```

---

[git](https://git-scm.com/)
```
git config --global --list
git config user.name makishinanakishi
git config user.email makishinanakishi@outlook.com
git config user.signingkey ~/.ssh/makishi.pub
git config --list --show-origin

git push origin :refs/tags/v0.1.0 删除远程tag
git tag -d v0.1.0 删除本地tag
git push origin v0.1.0 推送tag
git tag v0.1.0 新建tag

git remote set-url origin <url>

git submodule add <url> <name>
git submodule update --init --recursive --depth 1
```

---

## 音视频图片领域的工具及一些用法

### 通用工具

[ffmpeg](https://ffmpeg.org/)
```
ffmpeg -i input.mp4 output.avi
ffprobe -formats
```

[exiftool](https://exiftool.org)
```code
exiftool -v5 1.png
```

[magick](https://imagemagick.org/command-line-tools)
```
magick identify -verbose 1.png
magick 1.png -depth 8 rgb:1.rgb
```
[mediainfo](https://mediaarea.net/en/MediaInfo)
```
mediainfo -f 1.png
```

### 非通用工具

[pngcheck](https://github.com/pnggroup/pngcheck)
```
pngcheck -cvvt 1.png
```

[flac](https://github.com/xiph/flac)
```
metaflac --list --except-block-type=PICTURE 1.flac 
flac -a 1.flac
flac -8 -V --keep-foreign-metadata *.wav
flac -d  --keep-foreign-metadata *.flac   (flac->wav)
```

[mkvtoolnix](https://mkvtoolnix.download/docs.html)
```
mkvinfo -v 1.mkv

```
[webpinfo](https://github.com/webmproject/libwebp)
```
webpinfo  -summary -bitstream_info 1.webp
```

[avif](https://github.com/aomediacodec/libavif)
```
avifdec -i 1.avif
```