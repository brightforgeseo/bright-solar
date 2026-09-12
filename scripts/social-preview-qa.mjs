import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const walk=p=>fs.readdirSync(p,{withFileTypes:true}).flatMap(x=>x.isDirectory()?walk(path.join(p,x.name)):[path.join(p,x.name)]);
const files=walk('dist').filter(p=>p.endsWith('.html'));assert.ok(files.length>0);
for(const file of files){const html=fs.readFileSync(file,'utf8');if(!html.includes('property="og:title"')) continue;
assert.ok(html.includes('property="og:image" content="https://brightsolar.com.ph/og.jpg"'),file);
for(const text of ['property="og:image:width" content="1200"','property="og:image:height" content="630"','name="twitter:card" content="summary_large_image"','name="twitter:image" content="https://brightsolar.com.ph/og.jpg"']) assert.ok(html.includes(text),file+' '+text);
}
assert.ok(fs.statSync('dist/og.jpg').size<1000000);
console.log(JSON.stringify({status:'PASS',html_files:files.length}));
