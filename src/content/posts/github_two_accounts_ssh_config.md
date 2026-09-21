---
title: 配置两个 GitHub 账户
createdAt: 2024-07-23
category: tools
tags: [tutorial]
summary: 不实用小工具及其常见用法
---


# 一台计算机配置两个 GitHub 账户

本文用于配置**两个 GitHub 账户在同一台计算机上使用不同 SSH 密钥**，从而实现：

- 账户 A 使用 `~/.ssh/test1`
- 账户 B 使用 `~/.ssh/test`
- 同一台电脑可以分别向两个 GitHub 账户的仓库推送代码
- 每个仓库单独配置 `git user.name`、`git user.email` 和 SSH 签名密钥
- Git Commit 使用 SSH Key 进行签名

> 以下示例假设两个 GitHub 账户分别称为 `test1` 和 `test`。实际使用时，请替换成自己的用户名和邮箱。

---

## 一、生成两个 SSH 密钥

首先创建 `.ssh` 目录：

```bash
mkdir  ~/.ssh
```
### 1. 生成第一个 SSH 密钥

```bash
ssh-keygen -t ed25519 -C "test1@example.com" -f ~/.ssh/test1
```

生成：

```text
~/.ssh/test1
~/.ssh/test1.pub
```

其中：

- `test1`：私钥，**绝对不要泄露**
- `test1.pub`：公钥，可以上传到 GitHub

### 2. 生成第二个 SSH 密钥

```bash
ssh-keygen -t ed25519 -C "test@example.com" -f ~/.ssh/test
```

生成：

```text
~/.ssh/test
~/.ssh/test.pub
```

最终目录大致如下：

```text
~/.ssh/
├── test
├── test.pub
├── test1
└── test1.pub
```

---

## 二、将两个公钥添加到对应的 GitHub 账户

分别查看两个公钥：

```bash
cat ~/.ssh/test1.pub
```
```bash
cat ~/.ssh/test.pub
```

复制输出的完整内容。

然后登录对应的 GitHub 账户，在：

**GitHub → Settings → SSH and GPG keys → New SSH key**

分别添加：

```text
账户 test1
    → ~/.ssh/test1.pub

账户 test
    → ~/.ssh/test.pub
```

> 注意：公钥可以上传到 GitHub，但 `~/.ssh/test1` 和 `~/.ssh/test` 是私钥，不能上传、提交到 Git 仓库，也不要发送给其他人。

---

## 三、配置 `~/.ssh/config`

编辑 SSH 配置文件：

写入：

```sshconfig
Host test1
    HostName github.com
    User git
    IdentityFile ~/.ssh/test1
    IdentitiesOnly yes

Host test
    HostName github.com
    User git
    IdentityFile ~/.ssh/test
    IdentitiesOnly yes
```

配置说明：

| 配置 | 作用 |
|---|---|
| `Host test1` | SSH 别名，代表第一个 GitHub 账户 |
| `Host test` | SSH 别名，代表第二个 GitHub 账户 |
| `HostName github.com` | 实际连接的服务器 |
| `User git` | GitHub SSH 用户固定使用 `git` |
| `IdentityFile` | 指定当前账户使用的 SSH 私钥 |
| `IdentitiesOnly yes` | 强制 SSH 使用指定的密钥，避免多个 SSH Key 相互干扰 |


---

## 四、测试两个 GitHub 账户

分别测试：

```bash
ssh -T git@test1
```

以及：

```bash
ssh -T git@test
```

如果配置正确，GitHub 会返回类似：

```text
Hi username1! You've successfully authenticated, but GitHub does not provide shell access.
```

以及：

```text
Hi username2! You've successfully authenticated, but GitHub does not provide shell access.
```

这里的用户名应该分别对应两个 GitHub 账户。

---

## 五、GitHub 仓库地址必须使用 SSH 别名

这是整个配置中非常关键的一步。

正常的 GitHub SSH 地址是：

```text
git@github.com:username/repository.git
```

但是现在我们配置了两个 SSH 别名，所以应该使用：

### test1 账户

```text
git@test1:username1/repository.git
```

### test 账户

```text
git@test:username2/repository.git
```

例如：

```bash
git clone git@test1:username1/project.git
```

或者：

```bash
git clone git@test:username2/project.git
```

如果已经创建了本地仓库，也可以修改远程地址：

```bash
git remote set-url origin git@test1:username1/project.git
```

查看当前远程仓库：

```bash
git remote -v
```

---

# 六、每个仓库单独配置 Git 用户信息

为了避免两个 GitHub 账户混用，**推荐每个仓库都使用本地 Git 配置**。

进入仓库：

```bash
cd your-project
```

然后配置：

```bash
git config user.name "你的 GitHub 用户名"
git config user.email "你的 GitHub 邮箱"
```

注意这里不要使用：

```bash
git config --global
```

因为我们希望不同仓库使用不同的账户。

查看当前仓库配置：

```bash
git config --local --list
```

也可以分别查看：

```bash
git config user.name
git config user.email
```

---

# 七、配置 Git Commit 的 SSH 签名

如果希望 Git Commit 使用 SSH Key 签名，需要告诉 Git 使用 SSH 格式进行签名：

```bash
git config gpg.format ssh
```

然后指定当前仓库使用的 SSH 私钥。

## test1 账户

进入 test1 对应的仓库：

```bash
git config user.name "test1"
git config user.email "test1@example.com"
git config user.signingkey ~/.ssh/test1
git config gpg.format ssh
git config commit.gpgsign true
```

## test 账户

进入 test 对应的仓库：

```bash
git config user.name "test"
git config user.email "test@example.com"
git config user.signingkey ~/.ssh/test
git config gpg.format ssh
git config commit.gpgsign true
```

这样以后在对应仓库执行：

```bash
git commit -m "your commit message"
```

Git 就会自动使用当前仓库配置的 SSH Key 对 Commit 进行签名。

---

最终形成如下关系：

```text
                    ┌─────────────────────┐
                    │      本地电脑        │
                    └──────────┬──────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
                ▼                             ▼
        GitHub 账户 test1              GitHub 账户 test
                │                             │
                │                             │
        ~/.ssh/test1                  ~/.ssh/test
                │                             │
                ▼                             ▼
           Host test1                    Host test
                │                             │
                └──────────────┬──────────────┘
                               │
                         github.com
```
---

# 八、一个重要的区别：登录认证和 Commit 签名

这里实际上涉及两个不同的功能：

### 1. SSH Authentication

决定：

> `git push` 的时候，我以哪个 GitHub 账户的身份连接？

由：

```text
~/.ssh/config
```

中的：

```sshconfig
IdentityFile ~/.ssh/test1
```

或者：

```sshconfig
IdentityFile ~/.ssh/test
```

决定。

### 2. SSH Commit Signing

决定：

> 这个 Git Commit 是由哪个 SSH Key 签名的？

由：

```bash
git config user.signingkey ~/.ssh/test1
```

或者：

```bash
git config user.signingkey ~/.ssh/test
```

决定。

因此，**远程仓库地址和 `user.signingkey` 最好保持对应关系**：

```text
git@test1:...
        ↓
~/.ssh/test1
        ↓
test1 GitHub 账户
```

以及：

```text
git@test:...
        ↓
~/.ssh/test
        ↓
test GitHub 账户
```

这样最不容易出现账户混用的问题。

---

# 总结

整个方案可以概括成四步：

```text
① 两个 SSH Key

~/.ssh/test1
~/.ssh/test


② 两个 SSH Host

Host test1 → ~/.ssh/test1
Host test  → ~/.ssh/test


③ 每个仓库使用对应的 Remote

git@test1:USERNAME/REPO.git
git@test:USERNAME/REPO.git


④ 每个仓库设置自己的 Git 身份

git config user.name ...
git config user.email ...
git config user.signingkey ...
```

最终即可在**同一台计算机上同时管理两个 GitHub 账户，并让不同项目自动使用对应的 SSH Key 进行 GitHub 认证和 Commit 签名**。
