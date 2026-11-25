---
layout: post
title: 去噪中的全局与局部结构
description: 低秩约束和总变差在图像去噪中各自利用哪些信息。
permalink: /notes/low-rank-denoising/
paper_url: https://doi.org/10.1016/j.apm.2023.08.002
---

低秩项利用图像矩阵的全局相关性。总变差对相邻像素的变化施加约束，有助于兼顾区域平滑性和边缘结构。

比较方法时，可以把整体重建误差和边缘细节分开观察。两者关注的是图像恢复的不同方面。
