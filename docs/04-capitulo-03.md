# CAPÍTULO 3: El Arte de Pedir (Prompts para Gente Normal)

## La habilidad que nadie te enseñó en la universidad

Hay una habilidad que no aparece en ningún plan de estudios, que ningún jefe te va a enseñar, y que sin embargo se está convirtiendo en la más valiosa del mercado laboral: **saber comunicarte con una inteligencia artificial.**

Suena exagerado. No lo es.

Piénsalo un momento. La IA ya puede escribir, analizar, resumir, traducir, calcular y crear. Pero solo lo hace bien si tú le dices exactamente qué necesitas. Es la diferencia entre tener un asistente genial y saber aprovecharlo, o tener un asistente genial y pedirle que "haga cosas" sin nunca explicarle cuáles.

En el capítulo anterior tuviste tu primera conversación con la IA. Probablemente algunas respuestas te parecieron buenas y otras te dejaron pensando "no era eso lo que quería". Eso es completamente normal. Y tiene solución.

Este capítulo te va a dar un sistema — sí, un sistema, no adivinanzas — para escribir prompts que funcionen. Se llama ROCA, es fácil de recordar y lo puedes aplicar a cualquier situación profesional desde hoy.

## ¿Por qué importa tanto cómo preguntas?

Voy a darte un ejemplo rápido para que lo sientas en carne propia.

Imagina que acabas de contratar a un diseñador freelance para que te haga una presentación. Le mandas un mensaje:

**Versión A:**
> "Hazme una presentación bonita sobre el proyecto."

**Versión B:**
> "Necesito una presentación de 10 diapositivas para la junta de dirección del próximo viernes. El tema es el avance del proyecto de expansión al mercado colombiano. La audiencia son 5 directores que no conocen los detalles operativos, así que hay que ser claro y visual. El tono debe ser profesional pero no aburrido. Incluye los datos de ventas del Q1 que te adjunto. Usa los colores de la marca."

¿Con cuál de las dos versiones el diseñador va a hacer un mejor trabajo? Obvio. La B. Porque tiene contexto, especificaciones, audiencia y formato.

Con la IA pasa exactamente lo mismo. La diferencia entre un prompt mediocre y un prompt excelente no es magia ni talento: es estructura. Y esa estructura se llama ROCA.

## El Framework ROCA: Tu Fórmula para Prompts que Funcionan

ROCA es un acrónimo que inventé para este libro porque necesitaba algo que fuera fácil de recordar y que funcionara en español. Cada letra representa un ingrediente de un buen prompt:

### R — Rol
**"Actúa como..."**

Le dices a la IA quién debe ser. Esto cambia drásticamente la calidad de la respuesta porque la IA ajusta su vocabulario, nivel de detalle y enfoque según el rol que le asignes.

No es lo mismo pedirle algo "a la IA" que pedírselo a un "consultor de McKinsey con 20 años de experiencia en retail" o a un "community manager creativo que trabaja para marcas de comida mexicana".

**Ejemplos de roles:**
- "Actúa como un contador fiscal mexicano con 15 años de experiencia"
- "Eres un reclutador senior especializado en perfiles de tecnología"
- "Actúa como un director de marketing que presenta resultados a un CEO"
- "Eres un abogado corporativo que revisa contratos de proveedores"
- "Actúa como un coach de carrera profesional para ejecutivos de nivel medio"

**Truco avanzado:** entre más específico sea el rol, mejor. "Actúa como un experto en marketing" es bueno. "Actúa como un director de marketing digital en una empresa de e-commerce en México con enfoque en redes sociales para audiencia millennial" es mucho mejor.

### O — Objetivo
**"Necesito que..."**

Le dices qué quieres lograr. No qué quieres que haga (eso viene después), sino cuál es la meta final. Es la diferencia entre decir "escríbeme un texto" y "necesito convencer a mi jefe de aprobar el presupuesto para un nuevo proyecto".

Cuando la IA entiende tu objetivo, puede tomar mejores decisiones sobre tono, estructura y contenido.

**Ejemplos de objetivos:**
- "Necesito convencer a un cliente indeciso de que cierre la compra"
- "Quiero entender los cambios fiscales de 2025 y cómo me afectan"
- "Necesito preparar argumentos para pedir un aumento de sueldo"
- "Quiero simplificar un proceso que hoy me toma 4 horas cada semana"
- "Necesito explicarle a mi equipo por qué vamos a cambiar de estrategia"

### C — Contexto
**"La situación es..."**

Le das la información relevante: tu industria, el tamaño de tu empresa, quién es tu audiencia, cuáles son las restricciones, qué has intentado antes, qué datos tienes. Todo lo que un consultor humano necesitaría saber para ayudarte.

Este es el ingrediente que más gente se salta, y es el que más impacto tiene. Sin contexto, la IA te da respuestas genéricas. Con contexto, te da respuestas que parecen hechas a la medida.

**Ejemplos de contexto:**
- "Mi empresa es una distribuidora de alimentos con 200 empleados en Guadalajara"
- "El cliente lleva 3 semanas sin contestar mis correos y el contrato vence en 10 días"
- "Mi jefe es muy analítico y solo se convence con números, no con argumentos emocionales"
- "Soy nuevo en el puesto, llevo solo 2 meses, y todavía estoy ganándome la confianza del equipo"
- "El presupuesto es limitado: máximo $50,000 pesos mensuales"

### A — Acción
**"Dame / Escribe / Analiza / Crea..."**

Le dices exactamente qué formato quieres y qué debe entregar. ¿Quieres un correo? ¿Una lista de ideas? ¿Un análisis en tabla? ¿Dos versiones para comparar? ¿Un plan paso a paso?

Este ingrediente evita que la IA te dé una respuesta de formato libre cuando tú necesitabas algo específico.

**Ejemplos de acciones:**
- "Dame 5 opciones en formato de lista, cada una con un título y 2 oraciones de descripción"
- "Escribe un correo de máximo 150 palabras"
- "Crea una tabla comparativa con pros y contras"
- "Analiza los datos y dame 3 conclusiones con recomendaciones"
- "Escríbeme 2 versiones: una formal y una casual"
- "Organízalo en un plan de 4 semanas con acciones por día"

---

## ROCA en acción: 3 ejemplos de la vida real

Vamos a ver cómo se arma un prompt con ROCA en situaciones que probablemente te suenan familiares.

### Ejemplo 1: Necesitas un correo para un cliente que no contesta

**Sin ROCA (lo que la mayoría escribe):**
```
Escribe un correo de seguimiento para un cliente
```

**Con ROCA:**
```
ROL: Actúa como un ejecutivo de ventas B2B con experiencia 
en el sector de servicios financieros en México.

OBJETIVO: Necesito que el cliente retome la conversación sobre 
nuestra propuesta sin que se sienta presionado o incómodo.

CONTEXTO: Le enviamos una propuesta comercial hace 3 semanas 
por $180,000 pesos anuales para un servicio de consultoría 
fiscal. Tuvimos una llamada muy positiva antes de enviarla, 
pero desde entonces no ha respondido 2 correos de seguimiento. 
No quiero perder la oportunidad pero tampoco parecer 
desesperado. El contacto se llama Licenciado Martínez y 
es Director de Finanzas.

ACCIÓN: Escríbeme 2 versiones del correo: una con enfoque en 
"aporte de valor" (compartir un dato o recurso útil como excusa 
para retomar) y otra con enfoque en "fecha límite suave" (sin 
ser agresivo). Máximo 120 palabras cada uno.
```

¿Ves la diferencia? La primera versión te va a dar un correo genérico que podrías encontrar en cualquier plantilla de internet. La segunda te va a dar algo que suena como si lo hubiera escrito alguien que conoce tu situación específica.

### Ejemplo 2: Necesitas entender un reporte financiero para presentarlo

**Sin ROCA:**
```
Explícame este reporte financiero
```

**Con ROCA:**
```
ROL: Actúa como un director financiero que le explica reportes 
a gerentes de áreas no financieras.

OBJETIVO: Necesito entender los puntos clave de este reporte 
para presentarlos en una junta con mi equipo de marketing, que 
no tiene formación financiera.

CONTEXTO: Soy gerente de marketing en una empresa de retail. 
Me pasaron el reporte del Q1 con estados financieros y no 
entiendo varias partidas. Mi equipo necesita saber cómo les 
afecta el presupuesto para el Q2. Te voy a pegar los datos 
a continuación.

ACCIÓN: 1) Explícame los 5 puntos más importantes del reporte 
en lenguaje simple, sin jerga financiera. 2) Dime qué 
implicaciones tiene para el presupuesto de marketing del Q2. 
3) Dame 3 bullets que pueda usar en mi presentación al equipo.

[Aquí pegas los datos del reporte]
```

### Ejemplo 3: Quieres que la IA te ayude a preparar una entrevista de trabajo

**Sin ROCA:**
```
Ayúdame a prepararme para una entrevista
```

**Con ROCA:**
```
ROL: Actúa como un coach de carrera profesional especializado 
en transiciones laborales para ejecutivos en México.

OBJETIVO: Prepararme para una entrevista final para el puesto 
de Gerente de Operaciones en una empresa de logística. Quiero 
dar respuestas memorables y diferenciadas.

CONTEXTO: Tengo 8 años de experiencia en operaciones, 
actualmente soy coordinador senior en una empresa de 
manufactura. Es mi primera entrevista para un puesto gerencial. 
La empresa es una startup de logística de última milla con 150 
empleados. Sé que buscan a alguien que optimice procesos y 
reduzca costos. Mis fortalezas son análisis de datos y liderazgo 
de equipos. Mi debilidad es que no tengo experiencia directa 
en logística (vengo de manufactura).

ACCIÓN: 1) Dame las 5 preguntas más probables que me harán y 
una respuesta modelo para cada una que muestre mis fortalezas. 
2) Ayúdame a convertir mi falta de experiencia en logística 
en una ventaja (perspectiva fresca, habilidades transferibles). 
3) Dame 2 preguntas inteligentes que yo pueda hacer al final 
de la entrevista para destacar.
```

## Prompts que nunca funcionan (y por qué)

Antes de darte los prompts mágicos, hablemos de lo que NO funciona. Porque a veces es más útil saber qué evitar.

### ❌ "Dime todo sobre marketing digital"
**Por qué falla:** Demasiado amplio. La IA te va a dar una enciclopedia genérica. Sin rol, sin objetivo, sin contexto, sin acción específica.

### ❌ "Haz algo creativo"
**Por qué falla:** "Creativo" sin parámetros es como decirle a un chef "hazme algo rico" sin decirle si quieres desayuno o cena, si eres vegetariano o si tienes alergia a los mariscos.

### ❌ "Corrige mi texto" (sin pegar el texto)
**Por qué falla:** Te sorprendería cuánta gente le pide a la IA que corrija un texto sin pegarlo. La IA no tiene acceso a tus archivos ni puede leer tu mente.

### ❌ "Escribe como si fueras Steve Jobs"
**Por qué falla parcialmente:** La IA puede imitar un estilo, pero no sabe cuál es TU contexto. Mejor: "Escribe con un tono inspirador y visionario, usando frases cortas y poderosas, para una presentación interna sobre innovación."

### ❌ "Dame la mejor estrategia de ventas"
**Por qué falla:** ¿Para qué producto? ¿Qué tipo de cliente? ¿B2B o B2C? ¿Cuál es tu presupuesto? ¿Tienes equipo de ventas o eres tú solo? Sin contexto, la "mejor estrategia" no existe.

## La técnica de iteración: tu arma secreta

Aquí va algo que separa a los usuarios casuales de los usuarios efectivos: **la conversación con la IA no es de un solo mensaje.**

La mayoría de la gente escribe un prompt, lee la respuesta, y si no es perfecta, se rinde o empieza una conversación nueva. Error. Lo correcto es iterar dentro de la misma conversación.

La iteración funciona así:

**Mensaje 1:** Tu prompt con ROCA.
**Respuesta de la IA:** Un primer borrador.
**Mensaje 2:** "Está bien, pero ajusta X."
**Respuesta mejorada.**
**Mensaje 3:** "Perfecto, ahora agrega Y y quita Z."
**Respuesta casi final.**
**Mensaje 4:** "Cambia el tono del segundo párrafo a algo más directo."
**Respuesta final.**

Cuatro mensajes. Dos minutos. Un resultado que parece hecho por un profesional dedicado.

### Frases útiles para iterar:

Memoriza estas — o mejor, guárdalas en tus notas. Son las que vas a usar todos los días:

- **"Está bien, pero hazlo más corto."** — Para cuando la respuesta es buena pero demasiado larga.
- **"Dame otra versión con un tono más [formal / casual / directo / diplomático]."** — Para ajustar el estilo sin cambiar el contenido.
- **"Me gusta la idea 2, desarrolla solo esa con más detalle."** — Para profundizar en lo que te sirvió.
- **"Ahora imagina que mi audiencia es [describe nueva audiencia]. Adapta el texto."** — Para reutilizar contenido para otro público.
- **"Falta un dato importante: [dato]. Reescribe considerando esto."** — Para cuando olvidaste dar contexto.
- **"Pon todo en formato de tabla / lista / bullets / párrafos."** — Para cambiar la presentación sin cambiar el fondo.
- **"Actúa como si le estuvieras explicando esto a alguien que no sabe nada del tema."** — Para simplificar.
- **"¿Qué se me está olvidando considerar?"** — Esta es oro. La IA puede identificar puntos ciegos en tu razonamiento.

## Los 10 Prompts Mágicos

A lo largo de este libro vas a encontrar prompts específicos para cada capítulo. Pero aquí te dejo los 10 que considero esenciales — los que un profesional en cualquier área puede usar desde hoy. Todos siguen el framework ROCA. Todos están en el sitio web companion para que los copies directo.

---

### Prompt #1: El Correo Que No Puedes Escribir ✉️
```
Actúa como un profesional de [tu área]. Necesito escribir un 
correo electrónico a [destinatario] para [objetivo: pedir un 
aumento / resolver una queja / dar seguimiento a un proyecto]. 
El tono debe ser profesional pero cercano. Contexto: [explica 
brevemente la situación]. Dame 2 versiones: una directa y una 
más diplomática.
```

### Prompt #2: El Resumen Ejecutivo Exprés 📋
```
Eres un consultor senior. Te voy a pegar un texto largo. 
Necesito que lo resumas en: 1) Un párrafo ejecutivo de 3 
oraciones, 2) 5 puntos clave en bullets, 3) Las acciones 
a tomar. Texto: [pega el texto aquí]
```

### Prompt #3: Fórmulas de Excel Sin Dolor 📊
```
Soy usuario de Excel nivel intermedio-bajo. Tengo una hoja de 
cálculo con las siguientes columnas: [describe tus columnas]. 
Necesito una fórmula que [describe lo que quieres lograr]. 
Explícamela paso a paso como si nunca hubiera usado esa 
función. Si es posible, dame también una alternativa más 
sencilla.
```

### Prompt #4: Preparación para Junta Importante 🎯
```
Voy a tener una reunión con [quién] sobre [tema]. Mi objetivo 
es [qué quiero lograr]. Los posibles puntos difíciles son 
[describe]. Ayúdame a: 1) Preparar mis 3 argumentos principales, 
2) Anticipar las 3 objeciones más probables y cómo responder, 
3) Escribir un resumen de una página que pueda llevar impreso.
```

### Prompt #5: Analista de Datos Personal 📈
```
Tengo estos datos [pega los datos o describe el dataset]. 
Necesito que identifiques: 1) Las tendencias principales, 
2) Cualquier dato atípico o que llame la atención, 3) 3 
conclusiones que pueda presentar a mi jefe. Presenta la 
información de forma que alguien no técnico la entienda 
inmediatamente.
```

### Prompt #6: Creador de Presentaciones 🖥️
```
Necesito crear una presentación de [número] diapositivas sobre 
[tema]. La audiencia es [describe a tu audiencia]. El objetivo 
es [convencer / informar / capacitar]. Para cada diapositiva 
dame: 1) Título, 2) 3-4 puntos clave (no más), 3) Sugerencia 
de visual o gráfica que la acompañe. El tono debe ser 
[profesional / dinámico / formal].
```

### Prompt #7: Reescritura Profesional ✏️
```
Reescribe el siguiente texto para que suene más [profesional / 
persuasivo / claro / simple]. Mantén la idea central pero 
mejora la estructura y el impacto. Si encuentras errores de 
ortografía o gramática, corrígelos. Texto original: [pega tu 
texto]
```

### Prompt #8: Plan de Proyecto Rápido 🗂️
```
Soy [tu rol] en una empresa de [industria]. Necesito un plan 
de proyecto para [describe el proyecto]. Inclúyeme: 1) Objetivo 
general y objetivos específicos, 2) Fases del proyecto con 
duración estimada, 3) Entregables por fase, 4) Posibles riesgos 
y cómo mitigarlos, 5) Formato que pueda copiar a un documento 
o presentación.
```

### Prompt #9: Generador de Propuestas de Valor 💡
```
Mi empresa/producto/servicio es [describe brevemente]. Mi 
cliente ideal es [describe]. El problema principal que 
resolvemos es [describe]. Genera: 1) Una propuesta de valor 
en una oración, 2) Un elevator pitch de 30 segundos, 3) 3 
puntos diferenciadores frente a la competencia, 4) Una versión 
para poner en mi firma de correo electrónico.
```

### Prompt #10: Plan de Carrera Asistido 🚀
```
Soy [tu perfil profesional: edad, carrera, años de experiencia, 
puesto actual]. Mi objetivo a 2 años es [describe]. Mis 
fortalezas son [lista]. Mis áreas de mejora son [lista]. Con 
base en el mercado laboral actual en [tu país], dame: 1) Los 3 
movimientos estratégicos que debería hacer en los próximos 6 
meses, 2) Habilidades específicas que debería desarrollar, 
3) Cómo posicionar mi perfil de LinkedIn para ese objetivo, 
4) Un plan mensual de acciones concretas.
```

---

## Tu nuevo superpoder tiene 4 letras

ROCA. Rol, Objetivo, Contexto, Acción. Cuatro ingredientes. Un sistema que funciona para cualquier prompt, en cualquier herramienta, para cualquier profesión.

¿Tienes que usar las cuatro letras siempre? No necesariamente. Para preguntas simples ("¿cuál es la fórmula de Excel para sumar una columna?") no necesitas un prompt de 200 palabras. Pero para cualquier tarea profesional importante — correos delicados, análisis de datos, presentaciones, propuestas, planes — ROCA te va a dar resultados que parecen de consultor senior.

Y aquí va el secreto final de este capítulo: **no necesitas memorizar los 10 prompts.** Necesitas entender ROCA. Porque cuando entiendes la estructura, puedes crear tus propios prompts para cualquier situación que se te presente. Los 10 prompts son plantillas de arranque. ROCA es la habilidad permanente.

Un prompt bien escrito + la técnica de iteración = respuestas que antes solo obtenías contratando a alguien o pasando horas frente a la pantalla.

Eso, mi querido lector, es un superpoder profesional. Y ahora es tuyo.

## Tarea antes del Capítulo 4

1. **Reescribe un prompt viejo.** Si ya hiciste prompts en el capítulo anterior, toma el que peor resultado te dio y reescríbelo usando ROCA. Compara las respuestas.
2. **Usa los 3 prompts que más apliquen a tu trabajo.** De los 10 Prompts Mágicos, elige los 3 que más se relacionen con tu día a día y úsalos con datos reales.
3. **Practica iterar.** En tu próxima conversación con la IA, no te conformes con la primera respuesta. Manda al menos 3 mensajes de ajuste. Observa cómo mejora.
4. **Crea tu propio prompt con ROCA.** Piensa en una tarea que hagas frecuentemente en tu trabajo y construye un prompt desde cero usando las 4 letras. Guárdalo. Va a ser el primero de tu biblioteca personal.

En el Capítulo 4 vamos a hacer algo que vas a agradecer mucho: ver exactamente cómo la IA se aplica a TU profesión específica. Marketing, ventas, RRHH, finanzas, legal, administración, emprendimiento — cada área con sus propios casos de uso y prompts dedicados. Busca tu sección y prepárate para decir "¿por qué no supe esto antes?".
