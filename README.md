# DjangoZane Clean

一个基于 **Catppuccin** 配色的 Hugo 新拟态（Neumorphism）主题，简洁、现代、响应式。

## 特点

- **Catppuccin 配色** — 亮色模式使用 Latte，暗色模式使用 Mocha，视觉柔和舒适
- **新拟态设计** — 卡片、按钮、标签均采用凸出/凹陷阴影，呈现立体质感
- **明暗主题切换** — 支持手动切换与跟随系统偏好，`localStorage` 持久化，无闪烁
- **响应式布局** — 桌面端双列文章网格，移动端自动切换为单列，小屏幕下导航折叠为汉堡菜单
- **零依赖** — 无 Tailwind / Bootstrap / npm，纯 CSS + 原生 JS，轻量快速
- **Hugo 资源管道** — CSS / JS 自动 minify、fingerprint，开箱即用的缓存优化
- **完整页面模板** — 首页、文章列表、文章详情、标签总览、标签归档、404 页面

## 要求

- Hugo **v0.146.0** 或更高版本（无需 Extended 版本）

## 快速开始

### 方式一：Git Submodule（推荐）

```bash
# 创建新站点
hugo new site my-site
cd my-site
git init

# 以子模块方式添加主题
git submodule add https://github.com/your-username/djangozane-clean.git themes/djangozane-clean

# 在 hugo.toml 中指定主题
echo "theme = 'djangozane-clean'" >> hugo.toml

# 创建第一篇文章
hugo new content posts/hello-world.md

# 启动开发服务器
hugo server -D
```

克隆已有项目时需初始化子模块：

```bash
git clone --recurse-submodules https://github.com/your-username/my-site.git
# 或在已克隆的仓库中
git submodule update --init --recursive
```

更新主题到最新版本：

```bash
git submodule update --remote themes/djangozane-clean
```

### 方式二：直接克隆

```bash
# 创建新站点
hugo new site my-site
cd my-site

# 克隆主题
git clone https://github.com/your-username/djangozane-clean.git themes/djangozane-clean

# 在 hugo.toml 中指定主题
echo "theme = 'djangozane-clean'" >> hugo.toml

# 创建第一篇文章
hugo new content posts/hello-world.md

# 启动开发服务器
hugo server -D
```

## 配置

`hugo.toml` 示例：

```toml
baseURL = 'https://example.org/'
languageCode = 'zh-CN'
title = '我的博客'

[menus]
  [[menus.main]]
    name = 'Home'
    pageRef = '/'
    weight = 10

  [[menus.main]]
    name = 'Posts'
    pageRef = '/posts'
    weight = 20

  [[menus.main]]
    name = 'Tags'
    pageRef = '/tags'
    weight = 30

[module]
  [module.hugoVersion]
    extended = false
    min = '0.146.0'
```

### 菜单配置

在 `[menus]` 下添加 `[[menus.main]]` 条目即可，`weight` 控制排列顺序：

```toml
[[menus.main]]
  name = 'About'
  pageRef = '/about'
  weight = 40
```

### 文章 Front Matter

```toml
+++
title = '文章标题'
date = 2025-01-01T08:00:00+08:00
draft = false
tags = ['Hugo', '教程']
+++
```

支持的字段：

| 字段 | 说明 |
|------|------|
| `title` | 文章标题 |
| `date` | 发布日期，用于排序和显示 |
| `draft` | 设为 `true` 时仅 `hugo server -D` 可见 |
| `tags` | 标签列表，自动生成标签页 |
| `summary` | 自定义摘要，未设置时自动截取正文 |

## 目录结构

```
.
├── archetypes/
│   └── default.md          # 新内容模板
├── assets/
│   ├── css/main.css         # 主样式（Catppuccin 变量 + 新拟态）
│   └── js/main.js           # 主题切换 + 移动端菜单
├── content/
│   ├── _index.md            # 首页内容
│   └── posts/               # 文章目录
├── layouts/
│   ├── baseof.html          # HTML 骨架
│   ├── home.html            # 首页模板
│   ├── page.html            # 文章详情
│   ├── section.html         # 分区列表
│   ├── taxonomy.html        # 标签/分类总览
│   ├── term.html            # 单个标签下的文章列表
│   ├── 404.html             # 404 页面
│   └── _partials/           # 可复用片段
│       ├── head.html
│       ├── head/css.html
│       ├── head/js.html
│       ├── header.html
│       ├── footer.html
│       └── menu.html
└── hugo.toml                # 站点配置
```

## 自定义

### 修改配色

编辑 `assets/css/main.css` 顶部的 CSS 变量：

```css
:root {
  --bg: #eff1f5;
  --accent: #7287fd;
  --accent-end: #8839ef;
  /* ... */
}

[data-theme="dark"] {
  --bg: #1e1e2e;
  --accent: #7287fd;
  /* ... */
}
```

### 修改字体

在 `assets/css/main.css` 中找到 `body` 的 `font-family` 进行替换。代码字体在 `.article-content code` 中配置。

## 许可证

MIT
