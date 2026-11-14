import{c as s}from"./index-Cvdblxlq.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}]],h=s("panel-left",i);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],F=s("settings",o),n=[{bone:"femur",start:0,end:44,highlight:[0,3,8,16,22,28,36,41,44],point:"#0000FF",line:"#00B4FF"},{bone:"tibia",start:45,end:95,highlight:[45,48,52,57,60,63,65,67,70,73,78,82,85],point:"#FF7800",line:"#FFC800"},{bone:"fibula",start:96,end:119,highlight:[96,99,102,108,113,116,119],point:"#FF00B4",line:"#FF78DC"},{bone:"patella",start:120,end:128,highlight:[120,124,128],point:"#1D8A7C",line:"#27BAA6"}],d={fill:"#00FF00",stroke:"#0F172A"},f="#FFFFFF",g=new Set(n.flatMap(t=>t.highlight)),p=t=>n.findIndex(e=>t>=e.start&&t<=e.end),c=new Set(["85-86","90-91"]),r=[[57,90],[73,95]],A=[...n.flatMap(t=>Array.from({length:t.end-t.start},(e,a)=>[t.start+a,t.start+a+1])).filter(([t,e])=>!c.has(`${t}-${e}`)),...r],S={green:[0,255,96],red:[255,48,64],blue:[0,160,255],yellow:[255,240,0]};export{g as H,A as L,S as O,h as P,F as S,n as a,d as b,f as c,p as g};
