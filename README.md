# DjangoZane Clean

一个基于 **Catppuccin** 配色的 Hugo 新拟态（Neumorphism）主题，简洁、现代、响应式。

**在线演示**：[blog-demo.djangozane.com](https://blog-demo.djangozane.com)

## 特点

- **Catppuccin 配色** — 亮色模式使用 Latte，暗色模式使用 Mocha，视觉柔和舒适
- **新拟态设计** — 卡片、按钮、标签均采用凸出/凹陷阴影，呈现立体质感
- **明暗主题切换** — 支持手动切换与跟随系统偏好
- **全局背景图** — 通过配置项设置全屏背景图，自动为 header、卡片、footer 添加毛玻璃半透明效果
- **代码块增强** — 自动显示语言标签 + 一键复制按钮
- **i18n 多语言** — 内置简体中文、繁体中文、英文翻译，通过 `languageCode` 配置切换界面语言
- **响应式布局** — 桌面端双列文章网格，移动端自动切换为单列，小屏幕下导航折叠为汉堡菜单
- **零依赖** — 无 Tailwind / Bootstrap / npm，纯 CSS + 原生 JS，轻量快速
- **Pagefind 全文搜索** — 基于 Pagefind 的静态搜索，通过配置项一键开关
- **标签词云** — 标签页使用 wordcloud2.js 渲染词云，字号按文章数量映射，点击跳转，主题切换时自动重绘
- **图片灯箱** — 基于 PhotoSwipe 5，文章内图片点击放大、手势缩放/滑动，通过配置项一键开关
- **完整页面模板** — 首页、文章列表、文章详情、标签词云、标签归档、搜索、404 页面

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
locale = 'zh-Hans'
title = '我的博客'
paginate = 10

[menus]
  [[menus.main]]
    identifier = 'home'
    name = '首页'
    pageRef = '/'
    weight = 10

  [[menus.main]]
    identifier = 'posts'
    name = '文章'
    pageRef = '/posts'
    weight = 20

  [[menus.main]]
    identifier = 'tags'
    name = '标签'
    pageRef = '/tags'
    weight = 30

[params]
  # logo = '/images/logo.png'
  # favicon = '/favicon.svg'
  # backgroundImage = '/bg.jpg'
  # [params.featuredProjects]]
  #   title = '项目名称'
  #   description = '项目简介'
  #   image = '/images/project.jpg'
  #   url = '/posts/project-intro/'
  [params.search]
    enabled = true
  [params.photoswipe]
    enabled = true

[markup]
  [markup.highlight]
    codeFences = true
    guessSyntax = true
    noClasses = false

[module]
  [module.hugoVersion]
    extended = false
    min = '0.146.0'
```

### 参数说明

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `logo` | 站点 Logo 图片路径（放在 `static/` 下） | 无，显示站点标题文字 |
| `favicon` | 站点图标路径 | 无 |
| `backgroundImage` | 全局背景图路径（放在 `static/` 下） | 无，使用纯色背景 |
| `featuredProjects` | 首页推荐项目列表，最多显示 4 个 | 无 |
| `search.enabled` | 是否启用 Pagefind 全文搜索 | `false` |
| `photoswipe.enabled` | 是否启用图片灯箱 | `false` |

### 语言配置

通过 `locale` 切换界面语言，内置三种翻译：

| `locale` | 语言 |
|---|---|
| `zh-Hans` | 简体中文 |
| `zh-Hant` | 繁体中文 |
| `en` | English |

翻译文件位于 `i18n/` 目录，可自行修改或新增语言。切换语言时菜单 `name` 也需一并修改。

### 全局背景图

在 `[params]` 中设置 `backgroundImage` 即可启用全屏背景图：

```toml
[params]
  backgroundImage = '/bg.jpg'
```

将图片放到站点的 `static/` 目录下。启用后 header、卡片、footer 等区域会自动添加毛玻璃半透明效果，保证内容可读性。不设置则使用默认纯色背景。

### 首页推荐项目

在 `[params]` 下添加 `[[params.featuredProjects]]` 条目即可在首页“最新文章”上方显示推荐项目，最多显示前 4 个。每个项目支持 `title`、`description`、`image` 和 `url`。

```toml
[[params.featuredProjects]]
  title = '项目名称'
  description = '项目简介'
  image = '/images/project.jpg'
  url = '/posts/project-intro/'

[[params.featuredProjects]]
  title = '外部项目'
  description = '可以跳转到完整的 http 或 https 链接'
  image = 'https://example.com/project-cover.jpg'
  url = 'https://example.com/project'
```

`url` 支持完整的 `http`/`https` 链接，也支持站内文章路径；`image` 支持完整图片链接，也支持放在站点 `static/` 下的图片资源路径。

### 搜索配置

主题集成了 [Pagefind](https://pagefind.app/) 静态全文搜索。通过 `params.search.enabled` 控制开关：

```toml
[params]
  [params.search]
    enabled = true   # 设为 false 可关闭搜索功能
```

启用后需在构建站点后运行 Pagefind 索引：

```bash
hugo
npx pagefind --site public
```

也可以在开发时使用：

```bash
hugo server -D
# 另一个终端
npx pagefind --site public
```

> 启用后导航栏会自动出现搜索图标按钮，无需手动添加菜单项。

### 图片灯箱

主题集成了 [PhotoSwipe 5](https://photoswipe.com/)，文章页图片点击可放大浏览，支持手势缩放和滑动切换。通过 `params.photoswipe.enabled` 控制开关：

```toml
[params]
  [params.photoswipe]
    enabled = true   # 设为 false 可关闭图片灯箱
```

> 启用后文章内所有未被链接包裹的图片会自动获得灯箱效果，无需额外操作。

### 菜单配置

在 `[menus]` 下添加 `[[menus.main]]` 条目即可，`weight` 控制排列顺序：

```toml
[[menus.main]]
  name = 'About'
  pageRef = '/about'
  weight = 40
```

### 文章 Front Matter

```yaml
---
title: "文章标题"
date: 2025-01-01T08:00:00+08:00
lastmod: 2025-03-15T10:00:00+08:00
tags: ["Hugo", "教程"]
---
```

支持的字段：

| 字段 | 说明 |
|------|------|
| `title` | 文章标题 |
| `date` | 发布日期，用于排序和显示，格式为 `YYYY-MM-DD` |
| `lastmod` | 最后修改日期，与 `date` 年月日不同时自动显示 |
| `draft` | 设为 `true` 时仅 `hugo server -D` 可见 |
| `tags` | 标签列表，自动生成标签页 |
| `summary` | 自定义摘要，未设置时自动截取正文 |

## 目录结构

```
.
├── archetypes/
│   └── default.md                          # 新内容模板
├── assets/
│   ├── css/main.css                        # 主样式（Catppuccin 变量 + 新拟态）
│   └── js/main.js                          # 主题切换 + 移动端菜单
├── content/
│   ├── _index.md                           # 首页内容
│   └── posts/                              # 示例文章
├── i18n/
│   ├── zh-Hans.yaml                        # 简中翻译
│   ├── zh-Hant.yaml                        # 繁中翻译
│   └── en.yaml                             # 英文翻译
├── layouts/
│   ├── baseof.html                         # HTML 骨架
│   ├── home.html                           # 首页模板
│   ├── page.html                           # 文章详情
│   ├── section.html                        # 分区列表
│   ├── taxonomy.html                       # 标签/分类总览
│   ├── term.html                           # 单个标签下的文章列表
│   ├── 404.html                            # 404 页面
│   ├── _default/_markup/
│   │   └── render-codeblock.html           # 代码块渲染（语言标签 + 复制按钮）
│   └── _partials/
│       ├── head.html                       # <head> 内容
│       ├── head/css.html                   # CSS 资源管道
│       ├── head/js.html                    # JS 资源管道
│       ├── header.html                     # 站点头部
│       ├── footer.html                     # 站点底部
│       ├── menu.html                       # 导航菜单
│       ├── hero.html                       # 首页 Hero 区域
│       ├── datetime.html                   # 日期 + 最后更新时间
│       ├── post-card.html                  # 文章卡片
│       ├── pagination.html                 # 分页导航
│       └── photoswipe.html                 # PhotoSwipe 灯箱
└── hugo.toml                               # 主题示例配置
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
