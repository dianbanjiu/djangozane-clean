# DjangoZane Clean

DjangoZane Clean 是一个轻量、响应式的 Hugo 博客主题。主题以干净的文章阅读体验为核心，内置明暗主题、首页推荐项目、标签词云、Pagefind 搜索、图片灯箱、代码块复制、响应式图片和 Waline 评论等常用博客能力。

**在线演示**：[blog-demo.djangozane.com](https://blog-demo.djangozane.com)

## 功能特点

- **轻量博客主题**：无 Tailwind、Bootstrap 或 npm 构建依赖，主题主体由 Hugo 模板、CSS 和原生 JS 组成。
- **明暗主题切换**：首次访问跟随系统偏好，手动切换后写入 `localStorage`，并同步 `theme-color`。
- **响应式布局**：桌面端文章网格展示，移动端自动折叠菜单；文章页在小屏滚动后可在顶部显示当前文章标题。
- **首页推荐项目**：通过 `params.featuredProjects` 配置项目卡片，最多展示 4 个，支持站内链接和外部链接。
- **Pagefind 搜索浮层**：启用后导航栏自动出现搜索入口，支持 `/` 打开搜索、`Esc` 关闭、上下键选择结果。
- **标签词云**：标签总览页使用 `wordcloud2.js` 渲染词云，字号按文章数量映射，点击标签进入归档页。
- **图片增强**：Markdown 图片自动懒加载；本地可处理图片会生成多尺寸 `srcset` 和 WebP，块级图片带 `figure/figcaption`。
- **PhotoSwipe 灯箱**：文章图片可点击放大浏览，支持手势缩放和滑动切换。
- **代码块增强**：代码块显示语言标签并提供复制按钮，语法高亮使用 Hugo Chroma。
- **Waline 评论**：内置 Waline 评论模板，支持明暗主题、界面语言自动匹配和常用 Waline 参数透传。
- **多语言界面**：内置简体中文、繁体中文和英文翻译。
- **完整页面模板**：包含首页、文章列表、文章详情、标签总览、标签归档、普通页面、分页和 404 页面。

## 环境要求

- Hugo `v0.146.0` 或更高版本
- 不要求 Hugo Extended

## 快速开始

### 作为 Git Submodule 使用

```bash
hugo new site my-site
cd my-site
git init

git submodule add https://github.com/dianbanjiu/djangozane-clean.git themes/djangozane-clean
echo "theme = 'djangozane-clean'" >> hugo.toml

hugo new content posts/hello-world.md
hugo server -D
```

克隆已有站点时初始化主题子模块：

```bash
git clone --recurse-submodules https://github.com/your-name/my-site.git
```

在已克隆仓库中补齐子模块：

```bash
git submodule update --init --recursive
```

更新主题：

```bash
git submodule update --remote themes/djangozane-clean
```

### 直接克隆主题

```bash
hugo new site my-site
cd my-site

git clone https://github.com/dianbanjiu/djangozane-clean.git themes/djangozane-clean
echo "theme = 'djangozane-clean'" >> hugo.toml

hugo new content posts/hello-world.md
hugo server -D
```

## 配置示例

站点的 `hugo.toml` 可参考下面的最小配置：

```toml
baseURL = 'https://example.org/'
locale = 'zh-Hans'
title = '我的博客'
paginate = 10
theme = 'djangozane-clean'

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

  [params.search]
    enabled = true

  [params.photoswipe]
    enabled = true

  [params.comments]
    enabled = false
    provider = 'waline'

    [params.comments.waline]
      serverURL = ''

  [[params.featuredProjects]]
    title = 'DjangoZane Clean'
    description = '简洁美观的 Hugo 博客主题'
    image = '/images/project-cover.jpg'
    url = 'https://github.com/dianbanjiu/djangozane-clean'

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

## 参数说明

| 参数 | 说明 | 默认值 |
| --- | --- | --- |
| `params.logo` | 站点 Logo 图片路径，通常放在站点 `static/` 目录下 | 显示站点标题文字 |
| `params.favicon` | 站点图标路径 | 无 |
| `params.backgroundImage` | 全局背景图路径；启用后页面主体区域使用毛玻璃效果提升可读性 | 无 |
| `params.featuredProjects` | 首页推荐项目列表，最多展示前 4 个 | 无 |
| `params.search.enabled` | 是否启用 Pagefind 搜索浮层和导航搜索按钮 | `false` |
| `params.photoswipe.enabled` | 是否启用文章图片灯箱 | `false` |
| `params.comments.enabled` | 是否启用文章评论 | `false` |
| `params.comments.provider` | 评论系统提供方，目前内置 `waline` | `waline` |
| `params.comments.waline.serverURL` | Waline 服务端地址，留空时不渲染评论区 | 无 |
| `params.comments.waline.cssURL` | 自定义 Waline CSS 地址 | `https://unpkg.com/@waline/client@v3/dist/waline.css` |
| `params.comments.waline.jsURL` | 自定义 Waline JS 地址 | `https://unpkg.com/@waline/client@v3/dist/waline.js` |
| `params.comments.waline.commentSorting` | 透传给 Waline 的评论排序参数 | Waline 默认值 |
| `params.comments.waline.emoji` | 透传给 Waline 的表情配置 | Waline 默认值 |
| `params.comments.waline.pageSize` | 透传给 Waline 的分页大小 | Waline 默认值 |
| `params.comments.waline.reaction` | 透传给 Waline 的互动反应配置 | Waline 默认值 |
| `params.comments.waline.wordLimit` | 透传给 Waline 的字数限制 | Waline 默认值 |

## 常用功能

### 多语言

通过 `locale` 切换界面语言：

| `locale` | 语言 |
| --- | --- |
| `zh-Hans` | 简体中文 |
| `zh-Hant` | 繁体中文 |
| `en` | English |

翻译文件位于 `i18n/`。切换语言时，菜单名称需要在站点配置中同步修改。

### 全局背景图

```toml
[params]
  backgroundImage = '/bg.jpg'
```

图片一般放在站点 `static/` 目录下。启用背景图后，正文容器、页头、页脚、卡片等区域会使用半透明与毛玻璃样式；未配置时使用默认纯色背景。

### 首页推荐项目

```toml
[[params.featuredProjects]]
  title = '项目名称'
  description = '项目简介'
  image = '/images/project.jpg'
  url = '/posts/project-intro/'

[[params.featuredProjects]]
  title = '外部项目'
  description = '也可以跳转到外部链接'
  image = 'https://example.com/project-cover.jpg'
  url = 'https://example.com/project'
```

每个项目支持 `title`、`description`、`image`、`url`。为了兼容旧字段，模板也会识别 `name`、`thumbnail`、`link`。

### 搜索

主题集成 Pagefind，但索引需要在站点构建后生成：

```bash
hugo
npx pagefind --site public
```

启用搜索：

```toml
[params.search]
  enabled = true
```

启用后导航栏会自动出现搜索按钮。前端会按需加载 `/pagefind/pagefind.js`，搜索浮层支持 `/`、`Esc`、方向键和回车。

### 图片灯箱与响应式图片

启用 PhotoSwipe：

```toml
[params.photoswipe]
  enabled = true
```

Markdown 中的本地图片会优先通过 Hugo Image Processing 生成多尺寸图片和 WebP：

```markdown
![Bryce Canyon](bryce-canyon.jpg "Bryce Canyon")
```

块级图片会渲染为 `figure`，标题会渲染为 `figcaption`。GIF、远程图片或不可处理资源会保留普通图片输出，但仍会设置懒加载属性。

### Waline 评论

```toml
[params.comments]
  enabled = true
  provider = 'waline'

  [params.comments.waline]
    serverURL = 'https://your-waline-server.example.com'
```

评论区默认只在 `post` 分区的文章页显示。单篇文章可在 Front Matter 中设置 `comment: false` 关闭评论。

Waline 的 `dark` 选项绑定到 `html[data-theme="dark"]`，语言会根据站点 `locale` 自动映射为 `zh-CN`、`zh-TW` 或 `en`。

## 文章写作

默认文章模板位于 `archetypes/default.md`。常用 Front Matter：

```toml
+++
title = '文章标题'
date = 2026-01-01T08:00:00+08:00
lastmod = 2026-01-02T08:00:00+08:00
draft = false
tags = ['Hugo', '主题']
summary = '自定义摘要'
comment = true
+++
```

| 字段 | 说明 |
| --- | --- |
| `title` | 文章标题 |
| `date` | 发布日期，用于排序和展示 |
| `lastmod` | 最后修改日期；与发布日期不是同一天时会显示“最后更新” |
| `draft` | 草稿开关，`hugo server -D` 可预览 |
| `tags` | 标签列表，用于文章卡片、文章页和标签归档 |
| `summary` | 自定义摘要；未设置时 Hugo 自动生成 |
| `comment` | 设为 `false` 可关闭当前文章评论 |

## 菜单配置

在 `[menus]` 下添加 `[[menus.main]]` 即可扩展导航：

```toml
[[menus.main]]
  identifier = 'about'
  name = '关于'
  pageRef = '/about'
  weight = 40
```

如果启用了搜索，主题会自动在导航中添加搜索入口，不需要手动配置搜索菜单项。

## 目录结构

```text
.
├── archetypes/
│   └── default.md
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   └── comments.css
│   └── js/
│       └── main.js
├── content/
│   ├── _index.md
│   └── posts/
├── i18n/
│   ├── en.yaml
│   ├── zh-Hans.yaml
│   └── zh-Hant.yaml
├── layouts/
│   ├── 404.html
│   ├── baseof.html
│   ├── home.html
│   ├── page.html
│   ├── section.html
│   ├── taxonomy.html
│   ├── term.html
│   ├── _markup/
│   │   └── render-image.html
│   ├── _default/_markup/
│   │   └── render-codeblock.html
│   └── _partials/
│       ├── comments/
│       │   └── waline.html
│       ├── head/
│       │   ├── css.html
│       │   └── js.html
│       ├── comments.html
│       ├── datetime.html
│       ├── featured-projects.html
│       ├── footer.html
│       ├── head.html
│       ├── header.html
│       ├── hero.html
│       ├── menu.html
│       ├── pagination.html
│       ├── photoswipe.html
│       └── post-card.html
├── static/
│   ├── favicon.ico
│   └── vendor/
│       ├── photoswipe/
│       └── wordcloud/
└── hugo.toml
```

## 自定义

### 修改样式

主题主要样式在 `assets/css/main.css`。配色、间距、圆角、阴影和字体变量集中定义在文件顶部，可按需修改。

### 修改脚本行为

主题交互逻辑在 `assets/js/main.js`，包括主题切换、代码复制、移动端菜单、移动端文章标题显示和搜索浮层。

### 扩展评论系统

目前内置 Waline。如需增加其他评论系统，可以新增：

```text
layouts/_partials/comments/<provider>.html
```

然后在 `layouts/_partials/comments.html` 中增加对应的 provider 分发逻辑。

## 开发

在主题目录内可直接运行示例站点：

```bash
hugo server -D
```

生产构建：

```bash
hugo
```

如启用了 Pagefind 搜索，生产构建后再生成索引：

```bash
npx pagefind --site public
```

## 许可证

MIT
