---
layout: post
title: 图像遮挡与稳健特征提取
description: 在异常样本或遮挡存在时，怎样评估二维主成分分析的表现。
permalink: /notes/robust-feature-extraction/
paper_url: https://doi.org/10.1016/j.patcog.2025.111817
---

二维主成分分析直接利用图像的矩阵形式。重加权损失可以降低异常样本对所提取特征的影响。

评估时可同时比较分类准确率和重建误差，并按遮挡水平报告结果。
