# LLmoe 主页设计

风格：软萌二次元 × 樱花粉；草莓牛奶粉、奶油白、莓果玫瑰色文字。

个人介绍：写代码，也创造一点有趣的东西。

主页使用仓库内的 PNG、GIF 和 SVG。终端动画提供 reduced-motion 静态版本，手机使用单独的横幅排版。内容聚焦个人视觉与介绍，不展示项目或 Fork。

## 当前文件

- `assets/sakura-city.png`：内置 image_gen 编辑生成的粉色插画。
- `assets/hero-pink.png`、`hero-pink-mobile.png`：电脑和手机横幅。
- `assets/terminal-pink.gif`：粉色打字动画；`terminal-pink.png` 为静态版本。
- `assets/footer-pink.svg`：粉色爱心页脚。
- `scripts/banner.html`：横幅和终端的可编辑排版源文件。

此前版本的图片保留在仓库历史与素材目录中，当前主页使用上述粉色版本。

## 重新生成

需要 Node.js、Playwright、Chromium 和 ffmpeg。

```sh
npm install --no-save playwright
npx playwright install chromium
node scripts/render-artwork.mjs
```

已安装 Google Chrome 时可以用 `PLAYWRIGHT_CHANNEL=chrome`。生成帧位于被忽略的 `tmp/` 目录。

## 插画最终提示词

生成方式：内置 `image_gen` 编辑；参考图为 `assets/cyber-city.png`，非 CLI 回退。

```text
Use case: style-transfer
Asset type: revised ultra-wide GitHub profile illustration, kawaii pink anime developer world.
Input image 1: edit target. Restyle the supplied original developer and city scene into a much cuter, brighter, very pink kawaii anime illustration while preserving its ultra-wide 3:1 layout, the recognizable silver-white-haired developer at the right, the open laptop, and the small floating cat companion on the far right.
Primary changes: replace the dark rainy night with a dreamy soft pink futuristic city at golden morning light, cherry-blossom petals, pearly clouds, subtle holographic hearts and little star sparkles. The adult developer has fluffy silver-white hair, a cute small dusty-pink ribbon clip, lively teal eyes, a tiny warm smile and soft rosy cheeks. Replace the heavy black technical jacket with a comfy ivory-and-blush-pink oversized hoodie, modest and fully clothed. Make the floating cat a round soft pink and cream holographic kitty with a playful friendly expression. Stylish anime linework, pastel gouache shading, gentle bloom, fluffy and cozy rather than gritty.
Composition: character, laptop and cat remain on the right 45%. Left 52% must be light warm blush-cream negative space for later dark-rose title typography; almost empty, only very subtle tiny petal/star accents at the edges. No distracting objects on the left. Broad smooth atmosphere across the center with the pink city fading into pale cream.
Palette: sakura pink #ffc3d7, strawberry milk #fff1f6, ivory #fffaf4, dusty rose #d65f91, tiny periwinkle accents. Predominantly pink, softly saturated; no black backdrop and no strong cyan.
Constraints: NO TEXT, no lettering, no logos, no watermark, no interface cards or borders. Keep original fictional character identity, visibly adult, clean hands and natural anatomy. Wide hero image, illustration only.
```
