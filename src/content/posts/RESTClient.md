---
title: REST Client
createdAt: 2025-07-23
category: tools
tags: [cheatsheet,tutorial]
summary: 不实用小工具及其常见用法
---

[REST Client](https://github.com/Huachao/vscode-restclient) vscode拓展使用例子

将以下内容复制到一个`1.http`即可发送请求查看响应
```
@ua=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36

GET https://api.github.com/repos/Huachao/vscode-restclient
User-Agent: {{ua}}

###

POST https://graphql.anilist.co
Content-Type: application/json
User-Agent: {{ua}}

{
    "query": "query ($id: Int) { Media (id: $id, type: ANIME) { id title { romaji english native } } }",
    "variables": { "id": 15125 }
}
```
