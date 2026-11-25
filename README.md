# 谭作洵学术主页

这是一个 Jekyll 静态网站项目，使用 GitHub Pages 支持的目录和布局。首页使用 `index.html`，公共布局在 `_layouts/`、`_includes/`，论文条目在 `_data/publications.yml`，笔记正文在 `_posts/`。

| 页面 | 路径 |
| --- | --- |
| 学术主页 | `/` |
| 论文阅读笔记 | `/notes/` |
| 图像分类基准 | `/classification-bench/` |
| 合成信号回归基准 | `/regression-bench/` |

## 本地预览

使用支持 GitHub Pages Gem 的 Ruby 和 Bundler。在项目目录运行：

```sh
bundle install
bundle exec jekyll serve
```

打开 [本机预览](http://localhost:4000/) 或 [分类基准](http://localhost:4000/classification-bench/)。`bundle exec jekyll build` 会将站点输出到 `_site/`。

## GitHub Pages 路径

如未来选择发布，请把该项目放在获授权的仓库中。个人站根目录站点可在 GitHub Pages 设置中选择从发布分支的根目录构建。项目站请按对应仓库路径设置 `baseurl`。例如 `baseurl: "/research-site"` 会将分类基准放在 `/research-site/classification-bench/`。详见 [GitHub Pages 的发布方式](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。
