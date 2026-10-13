// Presentation derives from curriculum dates; it never stores a second schedule.
const iso = date => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
const parse = value => new Date(`${value}T12:00:00`);
export function shiftMonth(month, amount) {
 const date = parse(`${month}-01`);
 date.setMonth(date.getMonth()+amount);
 return iso(date).slice(0,7);
}
export function monthCells(days, month, now, count) {
 const first = parse(`${month}-01`), offset = (first.getDay()+6)%7;
 const last = new Date(first.getFullYear(),first.getMonth()+1,0,12).getDate();
 const byDate = new Map(days.map(day=>[day.date,day]));
 const start = days[0]?.date, end = days.at(-1)?.date;
 return Array.from({length:Math.ceil((offset+last)/7)*7},(_,index)=>{
  const number = index-offset+1;
  if(number<1||number>last)return {blank:true};
  const date = `${month}-${String(number).padStart(2,'0')}`, day = byDate.get(date);
  const rest = !day && date>=start && date<=end && parse(date).getDay()===0;
  const completed = day ? count(day) : 0;
  const status = !day ? (rest?'rest':'inactive') : completed===5?'complete':completed>0?'partial':date<now?'missed':date===now?'today':'scheduled';
  return {date,number,day,completed,status,today:date===now};
 });
}
export function learningSummary(days, now, count, reviews) {
 const elapsed = days.filter(day=>day.date<=now);
 const completed = elapsed.filter(day=>count(day)===5).length;
 // Today's unfinished session is still available. Past scheduled gaps break a streak.
 const streakDays = elapsed.at(-1)?.date===now && count(elapsed.at(-1))<5 ? elapsed.slice(0,-1) : elapsed;
 let streak=0;
 for(let i=streakDays.length-1;i>=0&&count(streakDays[i])===5;i--)streak++;
 const firstReview = Object.values(reviews).some(review=>Number.isInteger(Number(review.week))&&Number(review.week)>=1&&Number(review.week)<=26);
 return {completed,streak,badges:[
  {id:'first-day',name:'第一步',detail:'完整完成 1 个学习日',unlocked:completed>=1,progress:`${Math.min(completed,1)}/1 日`,icon:'✦'},
  {id:'six-days',name:'渐入佳境',detail:'累计完成 6 个学习日',unlocked:completed>=6,progress:`${Math.min(completed,6)}/6 日`,icon:'✿'},
  {id:'24-days',name:'坚持有迹',detail:'累计完成 24 个学习日',unlocked:completed>=24,progress:`${Math.min(completed,24)}/24 日`,icon:'⚑'},
  {id:'first-review',name:'回望与前行',detail:'保存首次复盘',unlocked:firstReview,progress:firstReview?'1/1 次':'0/1 次',icon:'↺'}
 ]};
}
export function weekSummary(days, week, count, currentWeek) {
 const sessions=days.filter(day=>day.week===week);
 const completed=sessions.filter(day=>count(day)===5).length;
 return {sessions,completed,total:sessions.length,status:completed===sessions.length?'complete':week===currentWeek?'current':'unfinished'};
}
