# LLmoe 主页设计

风格：二次元 × 赛博；墨蓝背景、青色霓虹、珊瑚色点缀。

个人介绍：写代码，也创造一点有趣的东西。

主页直接使用仓库中的静态 PNG、GIF 和 SVG，不依赖第三方动态图片服务。终端动画提供 reduced-motion 静态版本。展示内容来自当前可正常访问的公开仓库，Fork 明确标注。

## 文件

- `assets/cyber-city.png`：内置 image_gen 生成的原创插画。
- `assets/hero.png`：插画与代码排版组合的最终横幅。
- `assets/terminal.gif`：打字动画；`terminal.png` 为静态版本。
- `assets/project.svg`、`footer.svg`：可编辑的原生矢量设计。
- `scripts/banner.html`：横幅和终端的排版源文件。

## 重新生成

需要 Node.js、Playwright、Chromium 和 ffmpeg。

```sh
npm install --no-save playwright
npx playwright install chromium
node scripts/render-artwork.mjs
```

已安装 Google Chrome 时可以用 `PLAYWRIGHT_CHANNEL=chrome`。生成帧位于被忽略的 `tmp/` 目录。

## 插画最终提示词

生成方式：内置 `image_gen`，非 CLI 回退。

```text
Use case: stylized-concept
Asset type: original ultrawide GitHub profile hero illustration for developer LLmoe, anime x cyber aesthetic.
Primary request: A polished cinematic anime illustration of a friendly adult cyberpunk developer character on a rain-lit rooftop above a dense neon city at night. Original character: short silver-white hair with a small cyan hair clip, bright teal eyes, oversized black technical jacket with cyan trim and subtle coral accents, typing on a compact laptop, calm confident smile. One small cute holographic cat floats nearby. Waist-up character occupies the right third, face fully visible and anatomically clean. City details sit primarily on the right and far background.
Composition: 3:1 ultra-wide landscape, approximately 2400 by 800. Left 52 percent is dark atmospheric negative space for a later large text overlay, almost-black midnight blue with a few thin circuit-like lines and restrained drifting neon particles. Keep the left clean, quiet, high contrast. Right side has meticulous hand-drawn anime linework, layered city depth, rain reflections, cyan signage shapes, coral light accents, electric blue rim lighting. The character should feel like a thoughtful maker in a playful digital world.
Palette: ink navy #080d1c, electric cyan #65f3ec, warm coral #ff819a, pale white. Sophisticated and art-directed, not a generic purple gradient.
Lighting: luminous cyan rim light, soft coral fill, subtle film grain.
Constraints: illustration only, NO TEXT, no letters, no logos, no watermark, no UI cards, no graph, no borders; original fictional character, fully clothed, age visibly adult. Designed to look excellent as a slim GitHub banner.
```
