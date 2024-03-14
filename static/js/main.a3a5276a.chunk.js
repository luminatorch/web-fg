(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{114:function(e,a,t){e.exports=t(125)},125:function(e,a,t){"use strict";t.r(a);var r=t(0),n=t.n(r),c=t(84),l=t.n(c),o=t(89),s=t(180),i=t(176),m=t(35),u=t(7),d=t(188),E=t(177),p=t(182),g=t(183),b=t(170),h=t(187),f=t(179),j=t(186),S=t(192),v=t(195),k=t(193),y=t(194),O=t(175),C=t(30),w=t(17),x=t(85);const H=Object(x.a)({apiKey:"AIzaSyCITvJNpH0eYSft9CAk360UUXoCIOZnl5o",authDomain:"score-app-d9572.firebaseapp.com",projectId:"score-app-d9572",storageBucket:"score-app-d9572.appspot.com",messagingSenderId:"718093172886",appId:"1:718093172886:web:299b6a826045c5c0c402b7",measurementId:"G-G4WL1605FS"});var N=Object(w.i)(H);const I=async(e,a,t)=>{const r=Object(C.b)();try{const c=(await Object(C.a)(r,e,a)).user,l=await Object(w.a)(Object(w.d)(N,"users"),{uid:c.uid,name:t,email:e,scores:[]});return await Object(w.k)(Object(w.f)(N,"users",l.id),{document_id:l.id},{merge:!0}),{success:!0,userId:c.uid,docId:l.id}}catch(n){return console.error("Error creating new user: ",n),{success:!1,error:n.message}}},A=async(e,a)=>{const t=Object(C.b)().currentUser;if(!t)return console.error("No authenticated user found. "),{success:!1,error:"No authenticated user. "};try{const n=await D(t.uid),c=await Object(w.a)(Object(w.d)(N,"scores"),{patientName:e.patientName,totalScore:a,score:{fibrillation:e.score.fibrillation,age:e.score.age,strokeScale:e.score.strokeScale,tHemorrhage:e.score.tHemorrhage,glucose:e.score.glucose,aspects:e.score.aspects,injury:e.score.injury,nasoenteral:e.score.nasoenteral},createdAt:new Date,userId:t.uid}),l=Object(w.f)(N,"users",n);return await Object(w.l)(l,{scores:Object(w.c)(c.id)}),{success:!0,scoreId:c.id}}catch(r){return console.error("Error adding new score: ",r),{success:!1,error:r.message}}},D=async e=>{const a=Object(w.j)(Object(w.d)(N,"users"),Object(w.m)("uid","==",e)),t=await Object(w.h)(a);if(t.empty)return console.log("No document found for the given UID."),null;return t.docs[0].id},T=async(e,a)=>{if(!Object(C.b)().currentUser)return console.error("No authenticated user found. "),{success:!1,error:"No authenticated user. "};const t=Object(w.f)(N,"scores",e);try{await Object(w.l)(t,a)}catch(r){console.error("Error updating score: ",r)}};class P{constructor(e,a,t,r,n){let{fibrillation:c,age:l,strokeScale:o,tHemorrhage:s,glucose:i,aspects:m,injury:u,nasoenteral:d}=t;this.documentId=e,this.patientName=a,this.score={fibrillation:c,age:l,strokeScale:o,tHemorrhage:s,glucose:i,aspects:m,injury:u,nasoenteral:d},this.createdAt=r,this.totalScore=n}updateOption(e,a){this.score.hasOwnProperty(e)?this.score[e]=a:this[e]=a}}var q=function(){const[e,a]=Object(r.useState)(new P(void 0,void 0,{fibrillation:!1,age:!1,strokeScale:!1,tHemorrhage:"none",glucose:!1,aspects:!1,injury:!1,nasoenteral:!1},void 0,void 0)),[t,c]=Object(r.useState)(!1),l=Object(u.o)(),o=(t,r)=>{const n=new P(e.documentId,e.patientName,{fibrillation:e.score.fibrillation,age:e.score.age,strokeScale:e.score.strokeScale,tHemorrhage:e.score.tHemorrhage,glucose:e.score.glucose,aspects:e.score.aspects,injury:e.score.injury,nasoenteral:e.score.nasoenteral},e.createdAt,e.totalScore);n.updateOption(t,r),a(n)},s=()=>{c(!1)},i=async a=>{a.preventDefault();const t=Object.keys(e.score).reduce((a,t)=>{const r=e.score[t];return"boolean"===typeof r&&r?"strokeScale"===t||"aspects"===t?a+2:a+1:a},0)+("petequial"===e.score.tHemorrhage?1:"hematoma"===e.score.tHemorrhage?2:0);try{await A(e,t),l("/success",{state:{patientName:e.patientName,totalScore:t}})}catch(r){console.error("Could not add the document: ",r)}};return n.a.createElement(d.a,{sx:{padding:3,maxWidth:600,margin:"auto"}},n.a.createElement("form",{onSubmit:i,sx:{display:"flex",flexDirection:"column",alignItems:"center"}},n.a.createElement(E.a,{label:"Nome do Paciente",value:e.patientName,onChange:e=>o("patientName",e.target.value),variant:"outlined",margin:"normal",fullWidth:!0}),n.a.createElement("div",null,n.a.createElement(p.a,{control:n.a.createElement(g.a,{checked:e.score.fibrillation,onChange:e=>o("fibrillation",e.target.checked),name:"fibrillation"}),label:"Flutter/Atrial fibrillation? (1 pt)"})),n.a.createElement("div",null,n.a.createElement(p.a,{control:n.a.createElement(g.a,{checked:e.score.age,onChange:e=>o("age",e.target.checked),name:"age"}),label:"Age >= 75? (1 pt)"})),n.a.createElement("div",null,n.a.createElement(p.a,{control:n.a.createElement(g.a,{checked:e.score.strokeScale,onChange:e=>o("strokeScale",e.target.checked),name:"strokeScale"}),label:"Stroke Scale NIHSS >= 12? (2 pts)"})),n.a.createElement(b.a,{component:"legend"},"Transformation Hemorrhage"),n.a.createElement(h.a,{name:"tHemorrhage",value:e.score.tHemorrhage,onChange:e=>o("tHemorrhage",e.target.value)},n.a.createElement(p.a,{value:"none",control:n.a.createElement(f.a,null),label:"None"}),n.a.createElement(p.a,{value:"petequial",control:n.a.createElement(f.a,null),label:"Petequial (1 pt)"}),n.a.createElement(p.a,{value:"hematoma",control:n.a.createElement(f.a,null),label:"Hematoma (2 pts)"})),n.a.createElement("div",null,n.a.createElement(p.a,{control:n.a.createElement(g.a,{checked:e.score.glucose,onChange:e=>o("glucose",e.target.checked),name:"glucose"}),label:"Glucose >= 140? (1 pt)"})),n.a.createElement("div",null,n.a.createElement(p.a,{control:n.a.createElement(g.a,{checked:e.score.aspects,onChange:e=>o("aspects",e.target.checked),name:"aspects"}),label:"ASPECTS  <= 7? (2 pts)"})),n.a.createElement("div",null,n.a.createElement(p.a,{control:n.a.createElement(g.a,{checked:e.score.injury,onChange:e=>o("injury",e.target.checked),name:"injury"}),label:"Injury (inj\xfaria renal)? (1 pt)"})),n.a.createElement("div",null,n.a.createElement(p.a,{control:n.a.createElement(g.a,{checked:e.score.nasoenteral,onChange:e=>o("nasoenteral",e.target.checked),name:"nasoenteral"}),label:"Nasoenteral sonda? (1 pt)"})),n.a.createElement(j.a,{sx:{marginTop:"20px",width:"100%"},variant:"contained",onClick:()=>{c(!0)}},"Submit"),n.a.createElement(S.a,{open:t,onClose:s,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},n.a.createElement(O.a,{id:"alert-dialog-title"},"Confirm Submission"),n.a.createElement(k.a,null,n.a.createElement(y.a,{id:"alert-dialog-description"},"Are you sure you want to submit the score?")),n.a.createElement(v.a,null,n.a.createElement(j.a,{onClick:s},"Cancel"),n.a.createElement(j.a,{onClick:i,autoFocus:!0},"Confirm")))),n.a.createElement(j.a,{sx:{marginTop:"10px",width:"100%"},variant:"outlined",onClick:()=>l(-1)},"Voltar"))};var W=function(){const e=Object(u.m)(),{patientName:a,totalScore:t}=e.state||{},r=Object(u.o)();return n.a.createElement(d.a,{sx:{display:"flex",flexDirection:"column",alignItems:"center"}},n.a.createElement("h1",null,"Score adicionado!"),n.a.createElement("p",null,"Nome do paciente: ",a),n.a.createElement("p",null,"Score total: ",t),n.a.createElement(j.a,{sx:{marginTop:"15px",width:"100%"},variant:"contained",onClick:()=>r("/main-menu")},"Voltar para menu principal"))},U=t(190),F=t(133);var V=function(){const e=Object(u.o)(),a=Object(C.b)();return n.a.createElement(d.a,{sx:{display:"flex",flexDirection:"column",alignItems:"center",mt:4}},n.a.createElement(F.a,{variant:"h4",component:"h1",gutterBottom:!0},"Menu Principal"),n.a.createElement(d.a,{sx:{"& > button":{m:1}}},n.a.createElement(U.a,{container:!0,spacing:2,alignItems:"center",direction:"column"},n.a.createElement(U.a,{item:!0},n.a.createElement(j.a,{variant:"contained",color:"primary",onClick:()=>{e("/add-score")}},"Adicionar Score")),n.a.createElement(U.a,{item:!0},n.a.createElement(j.a,{variant:"contained",color:"primary",onClick:()=>{e("/list-scores",{state:{userId:a.currentUser.uid}})}},"Listar Scores")),n.a.createElement(U.a,{item:!0},n.a.createElement(j.a,{variant:"contained",color:"primary",onClick:()=>{Object(C.d)(a),e("/")}},"Sign Out")))))},B=t(88),G=t.n(B);var M=function(){const[e,a]=Object(r.useState)(""),[t,c]=Object(r.useState)(""),[l,o]=Object(r.useState)(""),s=Object(u.o)(),i=Object(C.b)();return n.a.createElement(d.a,{component:"form",onSubmit:async a=>{a.preventDefault(),o("");try{await Object(C.c)(i,e,t),s("/main-menu")}catch(l){o("Failed to log in"),console.error(l.message)}},sx:{display:"flex",justifyContent:"center",height:"50vh",marginTop:"150px",flexDirection:"column",alignItems:"center"}},n.a.createElement("img",{src:G.a,alt:"Logo",style:{maxWidth:"100%",maxHeight:"100%"}}),n.a.createElement(U.a,{container:!0,spacing:2,alignItems:"center",direction:"column"},n.a.createElement(U.a,{item:!0,marginTop:"10px"},n.a.createElement(E.a,{label:"Email",variant:"outlined",type:"email",value:e,onChange:e=>a(e.target.value),required:!0})),n.a.createElement(U.a,{item:!0},n.a.createElement(E.a,{label:"Password",variant:"outlined",type:"password",value:t,onChange:e=>c(e.target.value),required:!0})),l&&n.a.createElement("p",null,l),n.a.createElement(U.a,{item:!0,width:"30%"},n.a.createElement(j.a,{type:"submit",variant:"contained",fullWidth:!0},"Login")),n.a.createElement(U.a,{item:!0,width:"30%"},n.a.createElement(j.a,{onClick:()=>s("/new-user"),fullWidth:!0,variant:"outlined",color:"secondary",sx:{mt:1,mb:2}},"Sign Up"))))};var L=function(){const[e,a]=Object(r.useState)(""),[t,c]=Object(r.useState)(""),[l,o]=Object(r.useState)(""),[s,i]=Object(r.useState)(""),m=Object(u.o)();return n.a.createElement(d.a,{component:"form",onSubmit:async a=>{a.preventDefault(),i("");try{await I(t,l,e),m("/main-menu")}catch(s){console.error("Could not add the document: ",s)}},noValidate:!0,sx:{mt:1}},n.a.createElement(E.a,{margin:"normal",required:!0,fullWidth:!0,id:"name",label:"Name",name:"name",autoComplete:"name",autoFocus:!0,value:e,onChange:e=>a(e.target.value)}),n.a.createElement(E.a,{margin:"normal",required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",autoComplete:"email",value:t,onChange:e=>c(e.target.value)}),n.a.createElement(E.a,{margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password",value:l,onChange:e=>o(e.target.value)}),s&&n.a.createElement(d.a,{color:"error.main"},s),n.a.createElement(j.a,{type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2}},"Sign Up"))},z=t(197),J=t(198),_=t(199),K=t(90),R=t(184),X=t(200);var Y=e=>{let{score:a,onViewOptions:t,onUpdateScore:c,onDeleteScore:l}=e;const[o,s]=Object(r.useState)(null),i=()=>{s(null)};return n.a.createElement(z.a,null,n.a.createElement(J.a,null,a&&n.a.createElement("div",null,n.a.createElement(F.a,{variant:"h5"},"Paciente: ",a.patientName),n.a.createElement(F.a,{variant:"body1"},"Score total: ",a.totalScore),n.a.createElement(_.a,{"aria-label":"more","aria-controls":"long-menu","aria-haspopup":"true",onClick:e=>{s(e.currentTarget)}},n.a.createElement(F.a,{variant:"subtitle2",component:"span"},n.a.createElement(X.a,{fontSize:"small"}),"Mais op\xe7\xf5es")),n.a.createElement(K.a,{anchorEl:o,open:Boolean(o),onClose:i},n.a.createElement(R.a,{onClick:()=>{t(a),i()}},"Detalhes"),n.a.createElement(R.a,{onClick:()=>{c(a),i()}},"Atualizar Score"),n.a.createElement(R.a,{onClick:()=>{l(a),i()}},"Excluir Score")))))};var Z=()=>{const[e,a]=Object(r.useState)([]),[t,c]=Object(r.useState)(!1),l=Object(u.m)(),{userId:o}=l.state||{},s=Object(u.o)();Object(r.useEffect)(()=>{(async()=>{const e=(await(async e=>{const a=await D(e),t=Object(w.f)(N,"users",a),r=await Object(w.g)(t);if(r.exists()){const e=r.data().scores.map(e=>Object(w.g)(Object(w.f)(N,"scores",e)));return(await Promise.all(e)).map(e=>({id:e.id,...e.data()}))}return console.log("No such user document!"),[]})(o)).filter(e=>null!=e);a(e)})()},[t]);const i=async e=>{await(async e=>{const a=Object(C.b)().currentUser;if(!a)return console.error("No authenticated user found. "),{success:!1,error:"No authenticated user. "};try{await Object(w.e)(Object(w.f)(N,"scores",e));const r=await D(a.uid),n=Object(w.f)(N,"users",r);await Object(w.l)(n,{scores:Object(w.b)(e)})}catch(t){console.error("Error deleting score: ",t)}})(e.id),c(e=>!e)};return n.a.createElement(U.a,{container:!0,spacing:2,direction:"column",alignContent:"center"},e.map(e=>n.a.createElement(U.a,{item:!0,key:e.id,xs:12},n.a.createElement(Y,{score:e,onViewOptions:()=>(e=>{s("/score-details",{state:{score:e}})})(e),onUpdateScore:()=>(e=>{s("/update-score",{state:{receivedScore:e}})})(e),onDeleteScore:()=>i(e)}))),n.a.createElement(j.a,{sx:{margin:"20px",width:"28%",display:"flex",flexDirection:"center"},variant:"contained",onClick:()=>s(-1)},"Voltar"))};var Q=function(){const e=Object(u.o)(),a=Object(u.m)(),{score:t}=a.state||{};return n.a.createElement(d.a,{sx:{padding:3,maxWidth:600,margin:"auto"}},n.a.createElement("div",null,n.a.createElement("p",null,"Paciente: ",t.patientName)),n.a.createElement("div",null,n.a.createElement(p.a,{control:n.a.createElement(g.a,{checked:t.score.fibrillation,disabled:!0,name:"fibrillation"}),label:"Flutter/Atrial fibrillation"})),n.a.createElement("div",null,n.a.createElement(p.a,{control:n.a.createElement(g.a,{checked:t.score.age,disabled:!0,name:"age"}),label:"Age >= 75"})),n.a.createElement("div",null,n.a.createElement(p.a,{control:n.a.createElement(g.a,{checked:t.score.strokeScale,disabled:!0,name:"strokeScale"}),label:"Stroke Scale NIHSS >= 12"})),n.a.createElement(b.a,{disabled:!0,component:"legend"},"Transformation Hemorrhage:"),"none"===t.score.tHemorrhage&&n.a.createElement(p.a,{control:n.a.createElement(g.a,{checked:t.score.tHemorrhage,disabled:!0,name:"tHemorrhage"}),label:"None"}),"petequial"===t.score.tHemorrhage&&n.a.createElement(p.a,{control:n.a.createElement(g.a,{checked:t.score.tHemorrhage,disabled:!0,name:"tHemorrhage"}),label:"petequial"}),"hematoma"===t.score.tHemorrhage&&n.a.createElement(p.a,{control:n.a.createElement(g.a,{checked:t.score.tHemorrhage,disabled:!0,name:"tHemorrhage"}),label:"hematoma"}),n.a.createElement("div",null,n.a.createElement(p.a,{control:n.a.createElement(g.a,{checked:t.score.glucose,disabled:!0,name:"glucose"}),label:"Glucose >= 140"})),n.a.createElement("div",null,n.a.createElement(p.a,{control:n.a.createElement(g.a,{checked:t.score.aspects,disabled:!0,name:"aspects"}),label:"ASPECTS  <= 7"})),n.a.createElement("div",null,n.a.createElement(p.a,{control:n.a.createElement(g.a,{checked:t.score.injury,disabled:!0,name:"injury"}),label:"Injury (inj\xfaria renal)"})),n.a.createElement("div",null,n.a.createElement(p.a,{control:n.a.createElement(g.a,{checked:t.score.nasoenteral,disabled:!0,name:"nasoenteral"}),label:"Nasoenteral sonda"})),n.a.createElement(j.a,{sx:{marginTop:"15px",width:"100%"},variant:"contained",onClick:()=>{e(-1)}},"Voltar"))};var $=function(){const e=Object(u.m)(),{receivedScore:a}=e.state||{},[t,c]=Object(r.useState)(new P(a.id,a.patientName,{fibrillation:a.score.fibrillation,age:a.score.age,strokeScale:a.score.strokeScale,tHemorrhage:a.score.tHemorrhage,glucose:a.score.glucose,aspects:a.score.aspects,injury:a.score.injury,nasoenteral:a.score.nasoenteral},a.createdAt,a.totalScore)),[l,o]=Object(r.useState)(!1),s=Object(u.o)(),i=(e,a)=>{const r=new P(t.documentId,t.patientName,{fibrillation:t.score.fibrillation,age:t.score.age,strokeScale:t.score.strokeScale,tHemorrhage:t.score.tHemorrhage,glucose:t.score.glucose,aspects:t.score.aspects,injury:t.score.injury,nasoenteral:t.score.nasoenteral},t.createdAt,t.totalScore);r.updateOption(e,a),c(r)},m=()=>{o(!1)},E=async e=>{e.preventDefault();const a=Object.keys(t.score).reduce((e,a)=>{const r=t.score[a];return"boolean"===typeof r&&r?"strokeScale"===a||"aspects"===a?e+2:e+1:e},0)+("petequial"===t.score.tHemorrhage?1:"hematoma"===t.score.tHemorrhage?2:0);try{await T(t.documentId,{score:t.score,updatedAt:new Date,totalScore:a}),s("/success",{state:{patientName:t.patientName,totalScore:a}})}catch(r){console.error("Could not add the document: ",r)}};return n.a.createElement(d.a,{sx:{padding:3,maxWidth:600,margin:"auto"}},n.a.createElement("div",null,n.a.createElement("p",null,"Paciente: ",t.patientName)),n.a.createElement("form",{onSubmit:E,sx:{display:"flex",flexDirection:"column",alignItems:"center","& .MuiTextField-root":{m:1,width:"25ch"},"& .MuiButton-root":{m:1,width:"25ch"}}},n.a.createElement("div",null,n.a.createElement(p.a,{control:n.a.createElement(g.a,{checked:t.score.fibrillation,onChange:e=>i("fibrillation",e.target.checked),name:"fibrillation"}),label:"Flutter/Atrial fibrillation? (1 pt)"})),n.a.createElement("div",null,n.a.createElement(p.a,{control:n.a.createElement(g.a,{checked:t.score.age,onChange:e=>i("age",e.target.checked),name:"age"}),label:"Age >= 75? (1 pt)"})),n.a.createElement("div",null,n.a.createElement(p.a,{control:n.a.createElement(g.a,{checked:t.score.strokeScale,onChange:e=>i("strokeScale",e.target.checked),name:"strokeScale"}),label:"Stroke Scale NIHSS >= 12? (2 pts)"})),n.a.createElement(b.a,{component:"legend"},"Transformation Hemorrhage"),n.a.createElement(h.a,{name:"tHemorrhage",value:t.score.tHemorrhage,onChange:e=>i("tHemorrhage",e.target.value)},n.a.createElement(p.a,{value:"none",control:n.a.createElement(f.a,null),label:"None"}),n.a.createElement(p.a,{value:"petequial",control:n.a.createElement(f.a,null),label:"Petequial (1 pt)"}),n.a.createElement(p.a,{value:"hematoma",control:n.a.createElement(f.a,null),label:"Hematoma (2 pts)"})),n.a.createElement("div",null,n.a.createElement(p.a,{control:n.a.createElement(g.a,{checked:t.score.glucose,onChange:e=>i("glucose",e.target.checked),name:"glucose"}),label:"Glucose >= 140? (1 pt)"})),n.a.createElement("div",null,n.a.createElement(p.a,{control:n.a.createElement(g.a,{checked:t.score.aspects,onChange:e=>i("aspects",e.target.checked),name:"aspects"}),label:"ASPECTS  <= 7? (2 pts)"})),n.a.createElement("div",null,n.a.createElement(p.a,{control:n.a.createElement(g.a,{checked:t.score.injury,onChange:e=>i("injury",e.target.checked),name:"injury"}),label:"Injury (inj\xfaria renal)? (1 pt)"})),n.a.createElement("div",null,n.a.createElement(p.a,{control:n.a.createElement(g.a,{checked:t.score.nasoenteral,onChange:e=>i("nasoenteral",e.target.checked),name:"nasoenteral"}),label:"Nasoenteral sonda? (1 pt)"})),n.a.createElement(j.a,{sx:{marginTop:"10px",width:"100%"},variant:"contained",onClick:()=>{o(!0)}},"Submit"),n.a.createElement(S.a,{open:l,onClose:m,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},n.a.createElement(O.a,{id:"alert-dialog-title"},"Confirm Submission"),n.a.createElement(k.a,null,n.a.createElement(y.a,{id:"alert-dialog-description"},"Are you sure you want to submit the score?")),n.a.createElement(v.a,null,n.a.createElement(j.a,{onClick:m},"Cancel"),n.a.createElement(j.a,{onClick:E,autoFocus:!0},"Confirm")))),n.a.createElement(j.a,{sx:{marginTop:"10px",width:"100%"},variant:"outlined",onClick:()=>s(-1)},"Voltar"))};var ee=function(){return n.a.createElement(m.a,null,n.a.createElement(u.c,null,n.a.createElement(u.a,{path:"/",element:n.a.createElement(M,null)}),n.a.createElement(u.a,{path:"/add-score",element:n.a.createElement(q,null)}),n.a.createElement(u.a,{path:"/success",element:n.a.createElement(W,null)}),n.a.createElement(u.a,{path:"/main-menu",element:n.a.createElement(V,null)}),n.a.createElement(u.a,{path:"/new-user",element:n.a.createElement(L,null)}),n.a.createElement(u.a,{path:"/list-scores",element:n.a.createElement(Z,null)}," "),n.a.createElement(u.a,{path:"/score-details",element:n.a.createElement(Q,null)}),n.a.createElement(u.a,{path:"/update-score",element:n.a.createElement($,null)})))};const ae=Object(o.a)({palette:{primary:{main:"#007bff"},secondary:{main:"#28a745"},background:{default:"#fff"},text:{primary:"#007bff",secondary:"#28a745"}}});var te=function(){return n.a.createElement(s.a,{theme:ae},n.a.createElement(i.a,null),n.a.createElement(ee,null))};l.a.createRoot(document.getElementById("root")).render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(te,null)))},88:function(e,a,t){e.exports=t.p+"static/media/fastgain_logo_F.be41137c.jpeg"}},[[114,1,2]]]);
//# sourceMappingURL=main.a3a5276a.chunk.js.map