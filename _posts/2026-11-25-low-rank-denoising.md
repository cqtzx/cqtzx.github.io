---
layout: post
title: Global and Local Structure in Image Denoising
description: How low-rank constraints and total variation capture different aspects of image structure.
permalink: /notes/low-rank-denoising/
paper_url: https://doi.org/10.1016/j.apm.2023.08.002
---

A low-rank term exploits global correlations in image matrices. Total variation penalizes differences between neighboring pixels, helping smooth regions while preserving edges.

When comparing denoising methods, evaluate overall reconstruction error and edge preservation separately. Each reveals a different aspect of recovery quality.
