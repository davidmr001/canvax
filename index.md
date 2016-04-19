---
layout: post
title: Canvax
---

## 关于Canvax

简单高效易用的canvas开发框架。采用Flash AS3相同的模式来对绘制元素进行抽象，采用OO的模式方便的管理绘制在Canvas上面的每个元素和进行事件绑定和检测触发，解决Canvas开发面对无状态的Canvas画布无从下手的尴尬；

独树一帜的心跳包主动渲染机制（不再需要定时器轮询）提升渲染性能；

在IE9-中使用FlashCanvas解决Canvas的兼容问题。

## Canvax开发征途

- [前言-为什么出发](articles/introduction.html)
- [Canvax中抽象的对象树](articles/treemap.html)
- [Canvax中Matrix矩阵在对象树中的使用](articles/matrix.html)
- [Canvax的心跳包主动驱动渲染](articles/heart_beat.html)
- Canvax中的图形
  + 万能的Path
  + 万能的BrokenLine
  + 规则图形原件
- Canvax对象树中图形原件的点击检测
  + Path检测方案（1）射线判别法
  + Path检测方案（2）非零环绕法
  + 规则图形检测方案
- Canvax中的事件系统
  + mouse事件模块
  + touch事件模块
- Canvax中animationFrame
