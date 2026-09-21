---
title: cpu_cache
createdAt: 2022-09-23
category: tools
tags: [cheatsheet]
summary: 不实用小工具及其常见用法
---

![cpu_cache](./cpu_cache.mp4)

```c
int __fastcall fastcall_1(int a, int b)
{
    return a + b;
}
int _cdecl cdecall_1(int a, int b)
{
    return a + b;
}
int __stdcall stdcall_1(int a, int b)
{
    return a + b;
}
```
```sh
gcc -m32 -masm=intel -S asm.c -o asm.S
```

```
rustc asm_.rs --emit=asm --target=i686-pc-windows-msvc -C llvm-args="--x86-asm-syntax=intel"
```
