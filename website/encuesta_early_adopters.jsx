import { useState, useEffect, useCallback } from "react";

const SURVEY_VERSION = "v1";

const QUESTIONS = [
  {
    id: "q1",
    section: "Primera Impresión",
    type: "rating",
    question: "¿Qué tan identificado te sentiste con la escena de la introducción (la junta donde nadie sabe de IA)?",
    labels: ["Nada", "Poco", "Algo", "Mucho", "Totalmente"],
  },
  {
    id: "q2",
    section: "Primera Impresión",
    type: "rating",
    question: "¿El título 'Llegaste Tarde a la IA' te motivó a leer o te generó ansiedad?",
    labels: ["Solo ansiedad", "Más ansiedad que motivación", "Neutro", "Más motivación que ansiedad", "Pura motivación"],
  },
  {
    id: "q3",
    section: "Contenido",
    type: "rating",
    question: "¿Qué tan claro fue el Capítulo 1 para entender qué es la IA sin sentirte abrumado?",
    labels: ["Confuso", "Algo confuso", "Aceptable", "Claro", "Muy claro"],
  },
  {
    id: "q4",
    section: "Contenido",
    type: "rating",
    question: "¿El framework ROCA (Rol, Objetivo, Contexto, Acción) te pareció fácil de entender y usar?",
    labels: ["Muy difícil", "Difícil", "Regular", "Fácil", "Muy fácil"],
  },
  {
    id: "q5",
    section: "Contenido",
    type: "multi_select",
    question: "¿Cuáles capítulos te parecieron MÁS útiles? (Selecciona hasta 3)",
    max: 3,
    options: [
      "Cap 1 — ¿Qué es la IA?",
      "Cap 2 — Tu Primera Conversación",
      "Cap 3 — El Arte de Pedir (ROCA)",
      "Cap 4 — IA para Tu Área",
      "Cap 5 — Excel + IA",
      "Cap 6 — Automatiza lo Aburrido",
      "Cap 7 — Cómo Destacar en Tu Trabajo",
      "Cap 8 — Plan de 30 Días",
    ],
  },
  {
    id: "q6",
    section: "Contenido",
    type: "multi_select",
    question: "¿Cuáles capítulos sentiste que les faltó más profundidad? (Selecciona los que apliquen)",
    max: 8,
    options: [
      "Cap 1 — ¿Qué es la IA?",
      "Cap 2 — Tu Primera Conversación",
      "Cap 3 — El Arte de Pedir (ROCA)",
      "Cap 4 — IA para Tu Área",
      "Cap 5 — Excel + IA",
      "Cap 6 — Automatiza lo Aburrido",
      "Cap 7 — Cómo Destacar en Tu Trabajo",
      "Cap 8 — Plan de 30 Días",
      "Ninguno — todos estuvieron bien",
    ],
  },
  {
    id: "q7",
    section: "Tono y Estilo",
    type: "rating",
    question: "¿El tono del libro (conversacional, con humor ligero) te pareció adecuado para el tema?",
    labels: ["Nada adecuado", "Poco adecuado", "Aceptable", "Adecuado", "Perfecto"],
  },
  {
    id: "q8",
    section: "Tono y Estilo",
    type: "single_select",
    question: "Si tuvieras que describir el tono del libro en una palabra, ¿cuál sería?",
    options: ["Amigable", "Motivador", "Práctico", "Condescendiente", "Superficial", "Profesional", "Divertido"],
  },
  {
    id: "q9",
    section: "Tono y Estilo",
    type: "rating",
    question: "¿La extensión del libro te pareció adecuada?",
    labels: ["Muy corto", "Algo corto", "Perfecto", "Algo largo", "Muy largo"],
  },
  {
    id: "q10",
    section: "Prompts y Herramientas",
    type: "rating",
    question: "¿Qué tan útiles te parecieron los prompts incluidos en el libro?",
    labels: ["Inútiles", "Poco útiles", "Algo útiles", "Útiles", "Muy útiles"],
  },
  {
    id: "q11",
    section: "Prompts y Herramientas",
    type: "single_select",
    question: "¿Probaste alguno de los prompts del libro durante o después de leerlo?",
    options: ["Sí, varios", "Sí, uno o dos", "No, pero pienso hacerlo", "No, y no creo que lo haga"],
  },
  {
    id: "q12",
    section: "Prompts y Herramientas",
    type: "rating",
    question: "¿Qué tan útil te pareció el sitio web companion (donde están los prompts para copiar)?",
    labels: ["No lo vi", "Poco útil", "Algo útil", "Útil", "Muy útil"],
  },
  {
    id: "q13",
    section: "Impacto Profesional",
    type: "single_select",
    question: "Después de leer el libro, ¿cómo cambió tu nivel de confianza para usar IA en tu trabajo?",
    options: ["Sigo igual de inseguro", "Un poco más confiado", "Bastante más confiado", "Me siento listo para usarla diario", "Ya la estoy usando gracias al libro"],
  },
  {
    id: "q14",
    section: "Impacto Profesional",
    type: "rating",
    question: "Del 1 al 5, ¿qué tan probable es que recomiendes este libro a un compañero de trabajo?",
    labels: ["Nada probable", "Poco probable", "Tal vez", "Probable", "Seguro lo recomiendo"],
  },
  {
    id: "q15",
    section: "Impacto Profesional",
    type: "single_select",
    question: "¿Cuánto pagarías por este libro?",
    options: ["Menos de $99 MXN", "$99–$149 MXN", "$149–$199 MXN", "$199–$299 MXN", "Más de $299 MXN"],
  },
  {
    id: "q16",
    section: "Sobre Ti",
    type: "single_select",
    question: "¿En qué área trabajas?",
    options: ["Marketing / Comunicación", "Ventas / Comercial", "RRHH / Talento", "Finanzas / Contabilidad", "Legal", "Administración / Gerencia", "Emprendimiento propio", "TI / Sistemas", "Otra"],
  },
  {
    id: "q17",
    section: "Sobre Ti",
    type: "single_select",
    question: "¿Cuál era tu nivel de experiencia con IA ANTES de leer el libro?",
    options: ["Nunca la había usado", "La probé una o dos veces", "La uso de vez en cuando", "La uso frecuentemente"],
  },
  {
    id: "q18",
    section: "Retroalimentación Abierta",
    type: "text",
    question: "¿Qué fue lo que MÁS te gustó del libro?",
    placeholder: "Lo que más me gustó fue...",
  },
  {
    id: "q19",
    section: "Retroalimentación Abierta",
    type: "text",
    question: "¿Qué le cambiarías o le agregarías al libro?",
    placeholder: "Yo cambiaría o agregaría...",
  },
  {
    id: "q20",
    section: "Retroalimentación Abierta",
    type: "text",
    question: "¿Hay algún tema sobre IA que esperabas encontrar y no estaba?",
    placeholder: "Me hubiera gustado leer sobre...",
  },
];

const SECTIONS = [...new Set(QUESTIONS.map((q) => q.section))];

function RatingInput({ question, value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 12 }}>
      {question.labels.map((label, i) => {
        const val = i + 1;
        const selected = value === val;
        return (
          <button key={i} onClick={() => onChange(val)} style={{
            flex: "1 1 0",
            minWidth: 56,
            padding: "10px 4px",
            border: selected ? "2px solid var(--accent)" : "1px solid var(--border)",
            borderRadius: 10,
            background: selected ? "var(--accent-soft)" : "var(--surface)",
            color: selected ? "var(--accent)" : "var(--text-dim)",
            fontSize: 12,
            fontWeight: selected ? 700 : 500,
            cursor: "pointer",
            transition: "all 0.15s ease",
            fontFamily: "inherit",
            lineHeight: 1.3,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 18, marginBottom: 2 }}>{val}</div>
            {label}
          </button>
        );
      })}
    </div>
  );
}

function SingleSelect({ question, value, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
      {question.options.map((opt, i) => {
        const selected = value === opt;
        return (
          <button key={i} onClick={() => onChange(opt)} style={{
            padding: "11px 16px",
            border: selected ? "2px solid var(--accent)" : "1px solid var(--border)",
            borderRadius: 10,
            background: selected ? "var(--accent-soft)" : "var(--surface)",
            color: selected ? "var(--accent)" : "var(--text-main)",
            fontSize: 14,
            fontWeight: selected ? 600 : 400,
            cursor: "pointer",
            textAlign: "left",
            fontFamily: "inherit",
            transition: "all 0.15s ease",
          }}>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function MultiSelect({ question, value = [], onChange }) {
  const toggle = (opt) => {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt));
    } else if (value.length < question.max) {
      onChange([...value, opt]);
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
      <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 2 }}>
        {value.length}/{question.max} seleccionados
      </div>
      {question.options.map((opt, i) => {
        const selected = value.includes(opt);
        const disabled = !selected && value.length >= question.max;
        return (
          <button key={i} onClick={() => !disabled && toggle(opt)} style={{
            padding: "11px 16px",
            border: selected ? "2px solid var(--accent)" : "1px solid var(--border)",
            borderRadius: 10,
            background: selected ? "var(--accent-soft)" : "var(--surface)",
            color: disabled ? "var(--text-disabled)" : selected ? "var(--accent)" : "var(--text-main)",
            fontSize: 14,
            fontWeight: selected ? 600 : 400,
            cursor: disabled ? "not-allowed" : "pointer",
            textAlign: "left",
            fontFamily: "inherit",
            transition: "all 0.15s ease",
            opacity: disabled ? 0.4 : 1,
          }}>
            <span style={{ marginRight: 8 }}>{selected ? "✓" : "○"}</span>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function TextInput({ question, value, onChange }) {
  return (
    <textarea
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={question.placeholder}
      rows={3}
      style={{
        width: "100%",
        marginTop: 12,
        padding: 14,
        border: "1px solid var(--border)",
        borderRadius: 10,
        background: "var(--surface)",
        color: "var(--text-main)",
        fontSize: 14,
        fontFamily: "inherit",
        resize: "vertical",
        outline: "none",
        lineHeight: 1.5,
      }}
    />
  );
}

function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: "var(--text-dim)", fontWeight: 600 }}>
          Pregunta {current} de {total}
        </span>
        <span style={{ fontSize: 13, color: "var(--accent)", fontWeight: 700 }}>{pct}%</span>
      </div>
      <div style={{ height: 6, background: "var(--border)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${pct}%`,
          background: "var(--accent)",
          borderRadius: 3,
          transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)",
        }} />
      </div>
    </div>
  );
}

function ResultsDashboard({ responses }) {
  if (!responses || responses.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: 60, color: "var(--text-dim)" }}>
        Aún no hay respuestas registradas.
      </div>
    );
  }

  const avg = (qid) => {
    const vals = responses.map((r) => r[qid]).filter((v) => typeof v === "number");
    return vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : "—";
  };

  const dist = (qid) => {
    const vals = responses.map((r) => r[qid]).filter(Boolean);
    const counts = {};
    vals.forEach((v) => {
      const key = Array.isArray(v) ? v.join(", ") : v;
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  };

  const nps = () => {
    const vals = responses.map((r) => r.q14).filter((v) => typeof v === "number");
    if (!vals.length) return "—";
    const promoters = vals.filter((v) => v >= 4).length;
    const detractors = vals.filter((v) => v <= 2).length;
    return Math.round(((promoters - detractors) / vals.length) * 100);
  };

  const ratingQs = QUESTIONS.filter((q) => q.type === "rating");
  const selectQs = QUESTIONS.filter((q) => q.type === "single_select" || q.type === "multi_select");
  const textQs = QUESTIONS.filter((q) => q.type === "text");

  return (
    <div>
      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 32 }}>
        {[
          { label: "Respuestas", value: responses.length, color: "var(--accent)" },
          { label: "NPS Score", value: nps(), color: nps() >= 50 ? "#22c55e" : nps() >= 0 ? "#eab308" : "#ef4444" },
          { label: "Claridad Cap 1", value: avg("q3") + "/5", color: "var(--text-main)" },
          { label: "Recomendaría", value: avg("q14") + "/5", color: "var(--text-main)" },
        ].map((card, i) => (
          <div key={i} style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            padding: "18px 16px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: card.color, fontFamily: "'Outfit', sans-serif" }}>
              {card.value}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 4, fontWeight: 500 }}>
              {card.label}
            </div>
          </div>
        ))}
      </div>

      {/* Rating averages */}
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-main)", marginBottom: 16, fontFamily: "'Outfit', sans-serif" }}>
        Promedios por pregunta
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32 }}>
        {ratingQs.map((q) => {
          const a = parseFloat(avg(q.id)) || 0;
          return (
            <div key={q.id} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ fontSize: 13, color: "var(--text-dim)", marginBottom: 8, lineHeight: 1.4 }}>{q.question}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ flex: 1, height: 8, background: "var(--border)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(a / 5) * 100}%`, background: a >= 4 ? "#22c55e" : a >= 3 ? "#eab308" : "#ef4444", borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 16, fontWeight: 800, color: "var(--text-main)", minWidth: 36, textAlign: "right", fontFamily: "'Outfit', sans-serif" }}>
                  {avg(q.id)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Select distributions */}
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-main)", marginBottom: 16, fontFamily: "'Outfit', sans-serif" }}>
        Distribución de respuestas
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
        {selectQs.map((q) => {
          const d = dist(q.id);
          const maxCount = d.length ? d[0][1] : 1;
          return (
            <div key={q.id} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ fontSize: 13, color: "var(--text-dim)", marginBottom: 10, lineHeight: 1.4 }}>{q.question}</div>
              {d.slice(0, 6).map(([val, count], i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
                  <div style={{ flex: 1, fontSize: 13, color: "var(--text-main)", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{val}</div>
                  <div style={{ width: 80, height: 6, background: "var(--border)", borderRadius: 3, overflow: "hidden", flexShrink: 0 }}>
                    <div style={{ height: "100%", width: `${(count / maxCount) * 100}%`, background: "var(--accent)", borderRadius: 3 }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-dim)", minWidth: 20, textAlign: "right" }}>{count}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Open responses */}
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-main)", marginBottom: 16, fontFamily: "'Outfit', sans-serif" }}>
        Respuestas abiertas
      </h3>
      {textQs.map((q) => {
        const texts = responses.map((r) => r[q.id]).filter((t) => t && t.trim());
        return (
          <div key={q.id} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 16px", marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: "var(--accent)", marginBottom: 10, fontWeight: 600 }}>{q.question}</div>
            {texts.length === 0 ? (
              <div style={{ fontSize: 13, color: "var(--text-disabled)", fontStyle: "italic" }}>Sin respuestas aún</div>
            ) : (
              texts.map((t, i) => (
                <div key={i} style={{
                  fontSize: 13,
                  color: "var(--text-main)",
                  padding: "8px 12px",
                  background: "var(--bg)",
                  borderRadius: 8,
                  marginBottom: 6,
                  lineHeight: 1.5,
                  borderLeft: "3px solid var(--border)",
                }}>
                  "{t}"
                </div>
              ))
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function SurveyApp() {
  const [view, setView] = useState("survey"); // survey | thanks | results
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [allResponses, setAllResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const check = await window.storage.get("survey-submitted");
        if (check && check.value === "true") setSubmitted(true);
      } catch {}
      setLoading(false);
    })();
  }, []);

  const loadResults = useCallback(async () => {
    try {
      const keys = await window.storage.list("response:", true);
      if (keys && keys.keys && keys.keys.length > 0) {
        const all = [];
        for (const key of keys.keys) {
          try {
            const r = await window.storage.get(key, true);
            if (r && r.value) all.push(JSON.parse(r.value));
          } catch {}
        }
        setAllResponses(all);
      }
    } catch {}
  }, []);

  const setAnswer = (qid, val) => setAnswers((prev) => ({ ...prev, [qid]: val }));

  const currentQ = QUESTIONS[step];
  const currentSection = currentQ?.section;
  const isAnswered = answers[currentQ?.id] !== undefined && answers[currentQ?.id] !== "" && 
    (!Array.isArray(answers[currentQ?.id]) || answers[currentQ?.id].length > 0);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const id = `response:${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const payload = { ...answers, _ts: new Date().toISOString(), _version: SURVEY_VERSION };
      await window.storage.set(id, JSON.stringify(payload), true);
      await window.storage.set("survey-submitted", "true");
      setSubmitted(true);
      setView("thanks");
    } catch (e) {
      console.error("Error saving:", e);
      alert("Hubo un error guardando tu respuesta. Intenta de nuevo.");
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div style={{ ...rootStyle, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <style>{globalCSS}</style>
        <div style={{ color: "var(--text-dim)", fontSize: 15 }}>Cargando...</div>
      </div>
    );
  }

  return (
    <div style={rootStyle}>
      <style>{globalCSS}</style>

      {/* Header */}
      <div style={{ padding: "40px 24px 20px", textAlign: "center" }}>
        <div style={{
          display: "inline-block",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--accent)",
          background: "var(--accent-soft)",
          padding: "5px 14px",
          borderRadius: 20,
          marginBottom: 20,
        }}>
          Early Adopter Feedback
        </div>
        <h1 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "clamp(24px, 5vw, 36px)",
          fontWeight: 800,
          color: "var(--text-main)",
          lineHeight: 1.15,
          marginBottom: 8,
        }}>
          Llegaste Tarde a la IA
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-dim)", maxWidth: 420, margin: "0 auto", lineHeight: 1.5 }}>
          {view === "results"
            ? "Dashboard de resultados agregados"
            : "Tu opinión nos ayuda a hacer un mejor libro. Son 20 preguntas, ~5 minutos."}
        </p>

        {/* Nav tabs */}
        <div style={{ display: "inline-flex", gap: 4, marginTop: 20, background: "var(--surface)", borderRadius: 10, padding: 3, border: "1px solid var(--border)" }}>
          {[
            { key: "survey", label: "Encuesta" },
            { key: "results", label: "Resultados" },
          ].map((tab) => (
            <button key={tab.key} onClick={() => { setView(tab.key); if (tab.key === "results") loadResults(); }} style={{
              background: view === tab.key ? "var(--accent)" : "transparent",
              color: view === tab.key ? "#fff" : "var(--text-dim)",
              border: "none",
              borderRadius: 8,
              padding: "8px 20px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 20px 80px" }}>

        {/* === SURVEY === */}
        {view === "survey" && !submitted && (
          <div>
            <ProgressBar current={step + 1} total={QUESTIONS.length} />

            {/* Section label */}
            <div style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 8,
            }}>
              {currentSection}
            </div>

            {/* Question */}
            <div style={{
              fontSize: 17,
              fontWeight: 600,
              color: "var(--text-main)",
              lineHeight: 1.45,
              marginBottom: 4,
              fontFamily: "'Outfit', sans-serif",
            }}>
              {currentQ.question}
            </div>

            {/* Input */}
            {currentQ.type === "rating" && <RatingInput question={currentQ} value={answers[currentQ.id]} onChange={(v) => setAnswer(currentQ.id, v)} />}
            {currentQ.type === "single_select" && <SingleSelect question={currentQ} value={answers[currentQ.id]} onChange={(v) => setAnswer(currentQ.id, v)} />}
            {currentQ.type === "multi_select" && <MultiSelect question={currentQ} value={answers[currentQ.id] || []} onChange={(v) => setAnswer(currentQ.id, v)} />}
            {currentQ.type === "text" && <TextInput question={currentQ} value={answers[currentQ.id]} onChange={(v) => setAnswer(currentQ.id, v)} />}

            {/* Navigation */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, gap: 12 }}>
              <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{
                padding: "12px 24px",
                border: "1px solid var(--border)",
                borderRadius: 10,
                background: "transparent",
                color: step === 0 ? "var(--text-disabled)" : "var(--text-dim)",
                fontSize: 14,
                fontWeight: 600,
                cursor: step === 0 ? "not-allowed" : "pointer",
                fontFamily: "inherit",
              }}>
                ← Anterior
              </button>

              {step < QUESTIONS.length - 1 ? (
                <button onClick={() => setStep(step + 1)} style={{
                  padding: "12px 24px",
                  border: "none",
                  borderRadius: 10,
                  background: isAnswered ? "var(--accent)" : "var(--border)",
                  color: isAnswered ? "#fff" : "var(--text-disabled)",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.2s ease",
                }}>
                  Siguiente →
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={submitting} style={{
                  padding: "12px 28px",
                  border: "none",
                  borderRadius: 10,
                  background: "#22c55e",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: submitting ? "wait" : "pointer",
                  fontFamily: "inherit",
                }}>
                  {submitting ? "Enviando..." : "Enviar encuesta ✓"}
                </button>
              )}
            </div>

            {/* Question dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 24, flexWrap: "wrap" }}>
              {QUESTIONS.map((q, i) => (
                <button key={i} onClick={() => setStep(i)} style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  border: "none",
                  cursor: "pointer",
                  background: i === step ? "var(--accent)" : answers[q.id] !== undefined ? "var(--accent-soft)" : "var(--border)",
                  transition: "all 0.15s ease",
                  padding: 0,
                }} />
              ))}
            </div>
          </div>
        )}

        {/* === ALREADY SUBMITTED === */}
        {view === "survey" && submitted && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 700, color: "var(--text-main)", marginBottom: 8 }}>
              ¡Ya enviaste tu encuesta!
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-dim)", lineHeight: 1.6 }}>
              Gracias por tu retroalimentación. Puedes ver los resultados agregados en la pestaña "Resultados".
            </p>
          </div>
        )}

        {/* === THANK YOU === */}
        {view === "thanks" && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 800, color: "var(--text-main)", marginBottom: 12 }}>
              ¡Gracias!
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-dim)", lineHeight: 1.6, maxWidth: 380, margin: "0 auto" }}>
              Tu opinión es invaluable para hacer un mejor libro. Cada respuesta nos ayuda a ajustar el contenido antes del lanzamiento.
            </p>
            <button onClick={() => { setView("results"); loadResults(); }} style={{
              marginTop: 28,
              padding: "12px 28px",
              border: "none",
              borderRadius: 10,
              background: "var(--accent)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
            }}>
              Ver resultados →
            </button>
          </div>
        )}

        {/* === RESULTS === */}
        {view === "results" && (
          <div style={{ marginTop: 20 }}>
            <ResultsDashboard responses={allResponses} />
          </div>
        )}
      </div>
    </div>
  );
}

const rootStyle = {
  "--accent": "#e85d26",
  "--accent-soft": "rgba(232,93,38,0.12)",
  "--bg": "#faf8f5",
  "--surface": "#fff",
  "--border": "#e8e4de",
  "--text-main": "#1a1715",
  "--text-dim": "#7a7268",
  "--text-disabled": "#c4bfb8",
  minHeight: "100vh",
  background: "var(--bg)",
  fontFamily: "'DM Sans', sans-serif",
  color: "var(--text-main)",
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #faf8f5; }
  ::selection { background: rgba(232,93,38,0.2); }
  textarea:focus { border-color: var(--accent) !important; box-shadow: 0 0 0 3px rgba(232,93,38,0.1); }
  button:active { transform: scale(0.97); }
`;
