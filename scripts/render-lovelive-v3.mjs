import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const frameSets=['desktop','mobile'].map(size=>({size,path:resolve(root,`tmp/lovelive-v3-${size}-frames`)}));
for(const frames of frameSets)await mkdir(frames.path,{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHANNEL?{channel:process.env.PLAYWRIGHT_CHANNEL}:{})});
try{
  const page=await browser.newPage({viewport:{width:1200,height:1200},deviceScaleFactor:1});
  await page.goto(pathToFileURL(resolve(root,'scripts/lovelive-v3.html')).href);
  await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(image=>image.decode()))});
  await page.locator('.ticket').screenshot({path:resolve(root,'assets/hero-lovelive-v3.png'),omitBackground:true});
  await page.locator('.ticket').evaluate(element=>element.classList.add('mobile'));
  await page.locator('.ticket').screenshot({path:resolve(root,'assets/hero-lovelive-v3-mobile.png'),omitBackground:true});
  await page.locator('.ticket').evaluate(element=>element.classList.remove('mobile'));
  for(const frames of frameSets){
    await page.locator('.cheer').evaluate((element,mobile)=>element.classList.toggle('mobile',mobile),frames.size==='mobile');
    await page.evaluate(()=>window.setFrame(0));
    const suffix=frames.size==='mobile'?'-mobile':'';
    await page.locator('.cheer').screenshot({path:resolve(root,`assets/cheer-lovelive-v3${suffix}.png`),omitBackground:true});
    for(let frame=0;frame<135;frame++){
      await page.evaluate(frame=>window.setFrame(frame),frame);
      await page.locator('.cheer').screenshot({path:resolve(frames.path,`${String(frame).padStart(3,'0')}.png`),omitBackground:true});
    }
  }
}finally{await browser.close()}
for(const frames of frameSets){
  const suffix=frames.size==='mobile'?'-mobile':'';
  execFileSync('ffmpeg',['-y','-loglevel','error','-framerate','15','-i',resolve(frames.path,'%03d.png'),'-filter_complex','[0:v]split[a][b];[a]palettegen=stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=3:diff_mode=rectangle','-loop','0',resolve(root,`assets/cheer-lovelive-v3${suffix}.gif`)],{stdio:'inherit'});
}
console.log('Rendered LoveLive! desktop/mobile tickets and cheer animation.');
