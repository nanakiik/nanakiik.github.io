---
title: ffmpeg编译
createdAt: 2025-07-23
category: tools
tags: [cheatsheet,tutorial]
summary: Windows下使用Clang编译FFmpeg静态库
---


# Windows 下使用 Clang 编译 FFmpeg 静态库

本文用于在 **Windows + Git for Windows (Git Bash) + LLVM/Clang** 环境下编译 FFmpeg。

目标：
* 使用 LLVM/Clang
* 使用 Ninja + CMake
* 生成 FFmpeg 静态库
* 不生成 FFmpeg 命令行程序
* 安装到 `C:\ffmpeg`

最终得到：

```text
C:\ffmpeg\
├── include\
└── lib\
    ├── avcodec.lib
    ├── avdevice.lib
    ├── avfilter.lib
    ├── avformat.lib
    ├── avutil.lib
    ├── postproc.lib
    ├── swresample.lib
    └── swscale.lib
```

---

## 1. 准备环境

需要安装：

* Git for Windows
* LLVM/Clang
* CMake
* Ninja

### Git Bash

本文所有 FFmpeg 编译命令均在：

```text
Git Bash
```

中执行。

不要使用 Windows CMD 直接执行下面的 shell 命令。

检查 Git：

```bash
git --version
```

检查 Clang：

```bash
clang --version
clang++ --version
```

确认输出类似：

```text
clang version ...
Target: x86_64-pc-windows-msvc
```

检查 CMake：

```bash
cmake --version
```

检查 Ninja：

```bash
ninja --version
```

---

## 2. Clone FFmpeg 源代码

建议使用浅克隆：

```bash
git clone --depth 1 https://github.com/FFmpeg/FFmpeg.git
```

进入源码目录：

```bash
cd FFmpeg
```

如果希望固定某个 FFmpeg 版本，也可以 checkout 对应 tag。

例如：

```bash
git fetch --depth 1 origin tag/nX.Y.Z
git checkout nX.Y.Z
```

---

## 3. 配置 FFmpeg

在 `build` 目录执行：


```bash
./configure --cc=clang --toolchain=llvm --target-os=win64 --arch=x86_64 --extra-ldflags="-fuse-ld=lld" --prefix=/c/ffmpeg --enable-static --disable-shared --disable-programs --disable-doc --enable-gpl
```

### 主要参数

```text
--cc=clang
```

使用 Clang。

```text
--toolchain=llvm
```

使用 LLVM 工具链。

```text
--target-os=win64
--arch=x86_64
```

目标平台为 Windows 64-bit。

```text
--extra-ldflags="-fuse-ld=lld"
```

使用 LLVM 的 lld linker。

```text
--enable-static
--disable-shared
```

只生成静态库，不生成 DLL。

```text
--disable-programs
```

不编译 `ffmpeg.exe`、`ffprobe.exe` 等命令行程序。

```text
--disable-doc
```

不编译文档。

```text
--prefix=/c/ffmpeg
```

安装到：

```text
C:\ffmpeg
```

---

## 4. 注意不要使用 MinGW 配置

不要配置成：

```text
--target-os=mingw32
```

当前环境使用的是 Windows 原生 LLVM/Clang：

```text
x86_64-pc-windows-msvc
```

因此使用：

```text
--target-os=win64
--toolchain=llvm
```

如果配置过程中出现类似：

```text
lld-link: warning: ignoring unknown argument '--image-base'
```

或者：

```text
lld-link: error: could not open '0x140000000'
```

通常是 GNU/MinGW 风格参数和 Windows `lld-link` 不匹配导致的，需要检查 configure 参数。

---

## 5. 编译

配置成功后,如果 CPU 核心比较多时，可以：

```bash
make -j$(nproc)
```

也可以指定线程数：

```bash
make -j8
```

编译过程中会产生大量中间文件，这是正常的。

---

## 6. 安装

编译完成后：

```bash
make install
```

由于安装目录：

```text
C:\ffmpeg
```

可能需要管理员权限。

如果 Git Bash 没有权限写入：

```text
C:\ffmpeg
```

可以：

* 使用管理员权限启动 Git Bash
* 或者把 `--prefix` 改到当前用户有权限的目录

例如：

```text
--prefix=/c/Users/<用户名>/ffmpeg
```

---

## 7. 检查安装结果

安装成功后：

```bash
ls -lh /c/ffmpeg/lib/
```

应该看到以下 8 个静态库：

```text
avcodec.lib
avdevice.lib
avfilter.lib
avformat.lib
avutil.lib
postproc.lib
swresample.lib
swscale.lib
```

同时应该存在：

```text
C:\ffmpeg\include\
```

里面包含：

```text
libavcodec/
libavdevice/
libavfilter/
libavformat/
libavutil/
libpostproc/
libswresample/
libswscale/
```

---

## 8. CMake 项目

回到自己的 C++ 项目目录：

```bash
cd /path/to/your/project
```

建议删除旧的 CMake build：

```bash
rm -rf build
```

然后使用 Clang + Ninja：

```bash
cmake -S . -B build -G Ninja -DCMAKE_EXPORT_COMPILE_COMMANDS=ON -DCMAKE_CXX_COMPILER="C:/Program Files/LLVM/bin/clang++.exe"
```

编译：

```bash
cmake --build build
```

---

## 9. 生成 clangd 所需的 compile_commands.json

上面的参数：

```text
-DCMAKE_EXPORT_COMPILE_COMMANDS=ON
```

会生成：

```text
build/compile_commands.json
```

这样 clangd 可以正确获得：

* C++ 标准
* Clang 编译器
* FFmpeg include 路径
* 编译参数

---

## 10. 确认 CMake 使用的是 Clang

执行：

```bash
cmake --build build -v
```

应该看到：

```text
C:\Program Files\LLVM\bin\clang++.exe
```

不要看到：

```text
g++.exe
```

或者：

```text
x86_64-w64-mingw32-ld.exe
```

如果之前 CMake 使用过 MinGW，建议直接删除：

```bash
rm -rf build
```

然后重新配置：

```bash
cmake -S . -B build -G Ninja -DCMAKE_EXPORT_COMPILE_COMMANDS=ON -DCMAKE_CXX_COMPILER="C:/Program Files/LLVM/bin/clang++.exe"
```

---

## 11. 关于 `pkg-config not found`

如果 FFmpeg configure 出现：

```text
pkg-config not found
```

不一定是错误。

如果没有使用需要通过 pkg-config 检测的第三方库，通常可以继续。

本配置主要使用 FFmpeg 自身代码，不需要因为这个提示额外安装 MinGW/MSYS2。

---

## 12. 关于 `--enable-gpl`

本配置：

```text
--enable-gpl
```

只是开启 FFmpeg 中 GPL 代码的支持。

它不会自动把：

```text
x264
x265
```

等第三方编码器编译进来。

如果没有显式指定：

```text
--enable-libx264
--enable-libx265
```

就不会因为 `--enable-gpl` 自动产生这些外部依赖。

---

## 13. 常用清理命令

### 只重新编译

```bash
make -j$(nproc)
```

### 删除当前 build 目录

如果使用独立 `build` 目录：

```bash
cd ..
rm -rf build
mkdir build
cd build
```

然后重新 configure。

### 不要随便使用

```bash
make distclean
```

如果只是想继续编译或者重新执行 `make`，通常没必要 `distclean`。

---

# 最简流程

如果环境已经准备好，完整流程就是：

```bash
git clone --depth 1 https://github.com/FFmpeg/FFmpeg.git

cd FFmpeg



./configure \
  --cc=clang \
  --toolchain=llvm \
  --target-os=win64 \
  --arch=x86_64 \
  --extra-ldflags="-fuse-ld=lld" \
  --prefix=/c/ffmpeg \
  --enable-static \
  --disable-shared \
  --disable-programs \
  --disable-doc \
  --enable-gpl

make -j$(nproc)

make install
```

然后 C++ 项目：

```bash
rm -rf build

cmake -S . -B build -G Ninja \
  -DCMAKE_EXPORT_COMPILE_COMMANDS=ON \
  -DCMAKE_CXX_COMPILER="C:/Program Files/LLVM/bin/clang++.exe"

cmake --build build 
```

最终：

```text
Windows
│
├── Git for Windows
│   └── Git Bash
│
├── LLVM
│   ├── clang
│   ├── clang++
│   └── lld
│
├── FFmpeg
│   └── C:\ffmpeg\lib
│       ├── avcodec.lib
│       ├── avdevice.lib
│       ├── avfilter.lib
│       ├── avformat.lib
│       ├── avutil.lib
│       ├── postproc.lib
│       ├── swresample.lib
│       └── swscale.lib
│
└── C++ Project
    ├── CMake
    ├── Ninja
    └── compile_commands.json
        └── clangd
```
