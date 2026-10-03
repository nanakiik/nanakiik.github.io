---
title: 不实用工具(仅音视频)
createdAt: 2023-07-23
category: uncategorized
tags: [cheatsheet]
summary: 不实用小工具及其常见用法
---

### 通用工具

[mediainfo](https://mediaarea.net/en/MediaInfo)
```
mediainfo --Details=1 --Output=XML 1.h264
```

[ffmpeg](https://ffmpeg.org/)
```
ffmpeg -i input.mp4 output.avi
ffprobe -formats

ffprobe -f h264 -show_frames  -show_data -select_streams v:0 1.h264
ffprobe -f aac -show_frames  -show_data -select_streams a:0 1.aac
```



[magick](https://imagemagick.org/command-line-tools)
```
magick identify -verbose 1.png
magick 1.png -depth 8 rgb:1.rgb
```

[exiftool](https://exiftool.org)
```code
exiftool -v5 1.png
```


[gpac](https://github.com/gpac/gpac)
```
mp4box -info 0.mp4
gpac -info 0.mp4  
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

[jxl](https://github.com/libjxl/libjxl)
```
jxlinfo -v 1.jxl
```

[isobmff](https://github.com/MPEGGroup/isobmff)
```
isoiff_tool -m 1  -o 1.txt -d 5 -i 0.mp4
```

## 视频

[h264](https://www.itu.int/rec/T-REC-H.264)
[h265](https://www.itu.int/rec/T-REC-H.265)
