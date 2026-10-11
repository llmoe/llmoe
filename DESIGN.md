# LLmoe · LoveLive! μ's 应援手账

主方向：粉色演出票 × Q 版成员贴纸 × 个人手账。奶油白纸张、浅粉格线、虚线撕口、手绘星星和应援棒。

用户偏好：喜欢 LoveLive! 的 μ's；图片更可爱、整体重新设计、保留粉色、不展示项目。

个人介绍：写代码，也创造一点有趣的东西。

## 当前文件

- `assets/muse-chibi-v3.png`：内置 image_gen 生成的九位成员 Q 版同人合影，透明背景。
- `assets/hero-lovelive-v3.png`、`hero-lovelive-v3-mobile.png`：电脑与手机的演出票横幅。
- `assets/cheer-lovelive-v3.gif`、`cheer-lovelive-v3-mobile.gif`：应援棒轻摆、星星渐变、日常便签，手机版本使用更大字号；对应的 PNG 是减少动态效果时的静态版本。
- `assets/footer-lovelive-v3.svg`：手绘票根页脚。
- `scripts/lovelive-v3.html`：当前主题排版与动画源码。
- `scripts/render-lovelive-v3.mjs`：渲染当前主题图片和 GIF。

原生文字保留中文介绍，所有核心图片有替代文字。展示不依赖第三方动态图片服务。此前主题素材保留以便恢复。

## 官方参考

μ's 九位成员：高坂穗乃果、绚濑绘里、南琴梨、园田海未、星空凛、西木野真姬、东条希、小泉花阳、矢泽妮可。

- [官方成员栏目](https://www.lovelive-anime.jp/special/members/?group=tu&work=m)
- [官方列出的 μ's 九位成员](https://www.lovelive-anime.jp/yuigaoka/topics/detail.php?p=01_4947)

页面为 LLmoe 个人同人应援主页。绘图使用 Q 版创作，没有嵌入歌曲音频或歌词。

## 重新生成

需要 Node.js、Playwright、Chromium 与 ffmpeg。当前图片渲染使用 Mac 的 Chalkboard SE、American Typewriter 字体。

```sh
npm install --no-save playwright
npx playwright install chromium
node scripts/render-lovelive-v3.mjs
```

有 Google Chrome 时可设 `PLAYWRIGHT_CHANNEL=chrome`。动画帧存于被忽略的 `tmp/`。

## 插画最终提示词

生成方式：内置 `image_gen`，新图生成，透明背景，非 CLI 回退。

```text
Use case: stylized-concept
Asset type: transparent group sticker for a pink Love Live! μ's fan GitHub profile.
Primary request: All NINE members of μ's from Love Live! as extremely cute super-deformed chibi girls, a warm hand-painted kawaii stationery group sticker. Exactly nine distinct girls, no duplicates and no extra people. Huge rounded heads, tiny bodies, tiny mitten hands, rosy cheeks, soft glossy anime eyes, cheerful friendly expressions, fluffy colored-pencil and gouache texture. Wholesome, modest full-body school-uniform styling: navy blazers, white shirts, plaid pleated skirts, socks and shoes, tasteful small colorful ribbon ties. Their recognized hair silhouettes and eye colors are essential.
Arrange in two staggered rows, four at the back and five at the front, all faces fully visible:
BACK ROW, left to right:
1. Eli Ayase / 絢瀬絵里: blonde high ponytail, blue eyes.
2. Nozomi Tojo / 東條希: long dark-purple hair in low twin tails, green eyes.
3. Umi Sonoda / 園田海未: long straight dark navy-blue hair with blunt bangs, amber eyes.
4. Kotori Minami / 南ことり: long ash-brown hair with side ponytail and characteristic little upward forelock, amber eyes.
FRONT ROW, left to right:
5. Rin Hoshizora / 星空凛: short orange bob, golden eyes, cheerful catlike smile.
6. Hanayo Koizumi / 小泉花陽: short light-brown bob, green eyes, gentle shy smile.
7. Honoka Kosaka / 高坂穂乃果: orange shoulder-length hair with small side ponytail, blue eyes, energetic smile, at center.
8. Maki Nishikino / 西木野真姫: red shoulder-length hair, violet eyes.
9. Nico Yazawa / 矢澤にこ: black twin tails with pink-red ribbons, red eyes, playful pose.
Style: very round mochi-like chibi proportions and cute small limbs, two-head-tall bodies, delicate warm cocoa outlines, pale rosy shading and light pink ambient accents. Matte illustrative finish like lovingly drawn fan stationery. NOT realistically proportioned anime portraits, not glossy 3D, not mature glamorous figures. A few tiny pink hearts, cream star sparkles and music notes around the edges. White cut-sticker outline around the whole group.
Composition: compact wide horizontal group, landscape 3:2 canvas, breathing room around all nine. All bodies visible, no cropped faces. Truly transparent background outside the sticker. No stage backdrop or rectangular panel.
Constraints: no lettering, no text, logos, watermark, no extra characters or mascots. The final image must clearly contain exactly nine recognizable μ's members.
```
