// English Coach · 26-week curriculum, freshly planned from verified tool capabilities.
// Pure, deterministic data generation: safe to import in Node tests and static Pages.
export const LINKS = Object.freeze({
  nce: 'https://www.ncego.com/books/nce1',
  nceWords: 'https://www.ncego.com/books/words/nce1',
  typewords: 'https://typewords.cc/',
  re: 'https://relingo.net/zh/browser',
  app: 'https://docs.pollykann.com/guard/',
  appYoutube: 'https://docs.pollykann.com/guard/add-youtube',
  voa: 'https://learningenglish.voanews.com/p/5644.html',
  readingA1: 'https://learnenglish.britishcouncil.org/free-resources/reading/a1',
  readingA2: 'https://learnenglish.britishcouncil.org/free-resources/reading/a2',
  emails: 'https://learnenglish.britishcouncil.org/free-resources/business/english-emails',
  sf: 'https://developer.salesforce.com/docs',
  chat: 'https://chatgpt.com/'
});

const DATA = [
  ['认识自己','be 动词、主谓一致','30 秒自我介绍'],
  ['生活与工作','一般现在时、频率副词','讲自己的工作日'],
  ['提问与回答','一般疑问句、特殊疑问句','问答 5 个个人问题'],
  ['时间与计划','时间、日期、介词 at/in/on','介绍每日学习安排'],
  ['地点与方向','there is/are、地点介词','介绍办公环境'],
  ['人物与关系','形容词、所有格','介绍团队成员'],
  ['能力与请求','can/could、礼貌请求','提出请求并确认'],
  ['数量与习惯','可数/不可数、some/any','讲工作习惯'],
  ['过去的一天','一般过去时规则变化','复述昨天的工作'],
  ['过去的项目','常见不规则过去式','讲一次技术问题'],
  ['现在进行时','be doing 与一般现在时区别','描述当前工作'],
  ['将来计划','going to / will','讲下周目标'],
  ['比较与选择','比较级、最高级','比较两种方案'],
  ['描述问题','原因 because / 结果 so','清楚描述一个 bug'],
  ['给出建议','should / need to','建议同事如何处理问题'],
  ['持续的经历','现在完成时与 for/since','说出五年工作经验'],
  ['职场邮件入门','邮件开头、结尾与语气','写 60 词工作邮件'],
  ['会议表达','澄清、复述和确认','主持简短工作同步'],
  ['需求沟通','提问、确认范围','问清 3 个需求'],
  ['解释方案','步骤与顺序词','解释简单方案'],
  ['Salesforce 对象','对象、字段、记录','介绍数据模型'],
  ['Salesforce 自动化','Flow、审批、条件','介绍一个自动化需求'],
  ['Salesforce 集成','API、同步、失败重试','解释一次数据同步'],
  ['Salesforce 部署','环境、测试、部署','讲清部署步骤'],
  ['外企英语面试 I','过去经历、STAR 简化结构','完成自我介绍和项目亮点'],
  ['外企英语面试 II','提问、解决问题、复盘','模拟 5 分钟技术面试']
];
const VOA = [
 'Welcome!','Hello, I’m Anna!','I’m Here!','What Is It?','Where Are You?',
 'Where Is the Gym?','What Are You Doing?','Are You Busy?','Is It Cold?',
 'Come Over to My Place','This Is My Neighborhood','Meet My Family',
 'Happy Birthday, William Shakespeare!','How About This?','I Love People-Watching!',
 'Where Are You From?','Are You Free on Friday?','She Always Does That',
 'When Do I Start?','What Can You Do?','Can You Come to the Party?',
 'Next Summer...','What Do You Want?','Yesterday Was Amazing!',
 'Watch Out!','This Game Is Fun!'
];
export const WEEKS = DATA.map((v, i) => {
  const number = i + 1;
  const start = number <= 16 ? (number - 1) * 2 + 1 : 33 + (number - 17);
  const lessons = number <= 16 ? [start, start + 1] : [start];
  return { number, topic: v[0], grammar: v[1], output: v[2], voa: VOA[i], lessons,
    phase: number <= 4 ? 'A1 基础' : number <= 8 ? 'A1 巩固' : number <= 12 ? 'A2 起步' : number <= 16 ? 'A2 表达' : number <= 20 ? '职场英语' : number <= 24 ? 'Salesforce 英语' : '求职实战' };
});
export const DEFAULT_START = '2026-10-13';
export const DAY_NAMES = ['周一','周二','周三','周四','周五','周六'];
const DAY_ACTION = ['新知识输入','听辨与纠音','阅读与新课','真实场景迁移','独立迁移练习','综合复习与测评'];
const DAY_TEMPLATES = WEEKS.flatMap(w => DAY_NAMES.map((name,i) => ({
  key:`w${w.number}-d${i+1}`, week:w.number, day:i+1, dayName:name, weekData:w,
  focus:DAY_ACTION[i]
})));

function task(key, resource, minutes, title, instruction, done, url, category) {
 return { key, resource, minutes, title, instruction, done, url, category };
}
export function getTasks(day, weakSkill = '') {
  const w = day.weekData, n=day.day, lid = w.lessons[n===3 && !day.firstSession ? w.lessons.length-1:0];
  const className = `第一册第 ${lid} 单元`;
  const base = `本周主题「${w.topic}」，核心语法「${w.grammar}」`;
  const phase = w.number >= 21 ? '结合 Salesforce 工作情境' : w.number >= 17 ? '结合职场真实场景' : '结合熟悉的日常生活';
  let q = n===5 ? '从本周词汇选 8 个词，在 TypeWords 默写后各选 3 个用于新的真实场景句子；记录表达卡，不提前作周复盘。' :
    n===2 ? '先完成智能复习，再做 8 个词的听写；检查错误统计。' :
    n===4 ? '先完成到期复习，再从错词本抽 6–8 个词自测，不熟练的词继续复习。' :
    '先完成智能复习，再学 8 个新词；跟写后遮住答案默写。';
  let grammarTask = n===1 ? `在 ncego 打开${className}，学习课文和讲解；找出与「${w.grammar}」相关的句子，自己改写 2 句。` :
    n===2 ? `复习${className}，完成配套练习；不看原文，说出 3 个关键句。` :
    n===3 ? `学习${className}${w.lessons.length===1?'（本周唯一新课，重点复习）':''}；总结一句语法规则，并造 2 个新句。` :
    n===4 ? `复习本周 ncego 单元 ${w.lessons.join('、')}；结合「${w.grammar}」，把 3 个课文句型迁移到${w.number>=17?'工作':'日常'}场景。` :
    `用本周 3 个句型描述一个新的日常或工作场景，独立写 5 句；对照 ncego 检查并记录迁移错误。`;
  let listenTask = n===1 ? `用小鹦看看打开本周 VOA《${w.voa}》（按官方教程导入）；只听 1–3 分钟片段，先不开字幕，写下听懂的关键词。` :
    n===2 ? `同一片段：单句循环 + 变速，听辨 3 句；开英文字幕核对后逐句跟读。` :
    n===3 ? `选 3 句进行「听一句→暂停→复述/听写→核对」，记录最难的 1 个音。` :
    n===4 ? `用小鹦看看进行「句间暂停」跟读，录/说 30 秒影子跟读；收藏 1 句好用的表达。` :
    `不看字幕听本周 VOA 片段，用自己的话说 2 句内容，再把其中 1 个表达迁移到自己的生活。`;
  let readTask = n===1 ? `用 Relingo 打开一篇${w.number<=10?' A1':' A2'}短文，先看英文，找出主题句，再只查最影响理解的生词。` :
    n===2 ? `重读短文，利用划词翻译确认 3 个生词；尝试不看中文解释中心意思。` :
    n===3 ? `换一篇同级短文，先回答「谁/做什么/为什么」，再在 Relingo 收藏最多 2 个高价值表达。` :
    n===4 ? `读一篇${w.number>=17?'简单职场邮件/技术入门资料':'短文'}；记下 1 个主题句与 2 个支持细节。` :
    `使用 Relingo 读一篇同级新短文，用 1 句英文复述，再用 1 个本周表达改写成自己的句子。`;
  let speakingTask = n===1 ? `跟 ChatGPT 用英文围绕「${w.topic}」完成 4 轮对话；要求先回答，再纠正 1–2 个错误。` :
    n===2 ? `不看答案，用英语说出 3 个包含「${w.grammar}」的句子；再请 ChatGPT 改变场景提问。` :
    n===3 ? `用 2–3 句英文总结今天读到的文章，不允许照抄；不会时先说关键词再扩句。` :
    n===4 ? `${phase}，用 ChatGPT 模拟一段对话；必须完成「${w.output}」，并回答一次追问。` :
    `用英语完成「${w.output}」；请 ChatGPT 进行换题迁移检测，记录独立迁移时最难的问题，留给周六复测。`;
  if (n===4 && weakSkill) speakingTask += ` 上周最低评分项目为「${weakSkill}」，本次优先针对它加 1 个迁移问题。`;
  if (n===6) {
    q = '周六综合复测：在 TypeWords 从本周错词本抽 10 个词闭卷听写；核对后重测错词，再用其中 3 个词说新句，记录首次正确数 /10。';
    grammarTask = `周六综合复测：不看笔记回忆 ncego 单元 ${w.lessons.join('、')} 的「${w.grammar}」，限时写 5 个新情境句；对照讲解订正，记录独立正确数 /5，再重写错句。`;
    listenTask = `周六综合复测：用小鹦看看关字幕重听本周 VOA《${w.voa}》片段，写 3 个信息点并听写 2 句；开字幕核对，单句循环订正，记录正确信息点 /3 和听辨难点。`;
    readTask = '周六综合复测：用 Relingo 重读本周短文，先不查词，写主旨及 2 个细节；核对后记录正确信息点 /3，并用 1 个表达造新句。';
    speakingTask = `周六综合复测：在 ChatGPT 先独立完成「${w.output}」，再接受 2 个新场景追问；只在回答后看纠错并重答，记录能独立回答的问题数 /3。最后到本站「周六复盘」填写五项评分、证据和下周薄弱项；评分由自己判断。`;
  }
  if (day.firstSession) {
    if (n===6) {
      // Preparation stays inside each assessment's existing time budget.
      q = '在本项 15 分钟内先选 10 个入门词，听音、跟写后建立词表；将它作为本周词汇/错词本，再做闭卷检测，无需此前训练。' + q;
      grammarTask = `在本项 25 分钟内先打开 ncego 第一册第 ${w.lessons[0]} 单元，浏览本周单元 ${w.lessons.join('、')} 的课文和讲解、认识「${w.grammar}」后合上材料；无需此前训练。` + grammarTask;
      listenTask = `在本项 20 分钟内先按教程导入 VOA《${w.voa}》，初听 1–3 分钟片段并确认字幕，再关字幕检测；无需此前训练。` + listenTask;
      readTask = '在本项 10 分钟内先用 Relingo 打开一篇 A1 短文，初读并确认主旨和生词，再遮住解释检测；无需此前训练。' + readTask;
      speakingTask = `在本项 20 分钟内先认识「${w.topic}」主题与「${w.output}」要求，准备关键词后收起提示；无需此前训练。` + speakingTask;
    } else {
      q = '首次训练：在 TypeWords 选择 8 个入门新词，听音、跟写后建立初始词表；遮住答案默写，记录错词，供以后复习。';
      grammarTask = `首次训练：在 ncego 打开${className}，先学习课文和讲解，认识「${w.grammar}」；自己改写 2 句，建立后续练习基础。`;
      listenTask = `首次训练：按小鹦看看教程导入本周 VOA《${w.voa}》，初听 1–3 分钟片段，记关键词；再用英文字幕核对并逐句跟读。`;
      readTask = '首次训练：用 Relingo 打开一篇 A1 短文，先读英文找主题句，再查最影响理解的生词；保留该短文供后续练习。';
      speakingTask = `首次训练：围绕「${w.topic}」用今天学到的词句与 ChatGPT 完成 4 轮对话；先独立回答，再看纠错，尝试完成「${w.output}」。`;
    }
  }
  const readUrl = w.number >= 17 && n===4 ? (w.number>=21? LINKS.sf:LINKS.emails) : (w.number<=10?LINKS.readingA1:LINKS.readingA2);
  return [
    task('voc', 'TypeWords',15,'词汇 · 默写与复习',q,day.firstSession?'建立初始词表，并记录首次默写结果。':'完成当日旧词复习，并记录自测结果。',LINKS.typewords,'词汇'),
    task('grammar','ncego',25,'主课 · 新概念 + 语法',grammarTask,`能不看提示说出至少 2 个新句子（${base}）。`,LINKS.nce,'语法'),
    task('listening','小鹦看看 + VOA',20,'听力 · 单句循环与跟读',listenTask,'留下 1 个听不懂的音或 1 个能独立说出的句子。',LINKS.appYoutube,'听力'),
    task('reading','Relingo',10,'阅读 · 主旨与表达',readTask,'能用中文概括主旨，再尝试用 1 句英文概括。',readUrl,'阅读'),
    task('speaking','ChatGPT',20,'输出 · 情景沟通与复述',speakingTask,'先独立回答，才查看纠错；记录最关键的错误。',LINKS.chat,'口语')
  ].map(t=>({...t, done:n===6 ? ({voc:'记录首次听写正确数 /10、错词重测结果及 3 个新句。',grammar:'记录首次独立正确数 /5、错误原因及重写句。',listening:'记录正确信息点 /3、2 句听写核对和 1 个难点。',reading:'记录正确信息点 /3 和 1 个独立新句。',speaking:'记录独立回答数 /3，完成本站五项周复盘评分和薄弱项。'}[t.key]) : t.done, id:`${day.key}:${t.key}`, extraUrl:t.key==='listening'?LINKS.voa:t.key==='grammar'?LINKS.nceWords:null, extraLabel:t.key==='listening'?'VOA 官方课程':t.key==='grammar'?'新概念单词表':''}));
}
export function mondayOnOrAfter(date=new Date()) {
 const d=new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
 d.setDate(d.getDate() + ((8-d.getDay())%7));
 return localISO(d);
}
export function localISO(d) {
 const p=n=>String(n).padStart(2,'0');return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}`;
}
// Parse at local noon, then compare every component: Date must not normalize invalid input.
export function realDate(s) {
 if (typeof s!=='string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
 const [y,m,d]=s.split('-').map(Number);
 if (y<1000) return null;
 const date=new Date(y,m-1,d,12);
 return date.getFullYear()===y && date.getMonth()+1===m && date.getDate()===d ? date : null;
}
export function dateValidStart(s) {
 const d=realDate(s);return !!d && d.getDay()!==0;
}
export function weekAnchor(startDate) {
 if (!dateValidStart(startDate)) throw Error('开始日期须为真实的周一至周六日期，周日休息。');
 const d=realDate(startDate);d.setDate(d.getDate()-(d.getDay()-1));return localISO(d);
}
export function dayDate(startDate, week, day) {
 if (!Number.isInteger(week)||week<1||week>26||!Number.isInteger(day)||day<1||day>6) throw Error('无效的课程周次或星期');
 const d=realDate(weekAnchor(startDate));
 d.setDate(d.getDate()+(week-1)*7+(day-1));return localISO(d);
}
export function calendarDays(startDate=DEFAULT_START) {
 weekAnchor(startDate);
 return DAY_TEMPLATES.map(d=>({...d,date:dayDate(startDate,d.week,d.day)})).filter(d=>d.date>=startDate)
  .map((d,index)=>({...d,firstSession:index===0}));
}
// Default active calendar. Dynamic callers must use calendarDays(their chosen start).
export const ALL_DAYS = calendarDays();
export function dateValidMonday(s) {const d=realDate(s);return !!d && d.getDay()===1;}
