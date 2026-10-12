import {LINKS,WEEKS,getTasks,DEFAULT_START,calendarDays,dayDate,dateValidStart,realDate,localISO} from './curriculum.js';
import {publicKeyValid,projectURLValid,authErrorMessage} from './auth-helpers.js';
import {DEFAULT_PUBLIC_CONFIG} from './public-config.js';

const DEMO_KEY='momentum_english_demo_v1';
const CLOUD_CONFIG_KEY='momentum_english_supabase_config_v1';
const emptyState=()=>({startDate:DEFAULT_START,progress:{},words:[],reviews:{}});
const $=selector=>document.querySelector(selector);
const $$=selector=>[...document.querySelectorAll(selector)];
const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const validNumber=(n,min,max)=>Number.isFinite(Number(n))?Math.min(max,Math.max(min,Number(n))):min;
const today=()=>localISO(new Date());
let localLoadFailed=false;
let demo=readLocalDemo(); let state=demo;
let sb=null,user=null,cloud=false,busy=false,table=null,planRows=[];
let view='home',selectedKey='',selectedWeek=1;
let toastTimeout;
let authGeneration=0,loadGeneration=0,subscription=null,clientGeneration=0,clientURL='';
let signingIn=false,loginAttempt=0,loginContext=null;
function activeDays(){return calendarDays(state.startDate);}
function cloudContext(){return {client:sb,id:user?.id,generation:authGeneration};}
function contextCurrent(ctx){return ctx.client===sb && ctx.id===user?.id && ctx.generation===authGeneration;}
function requireContext(ctx){if(!contextCurrent(ctx))throw Error('账号已切换，请重新操作。');}
function resetIdentity(nextUser=null){
 authGeneration++;loadGeneration++;$('#login-password').value='';user=nextUser;cloud=false;state=demo;
 selectedKey=pickToday().key;renderAll();setMode(nextUser?'正在读取云端…':'已退出 · 演示模式');
}
function handleSession(session){
 const next=session?.user||null;
 if(next?.id!==user?.id)resetIdentity(next);
 if(next && !cloud){const ctx=cloudContext();setTimeout(()=>{if(contextCurrent(ctx))remoteLoad(ctx);},0);}
}
function notice(message,isError=false){const t=$('#toast');t.textContent=message;t.className='toast on'+(isError?' error':'');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>t.className='toast',5500);}
function readLocalDemo(){try{const v=JSON.parse(localStorage.getItem(DEMO_KEY)||'null');if(v===null)return emptyState();if(!isState(v))throw Error('格式无效');return normalizeState(v);}catch{localLoadFailed=true;return emptyState();}}
function isState(o){return o&&typeof o==='object'&&!Array.isArray(o)&&typeof o.startDate==='string'&&o.progress&&typeof o.progress==='object'&&!Array.isArray(o.progress)&&Array.isArray(o.words)&&o.reviews&&typeof o.reviews==='object'&&!Array.isArray(o.reviews);}
function normalizeState(s){if(!dateValidStart(s.startDate))throw Error('备份开始日期不是有效的周一至周六日期；原记录未改动。');return {startDate:s.startDate,progress:s.progress||{},words:s.words||[],reviews:s.reviews||{}};}
function isAuthed(){return !!(sb&&user&&cloud);}
function taskIdValid(s){return /^w(?:[1-9]|1\d|2[0-6])-d[1-6]:(voc|grammar|listening|reading|speaking)$/.test(s);}
function weekValid(s){return Number.isInteger(Number(s))&&Number(s)>=1&&Number(s)<=26;}
function getProgress(t){return state.progress[t.id]||{completed:false,minutes:0,evidence:''};}
function completedCount(day){return getTasks(day).filter(t=>getProgress(t).completed).length;}
function weakFor(week){const prev=state.reviews[week-1];if(!prev)return '';if(prev.weak_skill) return prev.weak_skill;const k=['vocabulary','grammar','listening','reading','speaking'];const map={vocabulary:'词汇',grammar:'语法',listening:'听力',reading:'阅读',speaking:'口语'};return map[k.reduce((a,b)=>(Number(prev[b])<Number(prev[a])?b:a))];}
function dayFor(k){return activeDays().find(d=>d.key===k);}
function pickToday(){
 const days=activeDays(),now=today();
 return days.find(d=>d.date===now) || days.find(d=>d.date>=now && completedCount(d)<5) || days.find(d=>completedCount(d)<5) || days.at(-1);
}
function currentDay(){return dayFor(selectedKey)||pickToday();}
function escUrl(u){try{const x=new URL(u);return ['http:','https:'].includes(x.protocol)?x.href:'#';}catch{return '#';}}
function setMode(message='',err=false){const pill=$('#sync-state');pill.textContent=message||(isAuthed()?'✓ Supabase 云端已连接':'本机演示 · 不跨设备同步');pill.className='sync-pill '+(err?'err':isAuthed()?'':'demo');$('#side-mode').textContent=isAuthed()?'Supabase 云端存储':'本机演示模式';$('#account-btn').textContent=isAuthed()?'已登录 '+(user.email||'云端'):'连接 Supabase';$('#logged-user').textContent=isAuthed()?(user.email||'已登录'):'尚未登录';$('#mode-explainer').textContent=isAuthed()?'已登录 Supabase：日常打卡、迁移词卡、周复盘和计划起始日期写入云端。同账号在 Mac 与手机上可同步。':'当前处于本机演示模式：可试用但数据只保存在这个浏览器；连接项目并邮箱登录后才开启云端同步。';}
function localCommit(){localStorage.setItem(DEMO_KEY,JSON.stringify(demo));setMode('✓ 已保存在当前浏览器');}
async function remoteWrite(tableName,payload,onConflict,ctx=cloudContext()){
 requireContext(ctx);
 if(!ctx.id)throw Error('云端未登录');
 let result;try{result=await ctx.client.from(tableName).upsert(payload,onConflict?{onConflict}:undefined);}catch{throw Error('云端请求失败，请检查网络或表权限。');}
 requireContext(ctx);if(result.error)throw Error('云端请求失败，请检查网络或表权限。');
}
async function saveChange(kind,payload){
 if(busy){notice('正在保存上一项记录，请稍后重试。',true);return false;}
 if(user&&!cloud){notice('云端尚未加载，请等待或退出登录后使用演示模式。',true);return false;}
 const ctx=cloudContext(),sourceState=state;
 busy=true;setMode('保存中…');
 try{
  if(isAuthed()){
   if(kind==='progress')await remoteWrite('coach_tasks',{user_id:ctx.id,task_key:payload.id,completed:!!payload.value.completed,minutes:validNumber(payload.value.minutes,0,180),evidence:String(payload.value.evidence||'').slice(0,350)},null,ctx);
   if(kind==='start')await remoteWrite('coach_settings',{user_id:ctx.id,start_date:payload},null,ctx);
   if(kind==='word')await remoteWrite('coach_words',wordRemote(payload,ctx.id),null,ctx);
   if(kind==='review')await remoteWrite('coach_reviews',reviewRemote(payload,ctx.id),null,ctx);
   if(kind==='removeWord'){
    const {error}=await ctx.client.from('coach_words').delete().eq('user_id',ctx.id).eq('id',payload);
    requireContext(ctx);if(error)throw Error('云端删除失败，请检查网络或表权限。');
   }
  }else if(localLoadFailed)throw Error('本机旧数据读取失败，原值已保留；请先导入有效备份。');
  if(!contextCurrent(ctx)||state!==sourceState)return false;
  setMode(isAuthed()?'✓ 已同步到 Supabase':'✓ 已保存在当前浏览器');return true;
 }catch(e){
  if(contextCurrent(ctx)){setMode('保存失败 · 请检查网络',true);notice('保存失败，修改未生效；请检查网络、权限或本机旧数据。',true);}
  return false;
 }finally{busy=false;}
}
function wordRemote(w,userId=user?.id){return {id:w.id,user_id:userId,term:w.term,meaning:w.meaning,source:w.source,example:w.example||'',mastery:w.mastery||0,next_review:w.next_review||today()};}
function reviewRemote(r,userId=user?.id){return {user_id:userId,week_no:r.week,summary:r.summary||'',weak_skill:r.weak_skill||null,vocabulary:r.vocabulary,grammar:r.grammar,listening:r.listening,reading:r.reading,speaking:r.speaking};}
async function mutateProgress(id,fields){const existing=state.progress[id]||{completed:false,minutes:0,evidence:''};const next={...existing,...fields};const ok=await saveChange('progress',{id,value:next});if(!ok)return;state.progress[id]=next;if(!isAuthed())localCommit();renderAll();return true;}
async function mutateWord(w){const ok=await saveChange('word',w);if(!ok)return;const idx=state.words.findIndex(x=>x.id===w.id);if(idx>=0)state.words[idx]=w;else state.words.unshift(w);if(!isAuthed())localCommit();renderAll();}
function shiftDays(amount){const d=new Date();d.setDate(d.getDate()+amount);return localISO(d);}
function dueWord(w){return (w.next_review||today())<=today();}
function navigate(target){view=target;$$('.view').forEach(el=>el.classList.toggle('visible',el.id==='view-'+target));$$('.nav-item').forEach(el=>el.classList.toggle('active',el.dataset.view===target));$('#page-crumb').textContent=({home:'今日总览',daily:'每日训练',plan:'26 周计划',words:'表达迁移',review:'每周复盘',resources:'工具使用说明',settings:'数据与设置'})[target];$('.sidebar').classList.remove('open');if(target==='daily')renderDaily();if(target==='review')renderReview();if(target==='plan')renderPlan();window.scrollTo({top:0,behavior:'instant'});}
function renderAll(){initializeDailyOptions();renderHome();renderDaily();renderWords();renderReview();renderSettings();if(view==='plan')renderPlan();}
function renderHome(){const calendar=activeDays(),tasks=calendar.flatMap(d=>getTasks(d));const complete=tasks.filter(t=>getProgress(t).completed).length;const minutes=tasks.reduce((sum,t)=>sum+(Number(getProgress(t).minutes)||0),0);const days=calendar.filter(d=>completedCount(d)===5).length;$('#core-count').textContent=`全部 ${tasks.length} 项核心训练`;$('#calendar-summary').textContent=`${calendar.length} 个学习日，每天 5 项任务，周日休息。`;$('#s-progress').textContent=Math.round(complete/tasks.length*100)+'%';$('#s-minutes').innerHTML=(minutes/60).toFixed(1)+'<span>h</span>';$('#s-days').innerHTML=days+` <span>/ ${calendar.length}</span>`;$('#s-words').textContent=state.words.length;$('#today-label').textContent='今天 '+today();const d=pickToday();$('#home-week-badge').textContent='WEEK '+String(d.week).padStart(2,'0');$('#home-next').innerHTML=`<div class="next-focus">${escapeHTML(d.weekData.topic)}</div><div class="next-desc">${escapeHTML(d.weekData.phase)} · ${escapeHTML(d.dayName)} · ${escapeHTML(d.focus)}<br>${escapeHTML(d.weekData.grammar)}<br>课程单元：${escapeHTML(d.weekData.lessons.join('、'))} · VOA《${escapeHTML(d.weekData.voa)}》<br>${completedCount(d)}/5 项任务已完成</div>`;}
function renderDaily(){const day=currentDay();$('#daily-day').value=day.key;$('#daily-date-label').textContent=dayDate(state.startDate,day.week,day.day)+' · '+day.dayName;$('#daily-phase').textContent='WEEK '+String(day.week).padStart(2,'0')+' · '+day.weekData.phase;$('#daily-topic').textContent=day.weekData.topic;$('#daily-sub').textContent=day.focus+' · 核心语法 '+day.weekData.grammar+' · 本周输出目标：'+day.weekData.output;const tasks=getTasks(day,weakFor(day.week));const c=tasks.filter(t=>getProgress(t).completed).length;$('#daily-rate').textContent=Math.round(c*20)+'%';$('#daily-donut').style.background=`conic-gradient(#386b49 ${c*20}%,#f3f8ec 0)`;$('#task-list').innerHTML=tasks.map(t=>{const p=getProgress(t);return `<article class="task-card ${p.completed?'done':''}" data-task-id="${t.id}"><button class="task-check" data-task-toggle="${t.id}" aria-label="${p.completed?'取消':'完成'} ${escapeHTML(t.title)}">${p.completed?'✓':''}</button><div><div class="task-top"><h3>${escapeHTML(t.title)}</h3><span class="tag">${escapeHTML(t.resource)}</span><span class="tag time">建议 ${t.minutes} 分钟</span></div><p>${escapeHTML(t.instruction)}</p><p class="accept"><b>完成标准：</b>${escapeHTML(t.done)}</p><div class="task-footer"><label>实际分钟 <input type="number" data-actual="${t.id}" min="0" max="180" value="${p.minutes||0}" aria-label="实际训练分钟"></label><label>完成证据 / 易错点 <input type="text" maxlength="350" data-evidence="${t.id}" value="${escapeHTML(p.evidence||'')}" placeholder="留一句自己的表达或错误"></label><button class="outline-btn" data-task-save="${t.id}">保存记录</button><a class="external" href="${escUrl(t.url)}" target="_blank" rel="noopener noreferrer">打开 ${escapeHTML(t.resource)} ↗</a>${t.extraUrl?`<a class="external" href="${escUrl(t.extraUrl)}" target="_blank" rel="noopener noreferrer">${escapeHTML(t.extraLabel)} ↗</a>`:''}</div></div></article>`}).join('');}
function renderPlan(){const week=$('#plan-week').value, status=$('#plan-status').value, query=$('#plan-query').value.trim().toLowerCase();planRows=activeDays().filter(d=>{const done=completedCount(d)===5;return (week==='all'||d.week===Number(week))&&(status==='all'||(status==='complete'?done:!done))&&(!query||[d.weekData.topic,d.weekData.grammar,d.weekData.lessons.join(','),d.weekData.voa,d.weekData.phase].join(' ').toLowerCase().includes(query));}).map(d=>({key:d.key,week:`W${String(d.week).padStart(2,'0')}`,date:dayDate(state.startDate,d.week,d.day),day:d.dayName,phase:d.weekData.phase,topic:d.weekData.topic,nce:d.weekData.lessons.join(' / '),focus:d.focus,progress:`${completedCount(d)}/5`,status:completedCount(d)===5?'已完成':'进行中'}));$('#plan-count').textContent=`${planRows.length} 个学习日`;const area=$('#vtable'), fallback=$('#table-fallback');if(table){try{table.release();}catch{}table=null;}area.innerHTML='';fallback.innerHTML='';if(window.VTable?.ListTable){try{const opts={container:area,records:planRows,columns:[{field:'week',title:'周次',width:68},{field:'date',title:'日期',width:112},{field:'day',title:'星期',width:65},{field:'phase',title:'阶段',width:110},{field:'topic',title:'本周主题',width:150},{field:'nce',title:'新概念单元',width:105},{field:'focus',title:'当日重点',width:140},{field:'progress',title:'进度',width:70}],defaultRowHeight:44,headerRowHeight:45,theme:{headerStyle:{bgColor:'#e8f1e4',color:'#31513b',fontWeight:'bold'},bodyStyle:{bgColor:'#fff',color:'#27402f'},frameStyle:{borderColor:'#dfe8dc',cornerRadius:0}},autoWrapText:false,showHeader:true};table=new window.VTable.ListTable(opts);table.on(window.VTable.ListTable.EVENT_TYPE.CLICK_CELL,e=>{if(e.row<1)return;const rec=table.getRecordByCell?.(e.col,e.row) || planRows[e.row-1];if(rec?.key){selectedKey=rec.key;navigate('daily');}});area.hidden=false;fallback.hidden=true;return;}catch(e){notice('VTable 未能初始化，已使用 HTML 表格。',true);}}area.hidden=true;fallback.hidden=false;fallback.innerHTML=`<table class="fallback-table"><thead><tr><th>周次</th><th>日期</th><th>星期</th><th>阶段</th><th>学习主题</th><th>新概念单元</th><th>进度</th></tr></thead><tbody>${planRows.map(r=>`<tr data-plan-row="${r.key}"><td>${r.week}</td><td>${r.date}</td><td>${r.day}</td><td>${escapeHTML(r.phase)}</td><td>${escapeHTML(r.topic)}</td><td>${r.nce}</td><td>${r.progress}</td></tr>`).join('')}</tbody></table>`;}
function renderWords(){const box=$('#words-list');box.innerHTML=state.words.length?state.words.map(w=>`<article class="word-card"><h3>${escapeHTML(w.term)}</h3><p>${escapeHTML(w.meaning)} · ${escapeHTML(w.source)}</p>${w.example?`<div class="example">${escapeHTML(w.example)}</div>`:''}<p>迁移熟练度 ${validNumber(w.mastery,0,5)}/5 · ${dueWord(w)?'<b>今天应再次造句</b>':'下次复测：'+escapeHTML(w.next_review||'待安排')}</p><div class="word-actions"><button data-word-rating="${escapeHTML(w.id)}" data-rating="0">还不会</button><button data-word-rating="${escapeHTML(w.id)}" data-rating="1">勉强会</button><button data-word-rating="${escapeHTML(w.id)}" data-rating="2">能独立使用</button><button class="danger" data-word-remove="${escapeHTML(w.id)}">删除</button></div></article>`).join(''):'<p class="empty">尚无表达迁移卡。只记录已经在其他 App 学过、但你还不会在新句子中使用的表达。</p>';}
function renderReview(){const w=Number($('#review-week').value)||selectedWeek;selectedWeek=w;const data=state.reviews[w];const form=$('#review-form');for(const k of ['vocabulary','grammar','listening','reading','speaking'])form.elements[k].value=data?.[k]??3;form.elements.summary.value=data?.summary||'';form.elements.weak_skill.value=data?.weak_skill||'';const arr=Object.values(state.reviews).sort((a,b)=>b.week-a.week);$('#review-history').innerHTML=arr.length?arr.slice(0,8).map(r=>`<div><b>第 ${r.week} 周</b> · 下周重点：${escapeHTML(r.weak_skill||'按最低评分')} · ${escapeHTML(r.summary||'未填写复盘内容')}</div>`).join(''):'<p class="muted">每周六综合复测后填一次复盘，系统会在下一周周四的口语训练中加入你的弱项提示。</p>';}
function renderSettings(){$('#start-date').value=state.startDate;}
const RESOURCES=[
 {name:'ncego · 新概念英语',type:'系统课程',desc:'官网将《新概念英语第一册》整理成 72 个单元，提供课程笔记和单词列表。',how:'周一和周三学习新单元；周二练习、周四迁移、周五迁移、周六综合复测。按单元号进入网站，不复制受版权保护的课文。',url:LINKS.nce,extra:'提醒：本计划前 16 周每周 2 个单元；后 10 周每周 1 个单元。'},
 {name:'TypeWords',type:'词汇 · 默写',desc:'跟写、听写、自测、默写、智能复习、错词本、文章逐句输入。',how:'每天先完成智能复习，再学约 8 个新词；周五用新句迁移，周六重点复测错词。不要在本系统建立第二套完整单词本。',url:LINKS.typewords,extra:'官网开源说明未确认默认内置“新概念第一册”专门词库；可用网站提供的词库或自定义导入。'},
 {name:'小鹦看看',type:'听力 · 跟读',desc:'切换/搜索字幕、单句循环、变速播放、句间暂停、收藏句子、笔记、导出字幕与音频。',how:'每周只精学一段 VOA 视频：盲听 → 字幕核对 → 单句循环 → 跟读 → 关字幕复述。',url:LINKS.app,extra:'若要观看 YouTube 视频，请按小鹦看看官方导入教程操作；不是声称能直接读取你的视频记录。'},
 {name:'Relingo',type:'阅读 · 生词场景',desc:'分级生词高亮、划词/段落翻译、闪卡、阅读管理、YouTube 双语字幕等。',how:'每天读 A1/A2 小短文；先抓主旨，只收藏真正影响理解的生词。把少量难以运用的表达做成迁移卡。',url:LINKS.re,extra:'Relingo 自身的词汇复习留在 Relingo 中，不强行同步到 TypeWords。'},
 {name:'VOA · Let’s Learn English 1',type:'视频课程',desc:'面向初学者的官方 52 周视频课程，含听说、词汇、练习。',how:'本学习计划的 26 周每周对应官方前 26 课，每周精学 1–3 分钟片段。',url:LINKS.voa,extra:'视频未必能在所有地区直接访问；可从 VOA 官网选官方课程视频。'},
 {name:'ChatGPT',type:'口语输出',desc:'角色扮演、纠错、复述、换场景追问，不是自动给分。',how:'每天最后 20 分钟练输出；先回答，老师只纠正 1–2 个最重要的问题，再换场景测试是否掌握。',url:LINKS.chat,extra:'与此网页没有直接数据接口；聊天结果由你手动记录一句证据。'}
];
function renderResources(){$('#resource-cards').innerHTML=RESOURCES.map(r=>`<article class="resource-card"><span class="rank">${escapeHTML(r.type)}</span><h3>${escapeHTML(r.name)}</h3><p>${escapeHTML(r.desc)}</p><p><b>具体怎么用：</b>${escapeHTML(r.how)}</p><p class="hint">${escapeHTML(r.extra)}</p><a class="source-link" target="_blank" rel="noopener noreferrer" href="${escUrl(r.url)}">查看官方资源 ↗</a></article>`).join('');}
function initializeDailyOptions(){
 const days=activeDays();if(!days.some(d=>d.key===selectedKey))selectedKey=pickToday().key;
 $('#daily-day').replaceChildren(...days.map(d=>{
  const o=document.createElement('option');o.value=d.key;o.textContent=`第 ${String(d.week).padStart(2,'0')} 周 ${d.dayName} — ${d.date} — ${d.weekData.topic}`;return o;
 }));
}
function initializeOptions(){
 for(const w of WEEKS){
  const o=document.createElement('option');o.value=w.number;o.textContent=`第 ${w.number} 周 · ${w.topic}`;$('#review-week').append(o);
  const p=document.createElement('option');p.value=w.number;p.textContent=`第 ${w.number} 周`;$('#plan-week').append(p);
 }
}
// Backups can contain up to 3000 word cards; one default API page is insufficient.
async function remoteRows(ctx,tableName,columns,orderKey){
 const rows=[];
 for(let offset=0;;offset+=100){
  requireContext(ctx);
  const result=await ctx.client.from(tableName).select(columns).eq('user_id',ctx.id).order(orderKey).range(offset,offset+99);
  requireContext(ctx);
  if(result.error)throw Error('云端分页读取失败');
  rows.push(...(result.data||[]));
  if((result.data||[]).length<100)return {data:rows,error:null};
 }
}
async function remoteLoad(ctx=cloudContext()){
 if(!ctx.client||!ctx.id||!contextCurrent(ctx))return;
 const load=++loadGeneration;setMode('正在读取云端…');
 const current=()=>contextCurrent(ctx)&&load===loadGeneration;
 try{
  const [a,b,c,d]=await Promise.all([
   ctx.client.from('coach_settings').select('start_date').eq('user_id',ctx.id).maybeSingle(),
   remoteRows(ctx,'coach_tasks','task_key,completed,minutes,evidence','task_key'),
   remoteRows(ctx,'coach_words','id,term,meaning,source,example,mastery,next_review','id'),
   remoteRows(ctx,'coach_reviews','week_no,summary,weak_skill,vocabulary,grammar,listening,reading,speaking','week_no')
  ]);
  if(!current())return;
  if([a,b,c,d].some(r=>r.error))throw Error('云端请求失败，请检查网络、SQL 初始化和权限。');
  const newState=emptyState();
  if(a.data?.start_date){if(!dateValidStart(a.data.start_date))throw Error('云端开始日期无效；原数据未改动，请核查。');newState.startDate=a.data.start_date;}
  for(const p of b.data||[])if(taskIdValid(p.task_key))newState.progress[p.task_key]={completed:!!p.completed,minutes:p.minutes||0,evidence:p.evidence||''};
  newState.words=(c.data||[]).map(w=>({...w}));
  for(const r of d.data||[])if(weekValid(r.week_no))newState.reviews[r.week_no]={...r,week:r.week_no};
  state=newState;cloud=true;selectedKey=pickToday().key;renderAll();setMode('✓ 云端数据已加载');notice('已从 Supabase 读取学习记录');
 }catch(e){
  if(!current())return;
  cloud=false;state=demo;renderAll();setMode('云端读取失败 · 暂停云端操作',true);notice('云端读取失败，请检查网络、表权限和开始日期；原数据未改动。',true);
 }
}
async function initCloudClient(){
 const savedConfig=localStorage.getItem(CLOUD_CONFIG_KEY);
 let cfg=DEFAULT_PUBLIC_CONFIG;
 if(savedConfig!==null){try{cfg=JSON.parse(savedConfig);}catch{cfg=null;}}
 if(!cfg || typeof cfg.url!=='string' || !projectURLValid(cfg.url) || !publicKeyValid(cfg.key)){
  setMode('已保存的连接配置无效 · 请在设置中修正',true);
  notice('已保存的连接配置不符合公开密钥要求或格式损坏；原值已保留，请重新填写。',true);return;
 }
 if(savedConfig===null)navigate('settings');
 $('#supabase-url').value=cfg.url;$('#supabase-key').value=cfg.key;
 if(!window.supabase?.createClient){setMode('Supabase SDK 未加载 · 演示模式',true);return;}
 try{
  const client=window.supabase.createClient(cfg.url,cfg.key,{auth:{persistSession:true,autoRefreshToken:true}});sb=client;clientURL=cfg.url;clientGeneration++;
  subscription=client.auth.onAuthStateChange((event,session)=>{
   if(client!==sb)return;
   // Keep callback synchronous: SDK network calls run after its auth lock is released.
   if(event==='SIGNED_OUT'){loginAttempt++;resetIdentity();return;}
   if(session?.user){
    if(signingIn&&loginContext&&(loginContext.attempt!==loginAttempt||(loginContext.identity!==authGeneration&&session.user.id!==user?.id)))return;
    handleSession(session);
   }
  }).data.subscription;
  const generation=authGeneration;
  const {data,error}=await client.auth.getUser();
  if(client!==sb||generation!==authGeneration)return;
  if(error && ![400,401].includes(error.status))throw Error('身份检查失败');
  if(data?.user)handleSession({user:data.user});else setMode('请先使用邮箱和密码登录');
 }catch{setMode('配置或连接无效 · 演示模式',true);notice('Supabase 连接失败，请检查网络与公开配置。',true);}
}
function renderLoginControls(){
 const button=$('#password-login');button.disabled=signingIn;button.textContent=signingIn?'正在登录…':'登录';
}
async function passwordLogin(e){
 e.preventDefault();if(signingIn)return;
 const email=$('#login-email').value.trim(),password=$('#login-password').value;
 $('#login-password').value='';
 if(!sb){notice('请先填写并连接 Supabase 项目',true);return;}
 if(!email||!password){notice('请填写邮箱和密码。',true);return;}
 const client=sb,generation=clientGeneration,identity=authGeneration,attempt=++loginAttempt;
 const current=()=>client===sb&&generation===clientGeneration&&attempt===loginAttempt;
 loginContext={identity,attempt};signingIn=true;renderLoginControls();
 try{
  const {data,error}=await client.auth.signInWithPassword({email,password});
  if(!current())return;
  // SIGNED_IN may synchronously establish this identity before the promise resolves.
  if(identity!==authGeneration && user?.id!==data?.session?.user?.id)return;
  if(error){notice(authErrorMessage(error),true);return;}
  if(!data?.session?.user?.id){notice('登录未建立有效会话，请重试。',true);return;}
  handleSession(data.session);notice('登录成功，正在读取云端记录。');
 }catch{if(current()&&identity===authGeneration)notice('登录失败，请检查网络后重试。',true);}
 finally{$('#login-password').value='';signingIn=false;loginContext=null;renderLoginControls();}
}
async function loadDataFromBackup(payload){
 if(user&&!cloud)throw Error('云端尚未加载，请先等待、刷新或退出登录。');
 if(!payload||payload.app!=='momentum-english-v1'||!isState(payload.data))throw Error('文件不是当前版本的有效学习备份');
 const s=normalizeState(payload.data);
 if(Object.keys(s.progress).some(x=>!taskIdValid(x)))throw Error('包含不支持的任务编号；未导入');
 if(Object.keys(s.reviews).some(x=>!weekValid(x)))throw Error('包含不支持的周次');
 if(s.words.length>3000)throw Error('迁移卡超出数量限制');
 if(s.words.some(w=>!w||typeof w.term!=='string'||typeof w.meaning!=='string'||! /^[\da-f]{8}-(?:[\da-f]{4}-){3}[\da-f]{12}$/i.test(w.id||'') || (w.next_review&&!realDate(w.next_review))))throw Error('迁移卡格式或日期错误；未导入');
 if(Object.values(s.progress).some(p=>!p||typeof p!=='object'||Array.isArray(p)))throw Error('任务进度数据格式错误');
 if(isAuthed()){
  const ctx=cloudContext();
  await remoteWrite('coach_settings',{user_id:ctx.id,start_date:s.startDate},null,ctx);
  for(const chunk of chunked(Object.entries(s.progress).map(([k,p])=>({user_id:ctx.id,task_key:k,completed:!!p.completed,minutes:validNumber(p.minutes,0,180),evidence:String(p.evidence||'').slice(0,350)})),100))await remoteWrite('coach_tasks',chunk,null,ctx);
  for(const chunk of chunked(s.words.map(w=>wordRemote({...w,term:w.term.slice(0,100),meaning:w.meaning.slice(0,200),source:String(w.source||'').slice(0,80),example:String(w.example||'').slice(0,360),mastery:validNumber(w.mastery,0,5)},ctx.id)),100))await remoteWrite('coach_words',chunk,null,ctx);
  for(const chunk of chunked(Object.entries(s.reviews).map(([w,r])=>reviewRemote({...r,week:Number(w)},ctx.id)),100))await remoteWrite('coach_reviews',chunk,null,ctx);
  requireContext(ctx);await remoteLoad(ctx);
 }else{demo=s;state=demo;localLoadFailed=false;localCommit();selectedKey=pickToday().key;renderAll();}
}
function chunked(a,n){const result=[];for(let i=0;i<a.length;i+=n)result.push(a.slice(i,i+n));return result;}
function bind(){document.addEventListener('click',async e=>{const nav=e.target.closest('[data-view],[data-go]');if(nav){navigate(nav.dataset.view||nav.dataset.go);return;}const toggle=e.target.closest('[data-task-toggle]');if(toggle){const id=toggle.dataset.taskToggle;const t=getTasks(currentDay()).find(t=>t.id===id);if(!t)return;const p=getProgress(t);const card=toggle.closest('.task-card');const typedMinutes=Number(card?.querySelector('[data-actual]')?.value||0);const typedEvidence=card?.querySelector('[data-evidence]')?.value?.trim()||'';await mutateProgress(id,{completed:!p.completed,minutes:!p.completed&&!typedMinutes?t.minutes:validNumber(typedMinutes,0,180),evidence:typedEvidence.slice(0,350)});return;}const save=e.target.closest('[data-task-save]');if(save){const id=save.dataset.taskSave;const el=$$('.task-card').find(c=>c.dataset.taskId===id);if(el){const t=getTasks(currentDay()).find(t=>t.id===id);if(!t)return;const ok=await mutateProgress(id,{...getProgress(t),minutes:validNumber(el.querySelector('[data-actual]').value,0,180),evidence:el.querySelector('[data-evidence]').value.trim().slice(0,350)});if(ok)notice('学习记录已保存');}return;}const rate=e.target.closest('[data-word-rating]');if(rate){const old=state.words.find(w=>w.id===rate.dataset.wordRating);if(!old)return;const delta=Number(rate.dataset.rating);const lvl=delta===0?0:Math.min(5,(old.mastery||0)+delta);const gap=delta===0?1:([1,2,3,7,14,30][lvl]||30);const d=new Date();d.setDate(d.getDate()+gap);await mutateWord({...old,mastery:lvl,next_review:localISO(d)});return;}const remove=e.target.closest('[data-word-remove]');if(remove){const id=remove.dataset.wordRemove;if(!confirm('确定删除这张迁移卡吗？'))return;const ok=await saveChange('removeWord',id);if(ok){state.words=state.words.filter(w=>w.id!==id);if(!isAuthed())localCommit();renderWords();renderHome();}return;}const row=e.target.closest('[data-plan-row]');if(row){selectedKey=row.dataset.planRow;navigate('daily');return;}});
 // Navigation is handled once by the delegated document click listener.
 $('#mobile-menu').addEventListener('click',()=>$('.sidebar').classList.toggle('open'));
 $('#daily-day').addEventListener('change',e=>{selectedKey=e.target.value;renderDaily();});for(const selector of ['#plan-week','#plan-status','#plan-query'])$('#'+selector.slice(1)).addEventListener(selector==='#plan-query'?'input':'change',()=>renderPlan());
 $('#review-week').addEventListener('change',e=>{selectedWeek=Number(e.target.value);renderReview();});
 $('#word-form').addEventListener('submit',async e=>{e.preventDefault();if(busy)return;const fd=new FormData(e.target);const term=String(fd.get('term')||'').trim();const meaning=String(fd.get('meaning')||'').trim();if(!term||!meaning)return;const w={id:crypto.randomUUID(),term:term.slice(0,100),meaning:meaning.slice(0,200),source:String(fd.get('source')),example:String(fd.get('example')||'').trim().slice(0,360),mastery:0,next_review:today()};await mutateWord(w);if(state.words.some(x=>x.id===w.id)){e.target.reset();notice('迁移卡已保存');}});
 $('#review-form').addEventListener('submit',async e=>{e.preventDefault();if(busy)return;const f=e.target,w=selectedWeek;const obj={week:w,summary:f.elements.summary.value.trim().slice(0,2000),weak_skill:f.elements.weak_skill.value||null};const keys=['vocabulary','grammar','listening','reading','speaking'];for(const k of keys)obj[k]=Math.round(validNumber(f.elements[k].value,1,5));const ok=await saveChange('review',obj);if(ok){state.reviews[w]=obj;if(!isAuthed())localCommit();renderReview();notice(`第 ${w} 周复盘保存成功，下一周训练将提示弱项`);}});
 $('#date-form').addEventListener('submit',async e=>{e.preventDefault();const date=$('#start-date').value;if(!dateValidStart(date)){notice('开始日期必须是真实的周一至周六日期；周日休息。',true);return;}if(!confirm('更改开始日期会重新排列全部学习日，但不会删除以往打卡。确定吗？'))return;const ok=await saveChange('start',date);if(ok){state.startDate=date;if(!isAuthed())localCommit();renderAll();notice('学习起始日期已更新');}});
 $('#config-form').addEventListener('submit',async e=>{
  e.preventDefault();if(signingIn||busy){notice('请等待当前请求完成后再切换项目。',true);return;}
  const url=$('#supabase-url').value.trim().replace(/\/+$/,''),key=$('#supabase-key').value.trim();
  if(!projectURLValid(url)){notice('请填写官方 Supabase 项目 URL（https://xxx.supabase.co）。',true);return;}
  if(!publicKeyValid(key)){notice('仅接受 sb_publishable_ 或 role 为 anon 的旧版 JWT；禁止 secret、service_role 及其他角色。',true);return;}
  subscription?.unsubscribe();subscription=null;sb=null;clientURL='';clientGeneration++;resetIdentity();
  $('#login-password').value='';
  localStorage.setItem(CLOUD_CONFIG_KEY,JSON.stringify({url,key}));await initCloudClient();
  notice('项目公开配置已保存。请使用邮箱和密码登录。');
 });
 $('#login-form').addEventListener('submit',passwordLogin);
 $('#login-email').addEventListener('input',()=>{$('#login-password').value='';if(signingIn)loginAttempt++;});
 renderLoginControls();
 $('#refresh-btn').addEventListener('click',async()=>{if(!sb||!user){notice('请先完成 Supabase 密码登录',true);return;}if(busy)return;await remoteLoad();});
 $('#logout-btn').addEventListener('click',async()=>{if(!sb)return;const client=sb;loginAttempt++;resetIdentity();$('#login-password').value='';const {error}=await client.auth.signOut();if(error)notice('退出登录请求失败，请检查网络。',true);});
 $('#account-btn').addEventListener('click',()=>navigate('settings'));
 $('#export-btn').addEventListener('click',()=>{const content=JSON.stringify({app:'momentum-english-v1',exported_at:new Date().toISOString(),mode:isAuthed()?'cloud':'demo',data:state},null,2);const blob=new Blob([content],{type:'application/json'});const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download='momentum-english-'+today()+'.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1000);notice('已导出 JSON 备份');});
 $('#import-file').addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;try{if(file.size>5_000_000)throw Error('文件大于 5 MB');const json=JSON.parse(await file.text());if(!confirm(`确认将备份导入${isAuthed()?'当前 Supabase 账号':'本机演示模式'}？同编号内容可能被覆盖，云端导入不是原子操作。`))return;await loadDataFromBackup(json);notice('备份已导入');}catch(err){notice('导入失败：'+err.message,true);}finally{e.target.value='';}});
}
function start(){initializeOptions();selectedKey=pickToday().key;selectedWeek=pickToday().week;$('#review-week').value=selectedWeek;renderResources();bind();renderAll();setMode();if(localLoadFailed)notice('本机旧数据读取失败，原值已保留；为避免覆盖，请先导入有效备份。',true);initCloudClient();}
start();
