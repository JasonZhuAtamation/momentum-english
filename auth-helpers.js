// Public frontend config only; role decoding is validation, never signature verification.
export function publicKeyValid(key) {
 if (typeof key!=='string' || key.length>4096 || /sb_secret_|service_role/i.test(key)) return false;
 if (/^sb_publishable_[A-Za-z0-9_-]{16,}$/.test(key)) return true;
 const parts=key.split('.');
 if (parts.length!==3 || parts.some(p=>!p || !/^[A-Za-z0-9_-]+$/.test(p))) return false;
 try {
  const payload=parts[1].replace(/-/g,'+').replace(/_/g,'/');
  const decoded=JSON.parse(atob(payload.padEnd(Math.ceil(payload.length/4)*4,'=')));
  return decoded && !Array.isArray(decoded) && decoded.role==='anon';
 } catch {return false;}
}
export function projectURLValid(url) {return /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url);}
export function authErrorMessage(error) {
 if (Number(error?.status)===429 || /rate|over_.*limit|too_many/i.test(error?.code||''))
  return '请求受限：请等候服务端允许后再试。';
 // Do not display SDK raw errors that could contain request data or tokens.
 return '请求失败：请检查邮箱、密码、账号确认状态或网络。';
}
