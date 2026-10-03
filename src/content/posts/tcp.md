---
title: tcp/ip
createdAt: 2024-6-23
category: technology
tags: [cheatsheet]
summary: tcp/ip
---

```bash
ls -la /dev/net/tun 

setcap cap_net_admin=eip target/debug/tcp
ip tuntap add dev tun0 mode tun

ip addr add 192.168.0.1/24 dev tun0

ip link set tun0 up 

ping -c 3 192.168.0.2

tcpdump -i tun0 -n -v

nc -v 192.168.0.2 8080
```
[tcp](https://github.com/smoltcp-rs/smoltcp)