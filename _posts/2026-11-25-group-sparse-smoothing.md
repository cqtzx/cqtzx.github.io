---
layout: post
title: 组稀疏与组内平滑
description: 用两类惩罚分别描述哪些变量组应进入模型，以及组内系数怎样变化。
permalink: /notes/group-sparse-smoothing/
paper_url: https://doi.org/10.1007/s11222-024-10438-0
---

组稀疏惩罚决定哪些变量组进入模型，组内总变差控制同组变量之间的变化。

在已知真实信号的统计仿真中，可以分别评估组选择与信号恢复的准确性。
