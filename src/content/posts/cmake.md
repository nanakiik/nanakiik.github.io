---
title: cmake cheatsheet
createdAt: 2025-07-25
category: tools
tags: [cheatsheet, tool]
summary: cmake cheatsheet
---

# CMake Cheatsheet

官方资源：

- 官网：https://cmake.org/
- 官方文档：https://cmake.org/documentation/
- 命令行手册：https://cmake.org/cmake/help/latest/manual/cmake.1.html
- `CMakeLists.txt` 手册：https://cmake.org/cmake/help/latest/manual/cmake-language.7.html
- CMake 命令参考：https://cmake.org/cmake/help/latest/manual/cmake-commands.7.html

## 常用命令

### 配置（Configure）

```bash
cmake -S . -B build -G Ninja -DCMAKE_EXPORT_COMPILE_COMMANDS=ON
```

- `-S .`：指定源码目录。
- `-B build`：指定构建目录。
- `-G Ninja`：使用 Ninja 生成构建文件。
- `-DCMAKE_EXPORT_COMPILE_COMMANDS=ON`：生成 `compile_commands.json`，便于 clangd 等工具使用。

如果使用支持架构选择的生成器（例如 Visual Studio），可指定 `-A x64`：

```bash
cmake -S . -B build -G "Visual Studio 17 2022" -A x64
```

> 注意：`-A x64` 通常不适用于 Ninja。编译器最好在首次配置时指定，例如 `-DCMAKE_C_COMPILER=clang -DCMAKE_CXX_COMPILER=clang++`。

### 编译（Build）

```bash
cmake --build build --config Release
```

- `--build build`：构建 `build` 目录。
- `--config Release`：选择 Release 配置；对单配置生成器（如 Ninja），通常应在配置阶段设置 `-DCMAKE_BUILD_TYPE=Release`。

### 安装（Install）

```bash
cmake --install build
```

可在配置阶段用 `-DCMAKE_INSTALL_PREFIX=/your/install/path` 指定安装位置。

### 生成依赖关系图（Graphviz）

在构建目录中运行：

```bash
cmake .. --graphviz=dot
dot -Tsvg dot -o dot.svg
```

第一条命令生成 DOT 依赖关系文件，第二条将它转换成 SVG。需要安装 Graphviz，并确保 `dot` 命令可用。

### 查询包的链接参数

```bash
cmake --find-package -DNAME=ZLIB -DCOMPILER_ID=GNU -DLANGUAGE=C -DMODE=LINK
```

用于查询指定包在给定编译器和语言条件下的链接信息。实际项目中也常用 `find_package()` 在 CMake 配置阶段查找依赖。

## 最小化 `CMakeLists.txt`

```cmake
cmake_minimum_required(VERSION 3.20)

project(MyProject LANGUAGES C CXX)

if(NOT CMAKE_C_COMPILER)
    set(CMAKE_C_COMPILER clang)
endif()

if(NOT CMAKE_CXX_COMPILER)
    set(CMAKE_CXX_COMPILER clang++)
endif()

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

add_executable(MyProject main.cpp)
```

> 编译器通常在项目第一次配置时确定。更推荐在命令行传入 `-DCMAKE_C_COMPILER=clang` 和 `-DCMAKE_CXX_COMPILER=clang++`，而不是在 `project()` 之后修改。`CMAKE_EXPORT_COMPILE_COMMANDS` 主要支持 Ninja 和 Makefile 生成器。

## 快速构建示例

```bash
cmake -S . -B build -G Ninja \
  -DCMAKE_C_COMPILER=clang \
  -DCMAKE_CXX_COMPILER=clang++ \
  -DCMAKE_BUILD_TYPE=Release \
  -DCMAKE_EXPORT_COMPILE_COMMANDS=ON

cmake --build build
cmake --install build
```
