import { useState, useEffect, useCallback } from "react";

const db = {
  async get(k, s=false){try{const r=await window.storage.get(k,s);return r?JSON.parse(r.value):null}catch{return null}},
  async set(k,v,s=false){try{await window.storage.set(k,JSON.stringify(v),s);return true}catch{return false}},
  async list(p,s=false){try{const r=await window.storage.list(p,s);return r?.keys||[]}catch{return[]}},
  async del(k,s=false){try{await window.storage.delete(k,s);return true}catch{return false}},
};

const ADMIN_PASS="LlegasteTarde2026!";
const V={a:"#d95a1b",as:"rgba(217,90,27,0.10)",ab:"rgba(217,90,27,0.25)",bg:"#0b0b0e",sf:"#141418",cd:"#1a1a20",co:"#111115",bd:"#27272f",t:"#ece8e0",t2:"#8d8a82",t3:"#5a5850",tg:"rgba(217,90,27,0.12)",g:"#22c55e",r:"#ef4444",f:"'Karla',sans-serif",se:"'Instrument Serif',serif",mo:"'JetBrains Mono',monospace"};

function getRoute(){const h=location.hash.slice(1)||"";if(h.startsWith("/admin"))return"admin";if(h.startsWith("/encuesta"))return"encuesta";if(h.startsWith("/blog/"))return"blogpost";if(h.startsWith("/blog"))return"home";return"home"}
function getSlug(){const m=location.hash.slice(1).match(/\/blog\/(.+)/);return m?m[1]:null}
function nav(p){location.hash=p}

function Btn({children,onClick,v="p",disabled:d,s={}}){
  const b={border:"none",borderRadius:10,padding:"11px 24px",fontSize:14,fontWeight:700,cursor:d?"not-allowed":"pointer",fontFamily:V.f,opacity:d?0.5:1};
  const m={p:{...b,background:V.a,color:"#fff"},s:{...b,background:V.sf,color:V.t2,border:`1px solid ${V.bd}`},d:{...b,background:V.r,color:"#fff"},g:{...b,background:V.g,color:"#fff"}};
  return <button onClick={onClick} disabled={d} style={{...m[v],...s}}>{children}</button>;
}
function Inp({value:val,onChange:oc,placeholder:ph,type:ty="text",s={}}){return <input type={ty} value={val} onChange={e=>oc(e.target.value)} placeholder={ph} style={{width:"100%",background:V.cd,border:`1px solid ${V.bd}`,borderRadius:10,padding:"12px 14px",fontSize:14,color:V.t,fontFamily:V.f,outline:"none",...s}}/>}
function TA({value:val,onChange:oc,placeholder:ph,rows:r=4,s={}}){return <textarea value={val} onChange={e=>oc(e.target.value)} placeholder={ph} rows={r} style={{width:"100%",background:V.cd,border:`1px solid ${V.bd}`,borderRadius:10,padding:"12px 14px",fontSize:14,color:V.t,fontFamily:V.f,resize:"vertical",lineHeight:1.6,outline:"none",...s}}/>}

const PROMPTS=[
  {id:1,nm:"El Correo Que No Puedes Escribir",ct:"Comunicación",ch:"3",ic:"✉️",pr:"Actúa como un profesional de [tu área]. Necesito escribir un correo electrónico a [destinatario] para [objetivo]. El tono debe ser profesional pero cercano. Contexto: [explica brevemente]. Dame 2 versiones: una directa y una más diplomática."},
  {id:2,nm:"El Resumen Ejecutivo Exprés",ct:"Productividad",ch:"3",ic:"📋",pr:"Eres un consultor senior. Te voy a pegar un texto largo. Resúmelo en: 1) Un párrafo ejecutivo de 3 oraciones, 2) 5 puntos clave, 3) Las acciones a tomar. Texto: [pega el texto aquí]"},
  {id:3,nm:"Fórmulas de Excel Sin Dolor",ct:"Excel",ch:"5",ic:"📊",pr:"Soy usuario de Excel nivel intermedio-bajo. Tengo una hoja con columnas: [describe]. Necesito una fórmula que [describe]. Explícamela paso a paso. Si es posible, dame una alternativa más sencilla."},
  {id:4,nm:"Preparación para Junta",ct:"Estrategia",ch:"7",ic:"🎯",pr:"Voy a tener una reunión con [quién] sobre [tema]. Mi objetivo es [describe]. Ayúdame a: 1) Mis 3 argumentos principales, 2) Las 3 objeciones más probables, 3) Un resumen de una página para llevar impreso."},
  {id:5,nm:"Analista de Datos Personal",ct:"Excel",ch:"5",ic:"📈",pr:"Tengo estos datos [pega o describe]. Identifica: 1) Tendencias principales, 2) Datos atípicos, 3) 3 conclusiones para mi jefe. Que alguien no técnico lo entienda."},
  {id:6,nm:"Creador de Presentaciones",ct:"Productividad",ch:"4",ic:"🖥️",pr:"Necesito una presentación de [número] diapositivas sobre [tema]. Audiencia: [describe]. Para cada slide: 1) Título, 2) 3-4 puntos clave, 3) Sugerencia visual. Tono: [profesional / dinámico / formal]."},
  {id:7,nm:"Reescritura Profesional",ct:"Comunicación",ch:"3",ic:"✏️",pr:"Reescribe este texto para que suene más [profesional / persuasivo / claro]. Mantén la idea central, mejora estructura e impacto. Corrige errores. Texto: [pega tu texto]"},
  {id:8,nm:"Plan de Proyecto Rápido",ct:"Estrategia",ch:"6",ic:"🗂️",pr:"Soy [tu rol] en [industria]. Necesito un plan de proyecto para [describe]. Incluye: 1) Objetivos, 2) Fases con duración, 3) Entregables, 4) Riesgos y mitigación."},
  {id:9,nm:"Propuesta de Valor",ct:"Estrategia",ch:"4",ic:"💡",pr:"Mi empresa es [describe]. Mi cliente ideal es [describe]. Problema que resolvemos: [describe]. Genera: 1) Propuesta de valor en una oración, 2) Elevator pitch de 30s, 3) 3 diferenciadores, 4) Versión para firma de correo."},
  {id:10,nm:"Plan de Carrera Asistido",ct:"Carrera",ch:"8",ic:"🚀",pr:"Soy [perfil]. Mi objetivo a 2 años es [describe]. Fortalezas: [lista]. Áreas de mejora: [lista]. Dame: 1) 3 movimientos estratégicos, 2) Habilidades a desarrollar, 3) Cómo posicionar mi LinkedIn, 4) Plan mensual."},
];
const CATS=["Todos","Comunicación","Productividad","Excel","Estrategia","Carrera"];
const GLOSS=[{t:"Prompt",d:"La instrucción que le das a la IA."},{t:"IA Generativa",d:"IA que crea contenido nuevo."},{t:"LLM",d:"El cerebro detrás de ChatGPT y Claude."},{t:"Alucinación",d:"Cuando la IA inventa datos falsos."},{t:"Token",d:"Unidad de texto (~1-2 por palabra)."},{t:"Contexto",d:"Info que la IA retiene en una conversación."},{t:"Modelo",d:"Versión específica de IA (GPT-4, Claude)."},{t:"No-code",d:"Automatizar sin escribir código."},{t:"Machine Learning",d:"IA que aprende patrones de datos."},{t:"RAG",d:"IA que busca en docs antes de responder."},{t:"Multimodal",d:"IA que procesa texto, imagen, audio y video."},{t:"Agente",d:"IA que ejecuta secuencias de tareas sola."},{t:"Sesgo",d:"Prejuicios en la IA por sus datos de entrenamiento."},{t:"Guardrails",d:"Límites de seguridad de la IA."},{t:"Workflow",d:"Secuencia de pasos automatizados."}];
const CHS=[{n:"→",l:"Introducción",t:"Sí, Llegaste Tarde. Y Está Bien."},{n:"1",l:"Capítulo 1",t:"¿Qué Es la IA? (Explicado Como Si Fueras Mi Mamá)"},{n:"2",l:"Capítulo 2",t:"Tu Primera Conversación con la IA"},{n:"3",l:"Capítulo 3",t:"El Arte de Pedir (Framework ROCA)"},{n:"4",l:"Capítulo 4",t:"IA para Tu Área (Casos por Profesión)"},{n:"5",l:"Capítulo 5",t:"Excel + IA = Tu Nuevo Superpoder"},{n:"6",l:"Capítulo 6",t:"Automatiza lo Aburrido"},{n:"7",l:"Capítulo 7",t:"Cómo Destacar en Tu Trabajo Usando IA"},{n:"8",l:"Capítulo 8",t:"Tu Plan de 30 Días"},{n:"★",l:"Conclusión",t:"No Llegaste Tarde. Llegaste Justo a Tiempo."}];

const SQS=[
  {id:"q1",sec:"Primera Impresión",ty:"rating",q:"¿Qué tan identificado te sentiste con la escena de la introducción?",lb:["Nada","Poco","Algo","Mucho","Totalmente"]},
  {id:"q2",sec:"Primera Impresión",ty:"rating",q:"¿El título te motivó a leer o te generó ansiedad?",lb:["Solo ansiedad","Más ansiedad","Neutro","Más motivación","Pura motivación"]},
  {id:"q3",sec:"Contenido",ty:"rating",q:"¿Qué tan claro fue el Capítulo 1?",lb:["Confuso","Algo confuso","Aceptable","Claro","Muy claro"]},
  {id:"q4",sec:"Contenido",ty:"rating",q:"¿El framework ROCA te pareció fácil de usar?",lb:["Muy difícil","Difícil","Regular","Fácil","Muy fácil"]},
  {id:"q5",sec:"Contenido",ty:"sel",q:"¿Capítulos MÁS útiles? (hasta 3)",mx:3,opts:["Cap 1","Cap 2","Cap 3 ROCA","Cap 4 Por Área","Cap 5 Excel","Cap 6 Automatización","Cap 7 Destacar","Cap 8 Plan 30 Días"]},
  {id:"q6",sec:"Tono",ty:"rating",q:"¿El tono conversacional con humor ligero te pareció adecuado?",lb:["Nada","Poco","Aceptable","Adecuado","Perfecto"]},
  {id:"q7",sec:"Tono",ty:"single",q:"Describe el tono del libro en una palabra:",opts:["Amigable","Motivador","Práctico","Condescendiente","Superficial","Profesional","Divertido"]},
  {id:"q8",sec:"Tono",ty:"rating",q:"¿La extensión del libro te pareció adecuada?",lb:["Muy corto","Algo corto","Perfecto","Algo largo","Muy largo"]},
  {id:"q9",sec:"Prompts",ty:"rating",q:"¿Qué tan útiles te parecieron los prompts?",lb:["Inútiles","Poco útiles","Algo útiles","Útiles","Muy útiles"]},
  {id:"q10",sec:"Prompts",ty:"single",q:"¿Probaste algún prompt del libro?",opts:["Sí, varios","Sí, uno o dos","No, pero lo haré","No, no creo"]},
  {id:"q11",sec:"Impacto",ty:"single",q:"¿Cómo cambió tu confianza con IA?",opts:["Sigo igual","Un poco más","Bastante más","Listo para usarla","Ya la uso"]},
  {id:"q12",sec:"Impacto",ty:"rating",q:"¿Qué tan probable es que recomiendes este libro?",lb:["Nada","Poco","Tal vez","Probable","Seguro"]},
  {id:"q13",sec:"Impacto",ty:"single",q:"¿Cuánto pagarías?",opts:["< $99 MXN","$99–149","$149–199","$199–299","> $299"]},
  {id:"q14",sec:"Sobre Ti",ty:"single",q:"¿En qué área trabajas?",opts:["Marketing","Ventas","RRHH","Finanzas","Legal","Administración","Emprendimiento","TI","Otra"]},
  {id:"q15",sec:"Abierta",ty:"text",q:"¿Qué fue lo que MÁS te gustó?",ph:"Lo que más me gustó fue..."},
  {id:"q16",sec:"Abierta",ty:"text",q:"¿Qué le cambiarías o agregarías?",ph:"Yo cambiaría..."},
];

// ═══ HOME ═══
function Home(){
  const[tab,setTab]=useState("prompts");const[fl,setFl]=useState("Todos");const[sr,setSr]=useState("");const[op,setOp]=useState(null);
  const[em,setEm]=useState("");const[ss,setSs]=useState(null);const[blogs,setBl]=useState([]);
  useEffect(()=>{(async()=>{const ks=await db.list("blog:",true);const ps=[];for(const k of ks){const p=await db.get(k,true);if(p?.published)ps.push(p)}ps.sort((a,b)=>b.date.localeCompare(a.date));setBl(ps)})()},[]);
  const flt=PROMPTS.filter(p=>(fl==="Todos"||p.ct===fl)&&(!sr||(p.nm+p.pr).toLowerCase().includes(sr.toLowerCase())));
  const sub=async()=>{if(!em||!em.includes("@")){setSs("bad");return}await db.set(`sub:${Date.now()}`,{email:em,date:new Date().toISOString()},true);setSs("ok");setEm("")};
  const cp=(txt,id)=>{navigator.clipboard.writeText(txt);setOp("c"+id);setTimeout(()=>setOp(null),2000)};

  return <div>
    <header style={{textAlign:"center",padding:"60px 20px 36px",position:"relative"}}>
      <div style={{position:"absolute",top:-80,left:"50%",transform:"translateX(-50%)",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(217,90,27,0.06) 0%,transparent 70%)",pointerEvents:"none"}}/>
      <span style={{display:"inline-block",background:V.as,border:`1px solid ${V.ab}`,borderRadius:40,padding:"4px 16px",fontSize:11,fontWeight:700,color:V.a,letterSpacing:"0.08em",textTransform:"uppercase"}}>📖 Recurso del Libro</span>
      <h1 style={{fontFamily:V.se,fontSize:"clamp(32px,7vw,56px)",fontWeight:400,lineHeight:1.05,color:V.t,marginTop:18,marginBottom:10}}>Llegaste Tarde <em style={{fontStyle:"normal",color:V.a}}>a la IA</em></h1>
      <p style={{fontSize:"clamp(14px,2.5vw,17px)",color:V.t2,maxWidth:500,margin:"0 auto 30px",lineHeight:1.55}}>Prompts de IA listos para copiar, glosario en español y recursos para profesionales.</p>
      <nav style={{display:"inline-flex",gap:3,background:V.sf,borderRadius:14,padding:4,border:`1px solid ${V.bd}`,flexWrap:"wrap",justifyContent:"center"}}>
        {[{k:"prompts",l:"⚡ Prompts"},{k:"capitulos",l:"📖 Capítulos"},{k:"glosario",l:"📚 Glosario"},{k:"blog",l:"✍️ Blog"}].map(x=><button key={x.k} onClick={()=>setTab(x.k)} style={{background:tab===x.k?V.a:"transparent",color:tab===x.k?"#fff":V.t2,border:"none",borderRadius:10,padding:"9px 16px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:V.f,whiteSpace:"nowrap"}}>{x.l}</button>)}
      </nav>
    </header>

    <main style={{maxWidth:720,margin:"0 auto",padding:"0 20px 36px"}}>
      {tab==="prompts"&&<>
        <div style={{position:"relative",marginBottom:12}}><span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontSize:15,pointerEvents:"none"}}>🔍</span><input type="search" value={sr} onChange={e=>setSr(e.target.value)} placeholder="Buscar prompts..." style={{width:"100%",background:V.cd,border:`1px solid ${V.bd}`,borderRadius:12,padding:"12px 14px 12px 40px",fontSize:14,color:V.t,fontFamily:V.f,outline:"none"}}/></div>
        <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:18}}>{CATS.map(c=><button key={c} onClick={()=>setFl(c)} style={{background:fl===c?V.a:V.cd,color:fl===c?"#fff":V.t2,border:fl===c?"none":`1px solid ${V.bd}`,borderRadius:10,padding:"6px 14px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:V.f}}>{c}</button>)}</div>
        <p style={{fontSize:13,color:V.t2,marginBottom:10}}>{flt.length} prompts</p>
        {flt.map(p=><article key={p.id} style={{background:V.cd,borderRadius:14,border:`1px solid ${V.bd}`,marginBottom:8,overflow:"hidden"}}>
          <div onClick={()=>setOp(op===p.id?null:p.id)} style={{padding:"15px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:11}}>
            <span style={{fontSize:22}}>{p.ic}</span>
            <div style={{flex:1}}><div style={{fontWeight:700,fontSize:15,color:V.t}}>#{p.id} — {p.nm}</div><div style={{display:"flex",gap:5,marginTop:4}}><span style={{background:V.tg,color:V.a,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,textTransform:"uppercase"}}>{p.ct}</span><span style={{background:"rgba(255,255,255,0.05)",color:V.t2,fontSize:10,padding:"2px 8px",borderRadius:20}}>Cap. {p.ch}</span></div></div>
            <span style={{fontSize:16,color:V.t3,transform:op===p.id?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▾</span>
          </div>
          {op===p.id&&<div style={{padding:"0 16px 14px"}}><div style={{background:V.co,border:`1px solid ${V.bd}`,borderRadius:10,padding:14,fontFamily:V.mo,fontSize:12.5,lineHeight:1.7,color:V.t,whiteSpace:"pre-wrap",wordBreak:"break-word",marginBottom:10}}>{p.pr}</div><div style={{textAlign:"right"}}><Btn onClick={()=>cp(p.pr,p.id)} v={op==="c"+p.id?"g":"p"} s={{padding:"8px 20px",fontSize:13}}>{op==="c"+p.id?"✓ Copiado":"Copiar"}</Btn></div></div>}
        </article>)}
      </>}

      {tab==="capitulos"&&CHS.map((c,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 0",borderBottom:i<CHS.length-1?`1px solid ${V.bd}`:"none"}}>
        <div style={{width:40,height:40,borderRadius:10,background:(c.n==="→"||c.n==="★")?V.as:V.cd,border:`1px solid ${(c.n==="→"||c.n==="★")?V.ab:V.bd}`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:14,color:(c.n==="→"||c.n==="★")?V.a:V.t2,flexShrink:0}}>{c.n}</div>
        <div><div style={{fontSize:10,fontWeight:700,color:V.t3,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:2}}>{c.l}</div><div style={{fontSize:14,fontWeight:600,color:V.t,lineHeight:1.3}}>{c.t}</div></div>
      </div>)}

      {tab==="glosario"&&<>{GLOSS.map((g,i)=><div key={i} style={{background:V.cd,borderRadius:12,padding:"13px 16px",border:`1px solid ${V.bd}`,marginBottom:6}}><span style={{fontWeight:700,fontSize:14,color:V.a}}>{g.t}</span><span style={{fontSize:13,color:V.t2,marginLeft:8}}>— {g.d}</span></div>)}</>}

      {tab==="blog"&&<>{blogs.length===0?<p style={{color:V.t3,textAlign:"center",padding:36}}>Próximamente: nuevos artículos cada semana.</p>:blogs.map(b=><article key={b.slug} onClick={()=>nav("/blog/"+b.slug)} style={{background:V.cd,borderRadius:14,border:`1px solid ${V.bd}`,padding:"18px 20px",marginBottom:10,cursor:"pointer"}}>
        <div style={{fontSize:11,color:V.a,fontWeight:700,marginBottom:5,textTransform:"uppercase"}}>{new Date(b.date).toLocaleDateString("es-MX",{day:"numeric",month:"long",year:"numeric"})}</div>
        <h3 style={{fontSize:17,fontWeight:700,color:V.t,marginBottom:5,fontFamily:V.se}}>{b.title}</h3>
        <p style={{fontSize:13,color:V.t2,lineHeight:1.5}}>{b.excerpt}</p>
      </article>)}</>}
    </main>

    <section style={{background:V.sf,borderTop:`1px solid ${V.bd}`,borderBottom:`1px solid ${V.bd}`,padding:"32px 20px",textAlign:"center"}}>
      <h2 style={{fontFamily:V.se,fontSize:21,color:V.t,marginBottom:5}}>Recibe actualizaciones del libro</h2>
      <p style={{fontSize:13,color:V.t2,marginBottom:16,maxWidth:400,margin:"0 auto 16px"}}>Nuevos prompts, capítulos y recursos directo a tu correo. Sin spam.</p>
      {ss==="ok"?<p style={{color:V.g,fontWeight:700,fontSize:14}}>✓ ¡Suscrito!</p>:<div style={{display:"flex",gap:8,maxWidth:400,margin:"0 auto",flexWrap:"wrap",justifyContent:"center"}}>
        <Inp value={em} onChange={setEm} placeholder="tu@correo.com" type="email" s={{flex:"1 1 200px",minWidth:180}}/>
        <Btn onClick={sub}>Suscribirme →</Btn>
      </div>}
      {ss==="bad"&&<p style={{color:V.r,fontSize:12,marginTop:6}}>Ingresa un correo válido.</p>}
    </section>

    <footer style={{textAlign:"center",padding:"30px 20px 40px"}}>
      <a href="https://github.com/rodrigomironpalacios/llegaste-tarde-ia" target="_blank" rel="noopener" style={{color:V.a,fontWeight:700,fontSize:14,textDecoration:"none"}}>Ver proyecto en GitHub →</a>
      <div style={{fontSize:12,color:V.t3,marginTop:18}}>© 2026 — Llegaste Tarde a la IA</div>
    </footer>
  </div>;
}

// ═══ BLOG POST ═══
function BlogPost(){
  const[p,setP]=useState(null);const sl=getSlug();
  useEffect(()=>{if(sl)db.get("blog:"+sl,true).then(setP)},[sl]);
  if(!p)return<div style={{textAlign:"center",padding:80,color:V.t2}}>Cargando...</div>;
  return<div style={{maxWidth:660,margin:"0 auto",padding:"44px 20px 72px"}}>
    <button onClick={()=>nav("")} style={{background:"none",border:"none",color:V.a,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:V.f,marginBottom:20}}>← Volver</button>
    <div style={{fontSize:12,color:V.a,fontWeight:700,textTransform:"uppercase",marginBottom:8}}>{new Date(p.date).toLocaleDateString("es-MX",{day:"numeric",month:"long",year:"numeric"})}</div>
    <h1 style={{fontFamily:V.se,fontSize:"clamp(26px,5vw,38px)",color:V.t,marginBottom:18,lineHeight:1.15}}>{p.title}</h1>
    <div style={{fontSize:15,color:V.t2,lineHeight:1.8,whiteSpace:"pre-wrap"}}>{p.body}</div>
  </div>;
}

// ═══ ADMIN ═══
function Admin(){
  const[auth,setAuth]=useState(false);const[pw,setPw]=useState("");
  const[at,setAt]=useState("blog");const[blogs,setBl]=useState([]);const[subs,setSu]=useState([]);const[svs,setSv]=useState([]);
  const[ed,setEd]=useState(null);const[fm,setFm]=useState({title:"",excerpt:"",body:"",published:true});
  const load=useCallback(async()=>{
    const bk=await db.list("blog:",true);const bs=[];for(const k of bk){const p=await db.get(k,true);if(p)bs.push(p)}bs.sort((a,b)=>b.date.localeCompare(a.date));setBl(bs);
    const sk=await db.list("sub:",true);const ss=[];for(const k of sk){const s=await db.get(k,true);if(s)ss.push({...s,key:k})}ss.sort((a,b)=>b.date.localeCompare(a.date));setSu(ss);
    const rk=await db.list("survey:",true);const rs=[];for(const k of rk){const r=await db.get(k,true);if(r)rs.push(r)}rs.sort((a,b)=>(b._ts||"").localeCompare(a._ts||""));setSv(rs);
  },[]);
  useEffect(()=>{if(auth)load()},[auth,load]);

  const save=async()=>{if(!fm.title.trim())return;const sl=ed||fm.title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");const post={...fm,slug:sl,date:ed?(blogs.find(b=>b.slug===ed)?.date||new Date().toISOString()):new Date().toISOString()};await db.set("blog:"+sl,post,true);setFm({title:"",excerpt:"",body:"",published:true});setEd(null);load()};
  const delP=async(sl)=>{if(confirm("¿Eliminar?")){await db.del("blog:"+sl,true);load()}};
  const delS=async(k)=>{await db.del(k,true);load()};
  const avgR=(qid)=>{const vs=svs.map(s=>s[qid]).filter(v=>typeof v==="number");return vs.length?(vs.reduce((a,b)=>a+b,0)/vs.length).toFixed(1):"—"};

  if(!auth)return<div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:20}}>
    <div style={{background:V.sf,border:`1px solid ${V.bd}`,borderRadius:16,padding:30,width:"100%",maxWidth:360,textAlign:"center"}}>
      <div style={{fontSize:36,marginBottom:10}}>🔐</div>
      <h2 style={{fontFamily:V.se,fontSize:23,color:V.t,marginBottom:4}}>Administración</h2>
      <p style={{fontSize:13,color:V.t2,marginBottom:18}}>Llegaste Tarde a la IA</p>
      <Inp value={pw} onChange={setPw} placeholder="Contraseña" type="password"/>
      <div style={{marginTop:10}}><Btn onClick={()=>{if(pw===ADMIN_PASS)setAuth(true);else alert("Contraseña incorrecta")}} s={{width:"100%"}}>Entrar</Btn></div>
    </div>
  </div>;

  return<div style={{maxWidth:780,margin:"0 auto",padding:"28px 20px 72px"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:10}}>
      <div><span style={{display:"inline-block",background:V.as,border:`1px solid ${V.ab}`,borderRadius:40,padding:"4px 14px",fontSize:11,fontWeight:700,color:V.a,letterSpacing:"0.08em",textTransform:"uppercase"}}>🔐 Admin</span><h1 style={{fontFamily:V.se,fontSize:26,color:V.t,marginTop:6}}>Panel de Administración</h1></div>
      <Btn v="s" onClick={()=>nav("")}>← Sitio</Btn>
    </div>

    <div style={{display:"flex",gap:4,marginBottom:24,background:V.sf,borderRadius:12,padding:3,border:`1px solid ${V.bd}`,width:"fit-content"}}>
      {[{k:"blog",l:"✍️ Blog"},{k:"subs",l:`📧 Suscriptores (${subs.length})`},{k:"surveys",l:`📊 Encuestas (${svs.length})`}].map(x=><button key={x.k} onClick={()=>setAt(x.k)} style={{background:at===x.k?V.a:"transparent",color:at===x.k?"#fff":V.t2,border:"none",borderRadius:8,padding:"8px 16px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:V.f}}>{x.l}</button>)}
    </div>

    {at==="blog"&&<>
      <div style={{background:V.sf,border:`1px solid ${V.bd}`,borderRadius:14,padding:22,marginBottom:22}}>
        <h3 style={{fontSize:15,fontWeight:700,color:V.t,marginBottom:12}}>{ed?"Editar Post":"Nuevo Post"}</h3>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <Inp value={fm.title} onChange={v=>setFm({...fm,title:v})} placeholder="Título"/>
          <Inp value={fm.excerpt} onChange={v=>setFm({...fm,excerpt:v})} placeholder="Extracto (1-2 oraciones)"/>
          <TA value={fm.body} onChange={v=>setFm({...fm,body:v})} placeholder="Contenido del post..." rows={8}/>
          <label style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:V.t2,cursor:"pointer"}}><input type="checkbox" checked={fm.published} onChange={e=>setFm({...fm,published:e.target.checked})}/>Publicado</label>
          <div style={{display:"flex",gap:8}}><Btn onClick={save}>{ed?"Guardar":"Publicar"}</Btn>{ed&&<Btn v="s" onClick={()=>{setEd(null);setFm({title:"",excerpt:"",body:"",published:true})}}>Cancelar</Btn>}</div>
        </div>
      </div>
      <h3 style={{fontSize:15,fontWeight:700,color:V.t,marginBottom:10}}>Posts ({blogs.length})</h3>
      {blogs.map(b=><div key={b.slug} style={{background:V.cd,border:`1px solid ${V.bd}`,borderRadius:10,padding:"12px 16px",marginBottom:6,display:"flex",alignItems:"center",gap:12}}>
        <div style={{flex:1}}><div style={{fontWeight:700,fontSize:13,color:V.t}}>{b.title}</div><div style={{fontSize:11,color:V.t3}}>{new Date(b.date).toLocaleDateString("es-MX")} · {b.published?"✅":"📝"}</div></div>
        <Btn v="s" onClick={()=>{setFm({title:b.title,excerpt:b.excerpt,body:b.body,published:b.published});setEd(b.slug)}} s={{padding:"5px 12px",fontSize:11}}>Editar</Btn>
        <Btn v="d" onClick={()=>delP(b.slug)} s={{padding:"5px 12px",fontSize:11}}>Eliminar</Btn>
      </div>)}
    </>}

    {at==="subs"&&<>
      <div style={{background:V.sf,border:`1px solid ${V.bd}`,borderRadius:14,padding:"16px 20px",marginBottom:16,textAlign:"center"}}><div style={{fontSize:32,fontWeight:800,color:V.a}}>{subs.length}</div><div style={{fontSize:12,color:V.t2}}>Suscriptores</div></div>
      <Btn v="s" onClick={()=>{navigator.clipboard.writeText("email,fecha\n"+subs.map(s=>`${s.email},${s.date}`).join("\n"));alert("CSV copiado")}} s={{marginBottom:14}}>📋 Copiar CSV</Btn>
      {subs.map((s,i)=><div key={i} style={{background:V.cd,border:`1px solid ${V.bd}`,borderRadius:10,padding:"9px 14px",marginBottom:5,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div><span style={{fontSize:13,color:V.t,fontWeight:600}}>{s.email}</span><span style={{fontSize:11,color:V.t3,marginLeft:8}}>{new Date(s.date).toLocaleDateString("es-MX")}</span></div>
        <button onClick={()=>delS(s.key)} style={{background:"none",border:"none",color:V.t3,cursor:"pointer",fontSize:16}}>×</button>
      </div>)}
      {subs.length===0&&<p style={{color:V.t3,textAlign:"center",padding:30}}>Aún no hay suscriptores.</p>}
    </>}

    {at==="surveys"&&<>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:8,marginBottom:20}}>
        {[{l:"Respuestas",v:svs.length},{l:"Claridad",v:avgR("q3")+"/5"},{l:"Tono",v:avgR("q6")+"/5"},{l:"NPS",v:avgR("q12")+"/5"}].map((c,i)=><div key={i} style={{background:V.sf,border:`1px solid ${V.bd}`,borderRadius:12,padding:"14px 12px",textAlign:"center"}}><div style={{fontSize:24,fontWeight:800,color:V.a}}>{c.v}</div><div style={{fontSize:11,color:V.t2}}>{c.l}</div></div>)}
      </div>
      {SQS.filter(q=>q.ty==="rating").map(q=>{const a=parseFloat(avgR(q.id))||0;return<div key={q.id} style={{background:V.cd,border:`1px solid ${V.bd}`,borderRadius:10,padding:"11px 14px",marginBottom:5}}>
        <div style={{fontSize:12,color:V.t2,marginBottom:5}}>{q.q}</div>
        <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{flex:1,height:6,background:V.bd,borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${(a/5)*100}%`,background:a>=4?V.g:a>=3?"#eab308":V.r,borderRadius:3}}/></div><span style={{fontSize:14,fontWeight:800,color:V.t,minWidth:30,textAlign:"right"}}>{avgR(q.id)}</span></div>
      </div>})}
      <h4 style={{fontSize:13,fontWeight:700,color:V.t,marginTop:16,marginBottom:8}}>Respuestas abiertas</h4>
      {SQS.filter(q=>q.ty==="text").map(q=><div key={q.id} style={{background:V.cd,border:`1px solid ${V.bd}`,borderRadius:10,padding:"11px 14px",marginBottom:6}}>
        <div style={{fontSize:12,color:V.a,fontWeight:600,marginBottom:5}}>{q.q}</div>
        {svs.map(s=>s[q.id]).filter(Boolean).map((t,i)=><div key={i} style={{fontSize:12,color:V.t2,padding:"5px 10px",background:V.bg,borderRadius:6,marginBottom:3,borderLeft:`3px solid ${V.bd}`}}>"{t}"</div>)}
      </div>)}
      {svs.length===0&&<p style={{color:V.t3,textAlign:"center",padding:30}}>Sin respuestas aún.</p>}
    </>}
  </div>;
}

// ═══ SURVEY ═══
function Survey(){
  const[st,setSt]=useState(0);const[ans,setAns]=useState({});const[done,setDone]=useState(false);const[sub,setSub]=useState(false);
  const q=SQS[st];const setA=v=>setAns({...ans,[q.id]:v});const val=ans[q.id];
  const send=async()=>{setSub(true);await db.set(`survey:${Date.now()}-${Math.random().toString(36).slice(2,6)}`,{...ans,_ts:new Date().toISOString()},true);setDone(true);setSub(false)};

  if(done)return<div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:20,textAlign:"center"}}>
    <div><div style={{fontSize:56,marginBottom:12}}>🎉</div><h2 style={{fontFamily:V.se,fontSize:25,color:V.t,marginBottom:8}}>¡Gracias por tu feedback!</h2><p style={{fontSize:14,color:V.t2,maxWidth:360,lineHeight:1.6}}>Tu opinión nos ayuda a crear un mejor libro.</p></div>
  </div>;

  return<div style={{maxWidth:500,margin:"0 auto",padding:"44px 20px 72px"}}>
    <div style={{textAlign:"center",marginBottom:28}}>
      <span style={{display:"inline-block",background:V.as,border:`1px solid ${V.ab}`,borderRadius:40,padding:"4px 14px",fontSize:11,fontWeight:700,color:V.a,letterSpacing:"0.08em",textTransform:"uppercase"}}>Encuesta Early Adopter</span>
      <h1 style={{fontFamily:V.se,fontSize:24,color:V.t,marginTop:12}}>Llegaste Tarde a la IA</h1>
      <p style={{fontSize:13,color:V.t2,marginTop:3}}>16 preguntas · ~4 minutos</p>
    </div>

    <div style={{marginBottom:22}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:12,color:V.t2}}>Pregunta {st+1} de {SQS.length}</span><span style={{fontSize:12,color:V.a,fontWeight:700}}>{Math.round(((st+1)/SQS.length)*100)}%</span></div>
      <div style={{height:5,background:V.bd,borderRadius:3}}><div style={{height:"100%",width:`${((st+1)/SQS.length)*100}%`,background:V.a,borderRadius:3,transition:"width 0.3s"}}/></div>
    </div>

    <div style={{fontSize:11,fontWeight:700,color:V.a,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:5}}>{q.sec}</div>
    <div style={{fontSize:16,fontWeight:600,color:V.t,lineHeight:1.4,marginBottom:14}}>{q.q}</div>

    {q.ty==="rating"&&<div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{q.lb.map((l,i)=>{const v=i+1;const s=val===v;return<button key={i} onClick={()=>setA(v)} style={{flex:"1 1 0",minWidth:52,padding:"9px 3px",border:s?`2px solid ${V.a}`:`1px solid ${V.bd}`,borderRadius:10,background:s?V.as:V.sf,color:s?V.a:V.t2,fontSize:11,fontWeight:s?700:500,cursor:"pointer",fontFamily:V.f,textAlign:"center"}}><div style={{fontSize:16,marginBottom:1}}>{v}</div>{l}</button>})}</div>}

    {q.ty==="single"&&<div style={{display:"flex",flexDirection:"column",gap:5}}>{q.opts.map((o,i)=>{const s=val===o;return<button key={i} onClick={()=>setA(o)} style={{padding:"10px 14px",border:s?`2px solid ${V.a}`:`1px solid ${V.bd}`,borderRadius:10,background:s?V.as:V.sf,color:s?V.a:V.t,fontSize:13,fontWeight:s?600:400,cursor:"pointer",textAlign:"left",fontFamily:V.f}}>{o}</button>})}</div>}

    {q.ty==="sel"&&<div style={{display:"flex",flexDirection:"column",gap:5}}>
      <div style={{fontSize:11,color:V.t2}}>{(val||[]).length}/{q.mx} seleccionados</div>
      {q.opts.map((o,i)=>{const arr=val||[];const s=arr.includes(o);const d=!s&&arr.length>=q.mx;return<button key={i} onClick={()=>{if(d)return;setA(s?arr.filter(x=>x!==o):[...arr,o])}} style={{padding:"10px 14px",border:s?`2px solid ${V.a}`:`1px solid ${V.bd}`,borderRadius:10,background:s?V.as:V.sf,color:d?V.t3:s?V.a:V.t,fontSize:13,cursor:d?"not-allowed":"pointer",textAlign:"left",fontFamily:V.f,opacity:d?0.4:1}}>{s?"✓ ":"○ "}{o}</button>})}
    </div>}

    {q.ty==="text"&&<TA value={val||""} onChange={setA} placeholder={q.ph} rows={3}/>}

    <div style={{display:"flex",justifyContent:"space-between",marginTop:22,gap:10}}>
      <Btn v="s" onClick={()=>setSt(Math.max(0,st-1))} disabled={st===0}>← Anterior</Btn>
      {st<SQS.length-1?<Btn onClick={()=>setSt(st+1)}>Siguiente →</Btn>:<Btn v="g" onClick={send} disabled={sub}>{sub?"Enviando...":"Enviar ✓"}</Btn>}
    </div>

    <div style={{display:"flex",justifyContent:"center",gap:3,marginTop:18,flexWrap:"wrap"}}>{SQS.map((_,i)=><button key={i} onClick={()=>setSt(i)} style={{width:8,height:8,borderRadius:"50%",border:"none",cursor:"pointer",padding:0,background:i===st?V.a:ans[SQS[i].id]!=null?V.as:V.bd}}/>)}</div>
  </div>;
}

// ═══ ROUTER ═══
export default function App(){
  const[route,setRoute]=useState(getRoute());
  useEffect(()=>{const h=()=>setRoute(getRoute());window.addEventListener("hashchange",h);return()=>window.removeEventListener("hashchange",h)},[]);
  return<div style={{minHeight:"100vh",background:V.bg,color:V.t,fontFamily:V.f}}>
    <style>{CSS}</style>
    {route==="home"&&<Home/>}
    {route==="blogpost"&&<BlogPost/>}
    {route==="admin"&&<Admin/>}
    {route==="encuesta"&&<Survey/>}
  </div>;
}
