module.exports=[950640,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"InvariantError",{enumerable:!0,get:function(){return d}});class d extends Error{constructor(a,b){super(`Invariant: ${a.endsWith(".")?a:a+"."} This is a bug in Next.js.`,b),this.name="InvariantError"}}},137936,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"registerServerReference",{enumerable:!0,get:function(){return d.registerServerReference}});let d=a.r(211857)},209603,a=>{"use strict";let b=new Map;a.s(["rateLimit",0,function(a,c,d){let e=Date.now(),f=b.get(a);if(!f||f.resetAt<=e)return b.set(a,{count:1,resetAt:e+d}),{allowed:!0,retryAfterSeconds:0};if(b.size>5e3)for(let[a,c]of b)c.resetAt<=e&&b.delete(a);return f.count>=c?{allowed:!1,retryAfterSeconds:Math.ceil((f.resetAt-e)/1e3)}:(f.count+=1,{allowed:!0,retryAfterSeconds:0})}])},713095,(a,b,c)=>{"use strict";function d(a){for(let b=0;b<a.length;b++){let c=a[b];if("function"!=typeof c)throw Object.defineProperty(Error(`A "use server" file can only export async functions, found ${typeof c}.
Read more: https://nextjs.org/docs/messages/invalid-use-server-value`),"__NEXT_ERROR_CODE",{value:"E352",enumerable:!1,configurable:!0})}}Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"ensureServerEntryExports",{enumerable:!0,get:function(){return d}})},793130,a=>a.a(async(b,c)=>{try{var d=a.i(137936),e=a.i(941766),f=a.i(905246),g=a.i(60820),h=a.i(209603),i=a.i(713095),j=b([e]);[e]=j.then?(await j)():j;let n=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function k(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}async function l(){let a=await (0,f.headers)(),b=a.get("x-forwarded-for");return b?b.split(",")[0].trim():a.get("x-real-ip")??"unknown"}async function m(a,b){if(String(b.get("company")??"").length>0)return{status:"success"};let c=await l(),{allowed:d}=(0,h.rateLimit)(`contact:${c}`,5,6e5);if(!d)return{status:"rateLimited"};let f=String(b.get("name")??"").trim(),i=String(b.get("email")??"").trim(),j=String(b.get("phone")??"").trim(),m=String(b.get("service")??"").trim(),o=String(b.get("message")??"").trim();if(!f||!o||!n.test(i))return{status:"error"};try{let a=await (0,g.getPayload)({config:e.default});await a.create({collection:"contact-submissions",data:{name:f.slice(0,200),email:i.slice(0,200),phone:j.slice(0,50)||void 0,service:m.slice(0,200)||void 0,message:o.slice(0,5e3)}});let b=process.env.CONTACT_NOTIFY_TO;if(b)try{var p;let c,d;await a.sendEmail({to:b,replyTo:`${f} <${i}>`,subject:`New website inquiry from ${f.slice(0,80)}`,text:[`Name: ${f}`,`Email: ${i}`,j?`Phone: ${j}`:null,m?`Service: ${m}`:null,"","Message:",o].filter(a=>null!==a).join("\n"),html:(p={name:f,email:i,phone:j,service:m,message:o},c=new Date().toLocaleString("en-US",{dateStyle:"long",timeStyle:"short"}),d=(a,b)=>`
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e3e9f2;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:110px;vertical-align:top;">${a}</td>
      <td style="padding:10px 0;border-bottom:1px solid #e3e9f2;color:#0a1120;font-size:15px;font-weight:600;">${b}</td>
    </tr>`,`<!doctype html>
<html><body style="margin:0;padding:0;background:#eef2f7;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f7;">
    <tr><td align="center" style="padding:28px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:2px;overflow:hidden;box-shadow:0 2px 8px rgba(10,17,32,0.08);">
        <tr><td style="background:#0a1120;padding:26px 32px;text-align:center;">
          <img src="https://natanemengineering.com/logo-full-white.png" alt="Natanem Engineering" height="40" style="height:40px;width:auto;display:inline-block;" />
        </td></tr>
        <tr><td style="height:4px;background:#f5a623;font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr><td style="padding:32px;">
          <p style="margin:0 0 6px;color:#d98b0f;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:3px;">New Website Inquiry</p>
          <h1 style="margin:0 0 24px;color:#0a1120;font-size:24px;font-weight:bold;">${k(p.name)}</h1>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${d("Email",`<a href="mailto:${k(p.email)}" style="color:#d98b0f;text-decoration:none;">${k(p.email)}</a>`)}
            ${p.phone?d("Phone",`<a href="tel:${k(p.phone.replace(/\s+/g,""))}" style="color:#0a1120;text-decoration:none;">${k(p.phone)}</a>`):""}
            ${p.service?d("Service",k(p.service)):""}
          </table>
          <div style="margin-top:24px;padding:18px 22px;background:#f3f6fa;border-left:4px solid #f5a623;">
            <p style="margin:0 0 8px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Message</p>
            <p style="margin:0;color:#1a2740;font-size:15px;line-height:1.6;white-space:pre-wrap;">${k(p.message)}</p>
          </div>
        </td></tr>
        <tr><td style="background:#f3f6fa;padding:16px 32px;text-align:center;color:#8a94a6;font-size:12px;border-top:1px solid #e3e9f2;">
          Sent from the natanemengineering.com contact form \xb7 ${c}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`)})}catch(a){console.error("Contact notification email failed:",a)}return{status:"success"}}catch(a){return console.error("Contact form submission failed:",a),{status:"error"}}}(0,i.ensureServerEntryExports)([m]),(0,d.registerServerReference)(m,"60b8edbd8b736d4e364b4d861dd901dc3f64e6de61",null),a.s(["submitInquiry",0,m]),c()}catch(a){c(a)}},!1),533147,a=>a.a(async(b,c)=>{try{var d=a.i(793130),e=b([d]);[d]=e.then?(await e)():e,a.s([]),c()}catch(a){c(a)}},!1),210318,a=>a.a(async(b,c)=>{try{var d=a.i(533147),e=a.i(793130),f=b([d,e]);[d,e]=f.then?(await f)():f,a.s(["60b8edbd8b736d4e364b4d861dd901dc3f64e6de61",()=>e.submitInquiry]),c()}catch(a){c(a)}},!1)];

//# sourceMappingURL=_1gcseam._.js.map