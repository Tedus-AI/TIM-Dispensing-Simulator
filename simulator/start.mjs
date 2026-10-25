import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const url='http://127.0.0.1:5173/';
async function ready(){try{const r=await fetch(url+'tim-health.json',{signal:AbortSignal.timeout(800)});return (await r.json()).application==='tim-dispensing-lab';}catch{return false;}}
if(!await ready()){
  const child=spawn(process.execPath,[fileURLToPath(new URL('./server.mjs',import.meta.url))],{detached:true,stdio:'ignore',windowsHide:true});child.unref();
  let success=false;for(let i=0;i<20;i++){await new Promise(r=>setTimeout(r,250));if(await ready()){success=true;break;}}
  if(!success){console.error('無法啟動。請確認 dist 建置已存在，且 5173 連接埠未被其他程式占用。');process.exit(1);}
}
console.log('TIM 點膠研究室已啟動：'+url);
if(!process.argv.includes('--no-open'))spawn('rundll32.exe',['url.dll,FileProtocolHandler',url],{detached:true,stdio:'ignore',windowsHide:true}).unref();
