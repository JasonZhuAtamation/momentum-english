// Native selects remain the single source of values and FormData.
const controls = new Map();
let opened = null;
let sequence = 0;
let paused = false;
export function setSearchableSelectsBusy(value) { paused = value; syncSearchableSelects(); }
const normalize = text => String(text).normalize('NFKC').toLowerCase()
 .replace(/第\s*0*(\d+)\s*周/g, ' week$1 ')
 .replace(/(?:week|w)\s*0*(\d+)/g, 'week$1')
 .replace(/(\d{4})[年/.-](\d{1,2})[月/.-](\d{1,2})日?/g, (_, y, m, d) => `${y}${m.padStart(2,'0')}${d.padStart(2,'0')}`)
 .replace(/(\d{1,2})[月/.-](\d{1,2})日?/g, (_,m,d) => `${m.padStart(2,'0')}${d.padStart(2,'0')}`)
 .replace(/[\s·—_-]+/g, '');
const unavailable = option => option.disabled || option.parentElement?.disabled;

export function closeSearchableSelects() { opened?.close(); }
export function syncSearchableSelects(root = document) {
 for (const [select, control] of controls) {
  if (!select.isConnected) { control.destroy(); controls.delete(select); continue; }
  if (root === document || root === select || root.contains(select)) control.sync();
 }
}
export function enhanceSearchableSelects(root = document) {
 // A failed/unsupported enhancement leaves the native keyboard and AT fallback intact.
 if (typeof MutationObserver === 'undefined') return;
 for (const select of root.querySelectorAll('select')) {
  if (controls.has(select)) continue;
  const control = createControl(select);
  controls.set(select, control);
 }
}
function createControl(select) {
 const key = `study-select-${++sequence}`;
 const label = [...(select.labels || [])][0] || select.closest('label');
 const labelText = label ? [...label.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join('').trim() : '';
 const name = select.getAttribute('aria-label') || labelText || select.name || '选择选项';
 const trigger = document.createElement('button');
 trigger.type = 'button'; trigger.id = key; trigger.className = 'select-trigger';
 trigger.dataset.selectFor = select.id || select.name;
 trigger.setAttribute('aria-haspopup', 'listbox'); trigger.setAttribute('aria-expanded', 'false');
 const value = document.createElement('span'); value.className = 'select-value';
 const chevron = document.createElementNS('http://www.w3.org/2000/svg','svg');
 chevron.setAttribute('viewBox','0 0 24 24'); chevron.setAttribute('aria-hidden','true');
 chevron.innerHTML = '<path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>';
 trigger.append(value, chevron);
 const panel = document.createElement('div'); panel.className = 'select-panel'; panel.hidden = true;
 const search = document.createElement('input'); search.type = 'search'; search.className = 'select-search';
 search.placeholder = select.id === 'daily-day' ? '搜索日期、周次或主题' : `搜索${name}`; search.autocomplete = 'off';
 search.setAttribute('role', 'combobox'); search.setAttribute('aria-autocomplete', 'list');
 search.setAttribute('aria-label', `搜索${name}`); search.setAttribute('aria-expanded', 'false');
 const list = document.createElement('div'); list.id = `${key}-list`; list.className = 'select-options';
 list.setAttribute('role','listbox'); list.setAttribute('aria-label',name);
 search.setAttribute('aria-controls',list.id); trigger.setAttribute('aria-controls',list.id);
 const note = document.createElement('p'); note.className = 'select-help'; note.setAttribute('role','status');
 panel.append(search,list,note);
 let matches = [], active = -1;
 let closed = true;
 function setActive(index) {
  active = index;
  for (const [i,row] of [...list.children].entries()) row.classList.toggle('is-active', i === active);
  const row = list.children[active];
  if (row) { search.setAttribute('aria-activedescendant',row.id); const top = row.offsetTop - list.offsetTop;
   if (top < list.scrollTop) list.scrollTop = top;
   else if (top + row.offsetHeight > list.scrollTop + list.clientHeight) list.scrollTop = top + row.offsetHeight - list.clientHeight; }
  else search.removeAttribute('aria-activedescendant');
 }
 function rows() {
  const terms = search.value.trim().split(/\s+/).map(normalize).filter(Boolean);
  matches = [...select.options].filter(o => !o.hidden && terms.every(t => /^week\d+$/.test(t) ? new RegExp(`${t}(?!\\d)`).test(normalize(o.label)) : normalize(o.label).includes(t)));
  list.replaceChildren(...matches.map((o,i) => {
   const row = document.createElement('div'); row.id = `${key}-option-${i}`; row.className = 'select-option';
   row.setAttribute('role','option'); row.setAttribute('aria-label',o.label);
   row.setAttribute('aria-selected',String(o.selected)); row.setAttribute('aria-disabled',String(!!unavailable(o)));
   const text = document.createElement('span'); text.className = 'select-option-copy';
   const parts = o.label.split(/\s+[—·]\s+/);
   const main = document.createElement('span'); main.textContent = parts[0]; text.append(main);
   if (parts.length > 1) { const detail = document.createElement('small'); detail.textContent = parts.slice(1).join(' · '); text.append(detail); }
   const check = document.createElement('span'); check.className = 'select-check'; check.textContent = o.selected ? '✓' : ''; check.setAttribute('aria-hidden','true');
   row.append(text,check);
   row.addEventListener('pointerdown',e => e.preventDefault());
   row.addEventListener('click',() => choose(i));
   return row;
  }));
  note.textContent = matches.length ? `${matches.length} 个选项 · ↑↓ 浏览，Enter 确认` : '没有匹配项，试试日期、周次或主题中的几个字。';
  const selected = matches.findIndex(o => o.selected && !unavailable(o));
  setActive(selected >= 0 ? selected : matches.findIndex(o => !unavailable(o)));
 }
 function position() {
  if (closed) return;
  if (!trigger.getClientRects().length) { close(); return; }
  const rect = trigger.getBoundingClientRect();
  const viewport = window.visualViewport;
  const leftEdge = (viewport?.offsetLeft || 0) + 12, topEdge = (viewport?.offsetTop || 0) + 12;
  const width = viewport?.width || innerWidth, height = viewport?.height || innerHeight;
  const rightEdge = leftEdge + width - 24, bottomEdge = topEdge + height - 24;
  if (rect.bottom < topEdge || rect.top > bottomEdge) { close(); return; }
  panel.style.width = `${Math.min(Math.max(rect.width,320),640,width - 24)}px`;
  const below = bottomEdge - rect.bottom - 8, above = rect.top - topEdge - 8;
  const flip = below < 280 && above > below;
  const available = Math.max(44,flip ? above : below);
  panel.style.maxHeight = `${Math.min(388,available)}px`;
  const box = panel.getBoundingClientRect();
  panel.style.left = `${Math.max(leftEdge,Math.min(rect.left,rightEdge-box.width))}px`;
  panel.style.top = `${Math.max(topEdge,Math.min(flip ? rect.top-box.height-8 : rect.bottom+8,bottomEdge-box.height))}px`;
 }
 function close(restore = false) {
  if (closed) return;
  closed = true; panel.hidden = true;
  trigger.setAttribute('aria-expanded','false'); search.setAttribute('aria-expanded','false'); search.removeAttribute('aria-activedescendant');
  if (opened === api) opened = null;
  if (restore && !trigger.disabled && trigger.isConnected) trigger.focus({preventScroll:true});
 }
 function open() {
  if (select.disabled || paused || trigger.disabled) return;
  closeSearchableSelects(); closed = false; opened = api;
  panel.hidden = false; search.value = ''; rows();
  trigger.setAttribute('aria-expanded','true'); search.setAttribute('aria-expanded','true');
  position(); search.focus({preventScroll:true});
 }
 function choose(index) {
  const option = matches[index];
  if (!option || unavailable(option) || select.disabled || paused || trigger.disabled) return;
  const changed = select.value !== option.value;
  select.value = option.value; close(true); sync();
  if (changed) select.dispatchEvent(new Event('change',{bubbles:true}));
 }
 function move(key) {
  const enabled = matches.map((o,i) => unavailable(o) ? -1 : i).filter(i => i >= 0);
  if (!enabled.length) return setActive(-1);
  const current = enabled.indexOf(active);
  const index = key === 'Home' ? 0 : key === 'End' ? enabled.length-1 : Math.max(0,Math.min(enabled.length-1,current + (key === 'ArrowDown' ? 1 : -1)));
  setActive(enabled[index]);
 }
 function sync() {
  value.textContent = select.selectedOptions[0]?.label || '请选择';
  trigger.setAttribute('aria-label',`${name}：${value.textContent}`);
  trigger.disabled = paused || select.disabled || !!select.closest('fieldset[disabled]');
  if (trigger.disabled) close();
  if (!closed) { rows(); position(); }
 }
 search.addEventListener('input',() => { rows(); position(); });
 search.addEventListener('keydown',e => {
  if (['ArrowDown','ArrowUp','Home','End'].includes(e.key)) { e.preventDefault(); move(e.key); }
  if (e.key === 'Enter') { e.preventDefault(); choose(active); }
  if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(true); }
  if (e.key === 'Tab') {
   // Resume native document tab order at the trigger, never trap focus in the portal.
   trigger.focus({preventScroll:true}); close();
  }
 });
 trigger.addEventListener('click',() => closed ? open() : close(true));
 trigger.addEventListener('keydown',e => { if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); open(); } });
 const labelClick = e => { if (e.target === label || e.target === select) { e.preventDefault(); trigger.focus(); } };
 label?.addEventListener('click',labelClick);
 const outside = e => { if (!closed && !panel.contains(e.target) && !trigger.contains(e.target)) close(); };
 const focusOutside = e => { if (!closed && !panel.contains(e.target) && e.target !== trigger) close(); };
 const reposition = e => { if (!panel.contains(e.target)) position(); };
 document.addEventListener('pointerdown',outside);
 document.addEventListener('focusin',focusOutside);
 window.addEventListener('scroll',reposition,true); window.addEventListener('resize',position);
 window.visualViewport?.addEventListener('resize',position); window.visualViewport?.addEventListener('scroll',position);
 select.addEventListener('change',sync);
 const reset = () => queueMicrotask(sync); select.form?.addEventListener('reset',reset);
 const observer = new MutationObserver(sync);
 observer.observe(select,{childList:true,subtree:true,characterData:true,attributes:true});
 const api = {sync,close,destroy(){close();observer.disconnect();trigger.remove();panel.remove();label?.removeEventListener('click',labelClick);document.removeEventListener('pointerdown',outside);document.removeEventListener('focusin',focusOutside);window.removeEventListener('scroll',reposition,true);window.removeEventListener('resize',position);window.visualViewport?.removeEventListener('resize',position);window.visualViewport?.removeEventListener('scroll',position);select.removeEventListener('change',sync);select.form?.removeEventListener('reset',reset);}};
 select.after(trigger); document.body.append(panel); sync();
 // Hide only after the complete component is attached and initialized.
 select.classList.add('select-native-enhanced'); select.tabIndex = -1; select.setAttribute('aria-hidden','true');
 return api;
}
