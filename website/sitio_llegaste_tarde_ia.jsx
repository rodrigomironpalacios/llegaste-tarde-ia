import { useState, useEffect, useRef } from "react";

const BOOK_DATA = {
  title: "Llegaste Tarde a la IA",
  subtitle: "La Guía para Ponerte al Corriente y Hacerte Exitoso en Tu Carrera",
  chapters: [
    { num: "Intro", title: "Sí, Llegaste Tarde. Y Está Bien." },
    { num: "1", title: "¿Qué Es la IA? (Explicado Como Si Fueras Mi Mamá)" },
    { num: "2", title: "Tu Primera Conversación con la IA" },
    { num: "3", title: "El Arte de Pedir (Prompts para Gente Normal)" },
    { num: "4", title: "IA para Tu Área (Casos por Profesión)" },
    { num: "5", title: "Excel + IA = Tu Nuevo Superpoder" },
    { num: "6", title: "Automatiza lo Aburrido (Sin Saber Programar)" },
    { num: "7", title: "Cómo Destacar en Tu Trabajo Usando IA" },
    { num: "8", title: "Tu Plan de 30 Días para Ponerte al Corriente" },
    { num: "Final", title: "No Llegaste Tarde. Llegaste Justo a Tiempo." },
  ],
  prompts: [
    {
      id: 1,
      name: "El Correo Que No Puedes Escribir",
      chapter: 3,
      category: "Comunicación",
      icon: "✉️",
      prompt: `Actúa como un profesional de [tu área]. Necesito escribir un correo electrónico a [destinatario] para [objetivo: pedir un aumento / resolver una queja / dar seguimiento a un proyecto]. El tono debe ser profesional pero cercano. Contexto: [explica brevemente la situación]. Dame 2 versiones: una directa y una más diplomática.`,
    },
    {
      id: 2,
      name: "El Resumen Ejecutivo Exprés",
      chapter: 3,
      category: "Productividad",
      icon: "📋",
      prompt: `Eres un consultor senior. Te voy a pegar un texto largo. Necesito que lo resumas en: 1) Un párrafo ejecutivo de 3 oraciones, 2) 5 puntos clave en bullets, 3) Las acciones a tomar. Texto: [pega el texto aquí]`,
    },
    {
      id: 3,
      name: "Fórmulas de Excel Sin Dolor",
      chapter: 5,
      category: "Excel",
      icon: "📊",
      prompt: `Soy usuario de Excel nivel intermedio-bajo. Tengo una hoja de cálculo con las siguientes columnas: [describe tus columnas]. Necesito una fórmula que [describe lo que quieres lograr]. Explícamela paso a paso como si nunca hubiera usado esa función. Si es posible, dame también una alternativa más sencilla.`,
    },
    {
      id: 4,
      name: "Preparación para Junta Importante",
      chapter: 7,
      category: "Estrategia",
      icon: "🎯",
      prompt: `Voy a tener una reunión con [quién] sobre [tema]. Mi objetivo es [qué quiero lograr]. Los posibles puntos difíciles son [describe]. Ayúdame a: 1) Preparar mis 3 argumentos principales, 2) Anticipar las 3 objeciones más probables y cómo responder, 3) Escribir un resumen de una página que pueda llevar impreso.`,
    },
    {
      id: 5,
      name: "Analista de Datos Personal",
      chapter: 5,
      category: "Excel",
      icon: "📈",
      prompt: `Tengo estos datos [pega los datos o describe el dataset]. Necesito que identifiques: 1) Las tendencias principales, 2) Cualquier dato atípico o que llame la atención, 3) 3 conclusiones que pueda presentar a mi jefe. Presenta la información de forma que alguien no técnico la entienda inmediatamente.`,
    },
    {
      id: 6,
      name: "Creador de Presentaciones",
      chapter: 4,
      category: "Productividad",
      icon: "🖥️",
      prompt: `Necesito crear una presentación de [número] diapositivas sobre [tema]. La audiencia es [describe a tu audiencia]. El objetivo es [convencer / informar / capacitar]. Para cada diapositiva dame: 1) Título, 2) 3-4 puntos clave (no más), 3) Sugerencia de visual o gráfica que la acompañe. El tono debe ser [profesional / dinámico / formal].`,
    },
    {
      id: 7,
      name: "Reescritura Profesional",
      chapter: 3,
      category: "Comunicación",
      icon: "✏️",
      prompt: `Reescribe el siguiente texto para que suene más [profesional / persuasivo / claro / simple]. Mantén la idea central pero mejora la estructura y el impacto. Si encuentras errores de ortografía o gramática, corrígelos. Texto original: [pega tu texto]`,
    },
    {
      id: 8,
      name: "Plan de Proyecto Rápido",
      chapter: 6,
      category: "Estrategia",
      icon: "🗂️",
      prompt: `Soy [tu rol] en una empresa de [industria]. Necesito un plan de proyecto para [describe el proyecto]. Inclúyeme: 1) Objetivo general y objetivos específicos, 2) Fases del proyecto con duración estimada, 3) Entregables por fase, 4) Posibles riesgos y cómo mitigarlos, 5) Formato que pueda copiar a un documento o presentación.`,
    },
    {
      id: 9,
      name: "Generador de Propuestas de Valor",
      chapter: 4,
      category: "Estrategia",
      icon: "💡",
      prompt: `Mi empresa/producto/servicio es [describe brevemente]. Mi cliente ideal es [describe]. El problema principal que resolvemos es [describe]. Genera: 1) Una propuesta de valor en una oración, 2) Un elevator pitch de 30 segundos, 3) 3 puntos diferenciadores frente a la competencia, 4) Una versión para poner en mi firma de correo electrónico.`,
    },
    {
      id: 10,
      name: "Plan de Carrera Asistido",
      chapter: 8,
      category: "Carrera",
      icon: "🚀",
      prompt: `Soy [tu perfil profesional: edad, carrera, años de experiencia, puesto actual]. Mi objetivo a 2 años es [describe]. Mis fortalezas son [lista]. Mis áreas de mejora son [lista]. Con base en el mercado laboral actual en [tu país], dame: 1) Los 3 movimientos estratégicos que debería hacer en los próximos 6 meses, 2) Habilidades específicas que debería desarrollar, 3) Cómo posicionar mi perfil de LinkedIn para ese objetivo, 4) Un plan mensual de acciones concretas.`,
    },
    { id: 11, name: "Análisis de Competencia Exprés", chapter: "A", category: "Marketing", icon: "🔍",
      prompt: `Actúa como un analista de inteligencia competitiva. Voy a darte información pública sobre mi competidor [nombre]. Analiza: 1) Su propuesta de valor principal, 2) A qué público le habla, 3) Qué están haciendo bien que yo debería considerar, 4) Qué oportunidades están dejando que yo podría aprovechar. Información: [pega textos de su sitio web, redes o materiales públicos]` },
    { id: 12, name: "Script para Llamada en Frío", chapter: "A", category: "Marketing", icon: "📞",
      prompt: `Actúa como un trainer de ventas. Necesito un script para una llamada en frío de máximo 90 segundos. Vendo [producto/servicio] a [tipo de empresa]. El dolor principal de mi cliente es [describe]. Mi diferenciador es [describe]. Dame el script con: apertura que enganche, pregunta de dolor, propuesta en una oración, y cierre para agendar una reunión. Incluye 3 respuestas para objeciones comunes.` },
    { id: 13, name: "Análisis de Métricas de Campaña", chapter: "A", category: "Marketing", icon: "📊",
      prompt: `Soy gerente de marketing digital. Estos son los resultados de mi última campaña en [plataforma]: [pega métricas]. Mi objetivo era [describe]. Mi presupuesto fue [monto]. Dime: 1) ¿La campaña fue exitosa? ¿Por qué sí o no?, 2) Qué métricas están por debajo del benchmark de mi industria, 3) 3 ajustes concretos para mejorar en la siguiente campaña.` },
    { id: 14, name: "Copy para Email Marketing", chapter: "A", category: "Marketing", icon: "💌",
      prompt: `Actúa como un copywriter especializado en email marketing. Necesito un correo para [objetivo: lanzamiento / promoción / reactivación de clientes inactivos]. Mi marca es [describe]. El público es [describe]. El tono es [describe]. Dame: asunto del correo (3 opciones), preview text, cuerpo del correo (máximo 200 palabras) y CTA. Que no suene a spam y que se sienta personal.` },
    { id: 15, name: "Estrategia de Precios", chapter: "A", category: "Marketing", icon: "💰",
      prompt: `Actúa como un consultor de pricing. Mi producto/servicio es [describe]. Mis costos son aproximadamente [describe]. Mi competencia cobra entre [rango]. Mi público objetivo es [describe]. Ayúdame a: 1) Definir 3 posibles estrategias de precio, 2) Pros y contras de cada una para mi caso, 3) Cómo comunicar el precio al cliente sin que se enfoque solo en el número.` },
    { id: 16, name: "Plan de Onboarding", chapter: "A", category: "RRHH", icon: "🤝",
      prompt: `Actúa como un especialista en experiencia del empleado. Necesito un plan de onboarding para un nuevo [puesto] en una empresa de [industria, tamaño]. El onboarding debe cubrir sus primeros 30 días. Incluye: semana 1 (orientación y cultura), semana 2 (capacitación técnica), semana 3 (integración al equipo), semana 4 (primeros entregables). Para cada semana dame actividades específicas, responsable y objetivo. Formato de tabla.` },
    { id: 17, name: "Encuesta de Clima Laboral", chapter: "A", category: "RRHH", icon: "📝",
      prompt: `Actúa como un consultor de desarrollo organizacional. Necesito diseñar una encuesta de clima laboral para una empresa de [tamaño] empleados en [industria]. Las áreas que más nos preocupan son: [liderazgo / comunicación / compensación / desarrollo profesional / balance vida-trabajo]. Dame 20 preguntas usando escala Likert (1-5), organizadas por categoría, más 3 preguntas abiertas.` },
    { id: 18, name: "Guión para Conversación Difícil", chapter: "A", category: "RRHH", icon: "🗣️",
      prompt: `Actúa como un coach de liderazgo. Necesito tener una conversación difícil con un colaborador sobre [situación: bajo desempeño / actitud / puntualidad / conflicto]. Contexto: [describe la situación]. Quiero ser directo pero respetuoso. Dame: 1) Cómo abrir la conversación, 2) Puntos clave a tocar, 3) Cómo manejar si se pone defensivo, 4) Cómo cerrar con acuerdos claros.` },
    { id: 19, name: "Descripción de Puesto", chapter: "A", category: "RRHH", icon: "📄",
      prompt: `Soy de RRHH y necesito documentar el puesto de [nombre]. El ocupante reporta a [quién]. Sus responsabilidades principales son: [lista general]. Las herramientas que usa son: [lista]. Escríbeme una descripción de puesto formal con: objetivo del puesto, responsabilidades clave (6-8), requisitos de perfil, competencias necesarias, y relaciones internas.` },
    { id: 20, name: "Política Interna", chapter: "A", category: "RRHH", icon: "📋",
      prompt: `Actúa como un consultor de RRHH. Necesito redactar una política de [tema: home office / código de vestimenta / uso de IA / redes sociales / viáticos]. La empresa tiene [tamaño] empleados en [industria]. El tono debe ser claro y directo, sin jerga legal innecesaria. Incluye: objetivo de la política, alcance, lineamientos, excepciones y consecuencias. Máximo 2 páginas.` },
    { id: 21, name: "Análisis de Flujo de Efectivo", chapter: "A", category: "Finanzas", icon: "💵",
      prompt: `Actúa como un analista financiero. Te voy a dar los datos de mi flujo de efectivo de los últimos [período]. Necesito que identifiques: 1) Meses con mayor presión de liquidez, 2) Patrones estacionales, 3) Gastos que crecieron más que los ingresos, 4) Recomendaciones para mejorar el flujo en los próximos 3 meses. Datos: [pega los datos]` },
    { id: 22, name: "Presupuesto Departamental", chapter: "A", category: "Finanzas", icon: "🧮",
      prompt: `Soy [tu puesto] y necesito armar el presupuesto de mi área para [período]. El presupuesto del año pasado fue [monto] distribuido así: [categorías]. Este año espero [cambios]. Dame: 1) Estructura de presupuesto en tabla, 2) Cómo justificar cada línea ante finanzas, 3) Dónde podría negociar más presupuesto, 4) Gastos que podría recortar sin impacto operativo.` },
    { id: 23, name: "Explicación de Estados Financieros", chapter: "A", category: "Finanzas", icon: "📊",
      prompt: `Actúa como un director de finanzas que sabe comunicar con claridad. Voy a darte los números clave de nuestro [estado de resultados / balance general]. Necesito una explicación de máximo 300 palabras dirigida a [gerentes de área / equipo comercial / consejo] que responda: ¿cómo nos fue?, ¿por qué?, ¿qué sigue? Usa analogías simples si es necesario. Datos: [pega los números clave]` },
    { id: 24, name: "Checklist de Cierre Mensual", chapter: "A", category: "Finanzas", icon: "✅",
      prompt: `Actúa como un controller financiero. Necesito crear un checklist de cierre mensual para el área de contabilidad de una empresa [tamaño] en [industria] en México. Incluye: actividades previas al cierre, actividades del cierre, conciliaciones necesarias, revisiones de control, y entregables finales con fecha límite relativa. Formato de tabla.` },
    { id: 25, name: "Rentabilidad por Producto", chapter: "A", category: "Finanzas", icon: "📈",
      prompt: `Tengo [X] productos/servicios con los siguientes datos de ingresos y costos: [pega datos]. Necesito un análisis de rentabilidad que incluya: 1) Margen bruto y neto por producto, 2) Ranking de más a menos rentable, 3) Productos por debajo del margen mínimo de [X%], 4) Recomendaciones: ¿cuáles potenciar, cuáles replantear, cuáles descontinuar?` },
    { id: 26, name: "Comparativa de Cláusulas", chapter: "A", category: "Legal", icon: "⚖️",
      prompt: `Actúa como un abogado corporativo. Te voy a dar dos versiones de [tipo de cláusula] de un contrato. Compáralas e identifica: 1) Diferencias clave, 2) Cuál favorece más a cada parte, 3) Riesgos de cada versión, 4) Sugerencia de redacción que equilibre los intereses. Versión A: [pega]. Versión B: [pega]. NOTA: Verificaré todo antes de usar.` },
    { id: 27, name: "Resumen de Nueva Regulación", chapter: "A", category: "Legal", icon: "📜",
      prompt: `Actúa como un abogado especializado en [área] en México. Te voy a pegar el texto de una nueva disposición regulatoria. Necesito: 1) Resumen en 5 puntos clave, 2) ¿A quién le aplica?, 3) ¿Qué tenemos que hacer para cumplir?, 4) Fechas límite importantes, 5) Sanciones por incumplimiento. Texto: [pega]. NOTA: Validaré contra fuente oficial.` },
    { id: 28, name: "Modelo de Negocio Canvas", chapter: "A", category: "Emprendimiento", icon: "🧩",
      prompt: `Actúa como un mentor de startups. Mi idea de negocio es [describe]. Ayúdame a llenar un Business Model Canvas simplificado con los 9 bloques: segmento de clientes, propuesta de valor, canales, relación con clientes, fuentes de ingresos, recursos clave, actividades clave, socios clave, estructura de costos. Para cada bloque dame 1-2 oraciones. Después dime cuál es el bloque más débil.` },
    { id: 29, name: "Plan Financiero para Emprendedor", chapter: "A", category: "Emprendimiento", icon: "📐",
      prompt: `Voy a emprender [describe tu negocio]. Mi inversión inicial es [monto]. Mis costos fijos mensuales estimados: [lista]. Mi precio de venta: [monto] por [unidad]. Calcúlame: 1) Punto de equilibrio, 2) Proyección a 6 y 12 meses (optimista, realista, pesimista), 3) Meses de "colchón" antes de ser rentable, 4) Los 3 gastos que probablemente estoy subestimando.` },
    { id: 30, name: "Automatización de Atención al Cliente", chapter: "A", category: "Emprendimiento", icon: "🤖",
      prompt: `Tengo un negocio de [describe] y recibo [cantidad] consultas al día por [canales]. Las preguntas más frecuentes son: [lista 5-7]. Ayúdame a: 1) Redactar respuestas predefinidas para cada una (tono cercano, no robótico), 2) Diseñar un flujo de "si pregunta X, responde Y", 3) Identificar cuándo debe intervenir un humano, 4) Sugerir una herramienta gratuita para implementar esto.` },
  ],
  glossary: [
    { term: "Prompt", def: "La instrucción o pregunta que le das a la IA. Entre mejor sea tu prompt, mejor será la respuesta." },
    { term: "IA Generativa", def: "Inteligencia artificial que crea contenido nuevo: texto, imágenes, audio, video." },
    { term: "LLM", def: "Large Language Model — el \"cerebro\" detrás de ChatGPT, Claude y similares." },
    { term: "Alucinación", def: "Cuando la IA inventa información falsa pero te la presenta como verdadera." },
    { term: "Token", def: "Unidad de medida de texto para la IA. Una palabra ≈ 1-2 tokens." },
    { term: "Contexto", def: "La cantidad de información que la IA puede \"recordar\" dentro de una conversación." },
    { term: "Modelo", def: "La versión específica de IA (ej. GPT-4, Claude Sonnet). Diferentes capacidades." },
    { term: "Fine-tuning", def: "Personalizar un modelo de IA con datos específicos de tu empresa o industria." },
    { term: "API", def: "Forma en que programadores conectan herramientas de IA con otros sistemas." },
    { term: "Automatización", def: "Hacer que una tarea se ejecute sola, sin intervención humana cada vez." },
    { term: "No-code", def: "Herramientas para crear automatizaciones sin escribir código (Zapier, Make, etc.)." },
    { term: "Chatbot", def: "Programa que conversa contigo. ChatGPT es un chatbot avanzado." },
    { term: "Machine Learning", def: "Tipo de IA que aprende de datos para descubrir patrones por sí sola." },
    { term: "Sesgo (Bias)", def: "Prejuicios en la IA basados en los datos con los que fue entrenada." },
    { term: "Copilot", def: "IA que te acompaña mientras trabajas, sugiriendo en tiempo real." },
    { term: "Agente (Agent)", def: "IA que ejecuta secuencias de tareas de forma autónoma, no solo responde." },
    { term: "RAG", def: "Técnica donde la IA consulta documentos específicos antes de responder." },
    { term: "Temperatura", def: "Parámetro que controla qué tan creativa (alta) o precisa (baja) es la IA." },
    { term: "Few-shot prompting", def: "Darle 2-3 ejemplos del resultado deseado antes de pedirle uno nuevo." },
    { term: "Chain of thought", def: "Pedirle a la IA que piense paso a paso antes de dar su respuesta final." },
    { term: "Multimodal", def: "IA que procesa y genera texto, imágenes, audio y video." },
    { term: "System prompt", def: "Instrucciones iniciales que definen cómo debe comportarse la IA." },
    { term: "GPT personalizado", def: "Versión de ChatGPT configurada para una tarea específica con instrucciones propias." },
    { term: "Guardrails", def: "Reglas y filtros para evitar que la IA genere contenido dañino o fuera de política." },
  ],
};

const CATEGORIES = ["Todos", "Comunicación", "Productividad", "Excel", "Estrategia", "Carrera", "Marketing", "RRHH", "Finanzas", "Legal", "Emprendimiento"];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button onClick={handleCopy} style={{
      background: copied ? "#22c55e" : "var(--accent)",
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "10px 24px",
      fontSize: 14,
      fontWeight: 700,
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontFamily: "'DM Sans', sans-serif",
      letterSpacing: "0.02em",
    }}>
      {copied ? "✓ ¡Copiado!" : "Copiar Prompt"}
    </button>
  );
}

function PromptCard({ prompt, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: "var(--card-bg)",
      borderRadius: 16,
      border: "1px solid var(--border)",
      overflow: "hidden",
      transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
      animationDelay: `${index * 60}ms`,
      animation: "fadeUp 0.5s ease forwards",
      opacity: 0,
    }}>
      <div onClick={() => setOpen(!open)} style={{
        padding: "20px 24px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 16,
        userSelect: "none",
      }}>
        <span style={{ fontSize: 28 }}>{prompt.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 17,
            color: "var(--text-primary)",
            lineHeight: 1.3,
          }}>
            #{prompt.id} — {prompt.name}
          </div>
          <div style={{
            display: "flex",
            gap: 8,
            marginTop: 6,
            flexWrap: "wrap",
          }}>
            <span style={{
              background: "var(--tag-bg)",
              color: "var(--accent)",
              fontSize: 11,
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: 20,
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}>{prompt.category}</span>
            <span style={{
              background: "var(--tag-bg-alt)",
              color: "var(--text-secondary)",
              fontSize: 11,
              fontWeight: 600,
              padding: "3px 10px",
              borderRadius: 20,
              fontFamily: "'DM Sans', sans-serif",
            }}>Cap. {prompt.chapter}</span>
          </div>
        </div>
        <span style={{
          fontSize: 20,
          color: "var(--text-secondary)",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.3s ease",
        }}>▾</span>
      </div>
      {open && (
        <div style={{
          padding: "0 24px 20px 24px",
          animation: "fadeIn 0.3s ease",
        }}>
          <div style={{
            background: "var(--code-bg)",
            borderRadius: 12,
            padding: 20,
            fontFamily: "'DM Mono', 'Fira Code', monospace",
            fontSize: 13.5,
            lineHeight: 1.7,
            color: "var(--text-primary)",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            border: "1px solid var(--border)",
            marginBottom: 14,
          }}>
            {prompt.prompt}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <CopyButton text={prompt.prompt} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("prompts");
  const [filter, setFilter] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = BOOK_DATA.prompts.filter((p) => {
    const matchCat = filter === "Todos" || p.category === filter;
    const matchSearch = searchTerm === "" ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.prompt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{
      "--accent": "#f97316",
      "--accent-glow": "rgba(249,115,22,0.15)",
      "--bg": "#0c0c0f",
      "--bg-secondary": "#131318",
      "--card-bg": "#18181f",
      "--code-bg": "#111116",
      "--border": "#2a2a35",
      "--text-primary": "#f0ede6",
      "--text-secondary": "#8a8a9a",
      "--tag-bg": "rgba(249,115,22,0.12)",
      "--tag-bg-alt": "rgba(255,255,255,0.06)",
      "--nav-bg": "rgba(12,12,15,0.85)",
      minHeight: "100vh",
      background: "var(--bg)",
      color: "var(--text-primary)",
      fontFamily: "'DM Sans', sans-serif",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0c0c0f; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        ::selection { background: rgba(249,115,22,0.3); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
      `}</style>

      {/* HERO */}
      <div style={{
        position: "relative",
        padding: "80px 24px 60px",
        textAlign: "center",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: -120,
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{
          display: "inline-block",
          background: "var(--accent-glow)",
          border: "1px solid rgba(249,115,22,0.25)",
          borderRadius: 40,
          padding: "6px 20px",
          fontSize: 12,
          fontWeight: 700,
          color: "var(--accent)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: 28,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          <span style={{ animation: "pulse 2s infinite", marginRight: 6 }}>●</span>
          Recurso Companion del Libro
        </div>

        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(32px, 6vw, 56px)",
          fontWeight: 700,
          lineHeight: 1.1,
          color: "var(--text-primary)",
          maxWidth: 700,
          margin: "0 auto 16px",
        }}>
          Llegaste Tarde<br />
          <span style={{
            background: "linear-gradient(135deg, #f97316, #fb923c, #fbbf24)",
            backgroundSize: "200% 200%",
            animation: "gradientShift 4s ease infinite",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>a la IA</span>
        </h1>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(15px, 2.5vw, 18px)",
          color: "var(--text-secondary)",
          maxWidth: 520,
          margin: "0 auto 40px",
          lineHeight: 1.6,
        }}>
          Todos los prompts, el glosario y los recursos del libro — listos para copiar, pegar y usar hoy mismo. 40 prompts organizados por capítulo y profesión.
        </p>

        {/* NAV */}
        <div style={{
          display: "inline-flex",
          background: "var(--bg-secondary)",
          borderRadius: 14,
          padding: 4,
          gap: 4,
          border: "1px solid var(--border)",
        }}>
          {[
            { key: "prompts", label: "Prompts Mágicos", icon: "⚡" },
            { key: "chapters", label: "Capítulos", icon: "📖" },
            { key: "glossary", label: "Glosario", icon: "📚" },
          ].map((tab) => (
            <button key={tab.key} onClick={() => setActiveSection(tab.key)} style={{
              background: activeSection === tab.key ? "var(--accent)" : "transparent",
              color: activeSection === tab.key ? "#fff" : "var(--text-secondary)",
              border: "none",
              borderRadius: 10,
              padding: "10px 20px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.2s ease",
              whiteSpace: "nowrap",
            }}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "0 20px 80px",
      }}>

        {/* === PROMPTS SECTION === */}
        {activeSection === "prompts" && (
          <div>
            {/* Search */}
            <div style={{
              position: "relative",
              marginBottom: 20,
            }}>
              <span style={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 18,
                color: "var(--text-secondary)",
                pointerEvents: "none",
              }}>🔍</span>
              <input
                type="text"
                placeholder="Buscar prompts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  background: "var(--card-bg)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: "14px 16px 14px 48px",
                  fontSize: 15,
                  color: "var(--text-primary)",
                  fontFamily: "'DM Sans', sans-serif",
                  outline: "none",
                }}
              />
            </div>

            {/* Category filters */}
            <div style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 28,
            }}>
              {CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => setFilter(cat)} style={{
                  background: filter === cat ? "var(--accent)" : "var(--card-bg)",
                  color: filter === cat ? "#fff" : "var(--text-secondary)",
                  border: filter === cat ? "none" : "1px solid var(--border)",
                  borderRadius: 10,
                  padding: "8px 18px",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "all 0.2s ease",
                }}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Prompt count */}
            <p style={{
              fontSize: 13,
              color: "var(--text-secondary)",
              marginBottom: 16,
              fontWeight: 500,
            }}>
              {filtered.length} prompt{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
            </p>

            {/* Prompt cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {filtered.map((p, i) => (
                <PromptCard key={p.id} prompt={p} index={i} />
              ))}
              {filtered.length === 0 && (
                <div style={{
                  textAlign: "center",
                  padding: 60,
                  color: "var(--text-secondary)",
                  fontSize: 15,
                }}>
                  No se encontraron prompts con ese filtro. Intenta otro término.
                </div>
              )}
            </div>
          </div>
        )}

        {/* === CHAPTERS SECTION === */}
        {activeSection === "chapters" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <p style={{
              fontSize: 14,
              color: "var(--text-secondary)",
              marginBottom: 24,
              lineHeight: 1.6,
            }}>
              Estructura completa del libro. Cada capítulo está diseñado para leerse en 15-20 minutos y darte herramientas accionables desde el día uno.
            </p>
            {BOOK_DATA.chapters.map((ch, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: "20px 0",
                borderBottom: i < BOOK_DATA.chapters.length - 1 ? "1px solid var(--border)" : "none",
                animation: "fadeUp 0.4s ease forwards",
                animationDelay: `${i * 50}ms`,
                opacity: 0,
              }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: i === 0 || i === BOOK_DATA.chapters.length - 1
                    ? "var(--accent-glow)"
                    : "var(--card-bg)",
                  border: `1px solid ${i === 0 || i === BOOK_DATA.chapters.length - 1
                    ? "rgba(249,115,22,0.3)"
                    : "var(--border)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  color: i === 0 || i === BOOK_DATA.chapters.length - 1
                    ? "var(--accent)"
                    : "var(--text-secondary)",
                  flexShrink: 0,
                }}>
                  {ch.num === "Intro" ? "→" : ch.num === "Final" ? "★" : ch.num}
                </div>
                <div>
                  <div style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--text-secondary)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 4,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    {ch.num === "Intro" ? "Introducción" : ch.num === "Final" ? "Conclusión" : `Capítulo ${ch.num}`}
                  </div>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    lineHeight: 1.3,
                  }}>
                    {ch.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* === GLOSSARY SECTION === */}
        {activeSection === "glossary" && (
          <div>
            <p style={{
              fontSize: 14,
              color: "var(--text-secondary)",
              marginBottom: 24,
              lineHeight: 1.6,
            }}>
              Los 15 términos esenciales del Capítulo 1 más 10 términos avanzados del Apéndice D. Todo lo que necesitas para sobrevivir cualquier conversación sobre IA.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {BOOK_DATA.glossary.map((item, i) => (
                <div key={i} style={{
                  background: "var(--card-bg)",
                  borderRadius: 14,
                  padding: "18px 22px",
                  border: "1px solid var(--border)",
                  animation: "fadeUp 0.4s ease forwards",
                  animationDelay: `${i * 40}ms`,
                  opacity: 0,
                }}>
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    color: "var(--accent)",
                  }}>{item.term}</span>
                  <span style={{
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    marginLeft: 10,
                    lineHeight: 1.6,
                  }}>{item.def}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{
          marginTop: 80,
          textAlign: "center",
          padding: "40px 0",
          borderTop: "1px solid var(--border)",
        }}>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 18,
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: 8,
          }}>
            ¿Todavía no tienes el libro?
          </p>
          <p style={{
            fontSize: 14,
            color: "var(--text-secondary)",
            marginBottom: 24,
            lineHeight: 1.6,
          }}>
            Estos prompts son solo una probadita. El libro tiene contexto, ejemplos y el framework completo para que la IA trabaje para ti.
          </p>
          <div style={{
            fontSize: 12,
            color: "var(--text-secondary)",
            marginTop: 40,
            opacity: 0.5,
          }}>
            © 2025 — Llegaste Tarde a la IA. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </div>
  );
}
