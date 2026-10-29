---
title: rust cheatsheet
createdAt: 2023-04-23
category: tools
tags: [cheatsheet]
summary: 介绍一些rust的工具
---

- [Rust Documentation](https://doc.rust-lang.org/stable/) — Rust 文档总入口
- [cheats.rs](https://cheats.rs/) — Rust 语法与常用模式速查表
- [releases.rs](https://releases.rs/) — Rust 生态版本更新与发布信息
- [rust-blog](https://github.com/pretzelhammer/rust-blog) — Rust 深入主题文章合集
- [This Week in Rust](https://this-week-in-rust.org/) — Rust 社区每周动态

## 安装本地 Rust 程序

```bash
cargo +stable install --path . --locked
```

- `+stable`：使用 stable toolchain 执行 Cargo。
- `install`：编译并安装可执行的 crate。
- `--path .`：从当前目录的本地 crate 安装。
- `--locked`：要求依赖解析与 `Cargo.lock` 保持一致；若锁文件缺失或需要修改则报错。
- 适用于包含可安装二进制目标的 crate；通常需要在 `Cargo.toml` 中定义 `[[bin]]`，或使用默认的二进制包布局。
- Cargo 安装的可执行文件通常位于 `~/.cargo/bin`（Windows 上通常为 `%USERPROFILE%\\.cargo\\bin`），确保该目录在 `PATH` 中。
