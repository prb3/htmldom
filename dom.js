
globalThis.Tag=(name,attrs={},...kids)=>`<${name}${Object.entries(attrs).map(([k,v])=>` ${k}="${v}"`).join('')}>${kids.join('')}</${name}>`
globalThis.$=(s,r=document)=>r.querySelector(s)
globalThis.$$=(s,r=document)=>[...r.querySelectorAll(s)]
globalThis.mount=(root,acts)=>$$('[data-act]',root).forEach(b=>{b.onclick=()=>acts[b.dataset.act]?.(root)})
globalThis.vals=root=>Object.fromEntries($$('input[name]',root).map(i=>[i.name,parseFloat(i.value)]))
globalThis.put=(root,html,badge)=>($('output',root).innerHTML=html,badge!==undefined&&($('.badge',root).textContent=badge))
globalThis.Title=t=>Tag('h1',{},t)
globalThis.Box=(...xs)=>{const o=xs[0]&&typeof xs[0]==='object'&&!Array.isArray(xs[0])?xs.shift():{};const s=[o.w&&`--w:${o.w}px`,o.h&&`--h:${o.h}px`].filter(Boolean).join(';');return Tag('div',{class:'box'+(o.class?' '+o.class:''),style:s},...xs)}
globalThis.Row=(...xs)=>Tag('div',{class:'row'},...xs)
globalThis.Col=(...xs)=>Tag('div',{class:'col'},...xs)
globalThis.Btn=(t,act)=>Tag('button',{'data-act':act},t)
globalThis.Out=(id='out')=>Tag('output',{id,class:'out'})
globalThis.Badge=(id='badge')=>Tag('span',{id,class:'badge'})
globalThis.Hide=(id,...xs)=>Tag('div',{id,style:'display:none'},...xs)
globalThis.Css=s=>Tag('style',{},s)
globalThis.Num=(label,name,unit='')=>Tag('label',{class:'num'},Tag('span',{},label),Tag('input',{type:'number',name}),Tag('em',{},unit))
globalThis.Textarea=(id,rows=20)=>Tag('textarea',{id,rows})
globalThis.Iframe=id=>Tag('iframe',{id})
globalThis.Bind=(sel,ev,fn)=>{const el=$(sel);el&&el.addEventListener(ev,fn);return el}
globalThis.Csv=s=>s.trim().split(/\r?\n/).map(l=>{let r=[],c='',q=0;for(let i=0;i<l.length;i++){let ch=l[i];if(q){if(ch=='"'){if(l[i+1]=='"'){c+='"';i++}else q=0}else c+=ch}else if(ch=='"')q=1;else if(ch==','){r.push(c);c=''}else c+=ch}r.push(c);return r});
globalThis.Table=(rows,head=1)=>Tag('table',{class:'csv'},head&&rows.length?Tag('thead',{},Tag('tr',{},...rows[0].map(h=>Tag('th',{},h)))):'',Tag('tbody',{},...rows.slice(head?1:0).map(r=>Tag('tr',{},...r.map(c=>Tag('td',{},c))))));
globalThis.Page=(t,...xs)=>`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${t}</title><style>body{font-family:sans-serif;padding:20px;max-width:800px;margin:auto}</style></head><body>${xs.join('')}</body></html>`
if(require.main==module){const a=process.argv[2]||'',m=a[0]=='.'?'jh':'h',n=a[0]=='.'?a.slice(1):a,f=require('fs'),L=f.readFileSync(process.env.UT+'/dom.txt','utf8').split('\n'),i=n?L.indexOf('##'+n):-1,c=n?(i<0?'':L.slice(i+1).join('\n').split('\n##')[0]):f.readFileSync(0)+'';process.stdout.write(m=='jh'?'<!DOCTYPE html><meta charset="utf-8"><style>'+f.readFileSync(process.env.KT+'/style/dom.css','utf8')+'</style><body></body><script>'+f.readFileSync(__filename,'utf8').replace(/if\(require\.main==module\)\{[\s\S]*$/,'')+'</script><script>'+c+'</script>':(eval(c),''))}

