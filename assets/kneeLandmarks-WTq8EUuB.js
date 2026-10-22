import{c as n}from"./index-9iDJw-5e.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],F=n("chevron-right",s);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],p=n("file-text",i);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}]],f=n("panel-left",h);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],g=n("settings",c),a=[{bone:"femur",start:0,end:44,highlight:[0,3,8,16,22,28,36,41,44],point:"#0000FF",line:"#00B4FF"},{bone:"tibia",start:45,end:95,highlight:[45,48,52,57,60,63,65,67,70,73,78,82,85],point:"#FF7800",line:"#FFC800"},{bone:"fibula",start:96,end:119,highlight:[96,99,102,108,113,116,119],point:"#FF00B4",line:"#FF78DC"},{bone:"patella",start:120,end:128,highlight:[120,124,128],point:"#1D8A7C",line:"#27BAA6"}],_={fill:"#00FF00",stroke:"#0F172A"},y="#FFFFFF",A=new Set(a.flatMap(t=>t.highlight)),H=t=>a.findIndex(e=>t>=e.start&&t<=e.end),r=new Set(["85-86","90-91"]),l=[[57,90],[73,95]],M=[...a.flatMap(t=>Array.from({length:t.end-t.start},(e,o)=>[t.start+o,t.start+o+1])).filter(([t,e])=>!r.has(`${t}-${e}`)),...l],S={green:[0,255,96],red:[255,48,64],blue:[0,160,255],yellow:[255,240,0]};export{F as C,p as F,A as H,M as L,S as O,f as P,g as S,a,_ as b,y as c,H as g};
