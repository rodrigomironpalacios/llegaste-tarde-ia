# CAPÍTULO 6: Automatiza lo Aburrido (Sin Saber Programar)

## Las horas que no sabes que estás perdiendo

Antes de hablar de automatización, quiero que hagas un ejercicio mental. Piensa en tu semana laboral típica y responde estas preguntas:

- ¿Cuántas veces a la semana copias datos de un lugar y los pegas en otro?
- ¿Cuántos correos envías que son básicamente el mismo pero con nombres diferentes?
- ¿Cuántas veces actualizas un reporte manualmente que tiene la misma estructura cada semana?
- ¿Cuántas veces le mandas a alguien un recordatorio de algo que ya debería haber hecho?
- ¿Cuántas veces descargas un archivo, lo renombras y lo guardas en una carpeta específica?

Si la respuesta a cualquiera de estas es "más de tres veces por semana", felicidades: acabas de encontrar horas de tu vida que puedes recuperar.

La automatización no es ciencia ficción. No requiere programar. No necesitas un equipo de TI. Y cuando la combinas con IA, se convierte en algo casi mágico: tareas que se hacen solas, bien hechas, sin que tú tengas que intervenir.

## ¿Qué es automatizar? (Sin complicarlo)

Automatizar es crear una instrucción que dice: "Cuando pase X, haz Y automáticamente."

Eso es todo. Así de simple.

**Algunos ejemplos de la vida real:**

- Cuando recibo un correo de un cliente VIP → mándame una notificación al celular y agrégalo a mi hoja de seguimiento.
- Cuando alguien llena el formulario de contacto de mi página web → envíale un correo de bienvenida y créale un registro en mi CRM.
- Todos los lunes a las 8 AM → genera el reporte semanal de ventas y envíalo por correo a mi equipo.
- Cuando un candidato aplica a una vacante → guarda su información en una hoja de Excel y notifícame por Slack.
- Cuando un pago se registra → actualiza el estatus en mi base de datos y manda la factura automáticamente.

¿Ves el patrón? Todas son tareas que hoy haces a mano, una por una, varias veces a la semana. La automatización las convierte en algo que pasa solo.

## El test del "¿esto lo hago más de 3 veces?"

Aquí va una regla práctica para identificar qué automatizar. Hazte esta pregunta sobre cada tarea repetitiva:

**¿Hago esta tarea más de 3 veces por semana Y sigue básicamente los mismos pasos cada vez?**

Si la respuesta es sí, es candidata a automatización.

No necesitas automatizar todo. Empieza con una sola tarea. La más repetitiva, la más aburrida, la que más te frustra. Una victoria pequeña te va a dar la confianza para seguir.

Para ayudarte a identificar candidatas, usa este prompt:

```
[ROL] Actúa como un consultor de productividad 
especializado en automatización para profesionales 
no técnicos.

[OBJETIVO] Ayúdame a identificar qué tareas de mi 
trabajo diario puedo automatizar.

[CONTEXTO] Mi puesto es [tu puesto] en una empresa 
de [industria]. Mis tareas repetitivas semanales son:
1. [describe tarea 1 y cuántas veces la haces]
2. [describe tarea 2]
3. [describe tarea 3]
4. [describe tarea 4]
5. [agrega las que sean]

Las herramientas que uso son: [Excel, Gmail, Google 
Sheets, Outlook, Slack, WhatsApp, un CRM, etc.].
No sé programar.

[ACCIÓN] Para cada tarea dime:
1) ¿Se puede automatizar? (sí/no/parcialmente)
2) ¿Qué herramienta usaría? (Zapier, Make, Power 
   Automate, u otra)
3) ¿Qué tan difícil es? (fácil / medio / necesita ayuda)
4) ¿Cuánto tiempo me ahorraría a la semana?
Ordénalas de mayor a menor impacto. Recomiéndame 
por cuál empezar.
```

## Las herramientas: Zapier, Make y Power Automate

No necesitas conocer 20 herramientas de automatización. Con conocer tres y elegir una, estás más que cubierto.

### Zapier
**Qué es:** La herramienta de automatización más popular del mundo. Conecta más de 5,000 aplicaciones entre sí sin necesidad de código.

**Cómo funciona:** Creas "Zaps" — automatizaciones que dicen "cuando pase esto en la App A, haz esto en la App B". Por ejemplo: "Cuando reciba un correo con adjunto en Gmail, guarda el adjunto en Google Drive."

**Ideal para:** Quienes usan muchas herramientas diferentes (Gmail + Slack + Trello + Google Sheets + HubSpot, etc.). Tiene la mayor cantidad de integraciones.

**Precio:** Tiene plan gratuito limitado (100 tareas al mes). Los planes de paga empiezan alrededor de $20 USD/mes.

**Nivel de dificultad:** Bajo. La interfaz es muy visual e intuitiva.

### Make (antes Integromat)
**Qué es:** Similar a Zapier pero con más flexibilidad para automatizaciones complejas. La interfaz es visual — arrastras y conectas "módulos" como si armaras un diagrama de flujo.

**Cómo funciona:** Creas "Escenarios" donde conectas módulos de diferentes aplicaciones. Cada módulo hace una acción y puedes agregar condiciones y ramificaciones.

**Ideal para:** Automatizaciones más complejas o cuando necesitas lógica condicional ("si el monto es mayor a $10,000, manda por este camino; si no, por este otro").

**Precio:** Plan gratuito con 1,000 operaciones al mes. Planes de paga desde $9 USD/mes. Generalmente más económico que Zapier.

**Nivel de dificultad:** Medio. Un poco más de curva de aprendizaje que Zapier, pero más poderoso.

### Microsoft Power Automate
**Qué es:** La solución de automatización de Microsoft. Si tu empresa ya usa Microsoft 365 (Outlook, Teams, SharePoint, Excel), esta es probablemente tu mejor opción porque se integra nativamente con todo el ecosistema.

**Cómo funciona:** Creas "Flujos" usando plantillas o desde cero. Tiene una interfaz visual paso a paso.

**Ideal para:** Empresas que viven en el ecosistema Microsoft. La integración con Outlook, Teams, Excel y SharePoint es imbatible.

**Precio:** Viene incluido en muchos planes de Microsoft 365. Si ya tienes licencia de Office, probablemente ya tienes acceso.

**Nivel de dificultad:** Medio. La interfaz puede ser un poco confusa al principio, pero hay muchas plantillas prehechas.

### ¿Cuál elijo?

| Si tu situación es... | Elige... |
|---|---|
| Tu empresa usa Microsoft 365 | Power Automate |
| Usas muchas apps diferentes (Google + Slack + CRM + etc.) | Zapier |
| Necesitas automatizaciones complejas con condiciones | Make |
| No tienes idea y quieres la más fácil | Zapier |
| Quieres gastar lo mínimo posible | Make (plan gratis más generoso) |

## Cómo la IA potencia la automatización

Aquí es donde la cosa se pone interesante. Las herramientas de automatización por sí solas son poderosas — mueven datos de un lugar a otro, mandan correos, crean registros. Pero cuando le agregas IA a la ecuación, las automatizaciones se vuelven inteligentes.

**Sin IA:** "Cuando reciba un correo, reenvíalo a mi equipo."
**Con IA:** "Cuando reciba un correo, la IA lo lee, identifica si es urgente, escribe un resumen de 2 oraciones y lo manda al canal correspondiente de Slack con el nivel de prioridad."

**Sin IA:** "Cuando un cliente llene un formulario, guárdalo en Excel."
**Con IA:** "Cuando un cliente llene un formulario, la IA clasifica el tipo de consulta, genera una respuesta personalizada y la manda automáticamente. Si la consulta es compleja, me notifica para que yo la atienda personalmente."

La IA es el cerebro. La automatización son las manos. Juntas, son un empleado que nunca se cansa, nunca olvida y trabaja las 24 horas.

Tanto Zapier como Make ya tienen integración nativa con ChatGPT y otros modelos de IA. Eso significa que puedes agregar un paso de "IA" dentro de tu automatización sin saber programar.

## Tu primera automatización: paso a paso

Vamos a crear una automatización real y útil. Algo que puedas tener funcionando hoy mismo.

**El escenario:** cada vez que recibes un correo importante de un cliente específico, quieres que la IA lo lea, te haga un resumen corto y te mande ese resumen como mensaje a Slack o como notificación.

### Usando Zapier (ejemplo paso a paso):

**Paso 1: Crea tu cuenta**
Ve a zapier.com y regístrate. Es gratis para empezar.

**Paso 2: Crea un nuevo Zap**
Haz clic en "Create Zap" o "Crear Zap".

**Paso 3: Configura el disparador (Trigger)**
- Elige "Gmail" (o "Outlook" si usas Microsoft) como app de entrada
- Selecciona el evento: "New Email" (Nuevo correo)
- Conecta tu cuenta de correo
- Agrega un filtro: que el remitente sea el correo de tu cliente VIP
- Prueba que funcione

**Paso 4: Agrega el paso de IA**
- Agrega un nuevo paso
- Busca "ChatGPT" o "OpenAI" en las apps
- Selecciona la acción "Conversation" o "Send Prompt"
- En el prompt escribe algo como: "Resume el siguiente correo en máximo 3 oraciones. Identifica si hay alguna acción urgente. Correo: [aquí Zapier inserta automáticamente el contenido del correo]"
- Conecta tu cuenta de OpenAI (necesitas una API key — hay tutoriales sencillos para obtenerla)

**Paso 5: Configura la salida**
- Agrega otro paso
- Elige "Slack" (o "Email" o "Google Sheets" — a donde quieras mandar el resumen)
- Configura qué canal o correo recibe el resumen
- El mensaje incluye: el resumen que generó la IA + el remitente original + la fecha

**Paso 6: Actívalo**
Dale "Publish" o "Turn on". Listo. A partir de ahora, cada correo de ese cliente se lee solo, se resume solo y llega a tu Slack resumido.

La primera vez te va a tomar 20-30 minutos configurarlo. Pero después va a funcionar automáticamente para siempre. Y te ahorra los 5-10 minutos diarios de leer, procesar y reenviar esos correos manualmente. En un mes son 2-3 horas recuperadas. Con una sola automatización.

## Más ideas de automatizaciones prácticas

Una vez que hagas la primera, se te van a ocurrir mil más. Aquí van algunas ideas organizadas por área para que te inspires:

**Para todos:**
- Guardar automáticamente los adjuntos de correos en una carpeta específica de Drive/OneDrive
- Recibir un resumen diario de los correos más importantes del día anterior
- Crear eventos en el calendario automáticamente cuando alguien menciona una fecha en un correo

**Para ventas:**
- Cuando un prospecto llene un formulario web, crear automáticamente un contacto en tu CRM y asignar un seguimiento
- Recibir una alerta cuando un cliente importante no ha sido contactado en X días

**Para RRHH:**
- Cuando un candidato envíe su CV por correo, guardar el adjunto en una carpeta organizada por puesto y fecha
- Enviar automáticamente un correo de acuse de recibo personalizado a cada candidato

**Para finanzas:**
- Cada vez que se registre un gasto en una app, agregarlo automáticamente a tu hoja de control presupuestal
- Generar un resumen semanal de movimientos y enviarlo por correo los lunes a las 8 AM

**Para gerentes:**
- Después de cada junta recurrente, crear automáticamente un documento de minuta con la fecha, los asistentes y un template listo para llenar
- Enviar recordatorios automáticos de pendientes cada miércoles

## El ROI de tu tiempo: cuántas horas recuperas

Una forma de convencerte (y convencer a tu jefe) de que vale la pena invertir tiempo en automatización es calcular el ROI de tiempo.

La fórmula es simple:

**Horas ahorradas al mes = (minutos por tarea × veces por semana × 4) ÷ 60**

Ejemplo: si pasas 15 minutos al día reenviando y organizando correos de clientes, eso son 75 minutos por semana, 300 minutos al mes, o sea 5 horas mensuales. Si la automatización te toma 30 minutos crearla y te ahorra 5 horas al mes, en el primer mes ya ganaste 4.5 horas. Del segundo mes en adelante, son 5 horas puras de ganancia. Cada mes. Para siempre.

Ahora imagina que automatizas 3 o 4 tareas así. Estás recuperando 15-20 horas al mes. Eso es más de dos días de trabajo completos. Dos días que puedes usar para cosas que realmente importan: pensar, decidir, crear, liderar.

Usa este prompt para calcular tu propio ROI:

```
Soy [tu puesto]. Estas son las tareas que estoy 
considerando automatizar:

1. [Tarea]: me toma [X] minutos, la hago [X] veces 
   por semana
2. [Tarea]: me toma [X] minutos, la hago [X] veces 
   por semana
3. [Tarea]: me toma [X] minutos, la hago [X] veces 
   por semana

Calcula:
1) Horas totales que gasto al mes en estas tareas
2) Tiempo estimado para crear cada automatización
3) En cuántas semanas recupero la inversión de tiempo
4) Horas ahorradas al año
5) Si mi hora de trabajo vale $[X], cuánto dinero 
   equivale ese ahorro al año
```

## La mentalidad de "¿esto se puede automatizar?"

El mayor beneficio de este capítulo no es que automatices una o dos tareas. Es que empieces a ver tu trabajo con nuevos ojos. Cada vez que te descubras haciendo algo repetitivo, que se te prenda el foco y pienses: "Espera... ¿esto se puede automatizar?"

Esa pregunta va a cambiar cómo trabajas. No de un día para otro, pero sí con el tiempo. Porque cada tarea que automatizas te libera tiempo y energía para las cosas que realmente requieren tu cerebro, tu creatividad y tu criterio profesional.

La IA hace el borrador. La automatización hace lo repetitivo. Y tú haces lo importante.

---

## Resumen del Capítulo 6

La automatización no es para ingenieros. Es para cualquiera que esté cansado de hacer lo mismo una y otra vez. Lo que aprendiste:

- El test de "¿más de 3 veces por semana?" identifica qué automatizar.
- Tres herramientas cubren todo: Zapier (la más fácil), Make (la más flexible) y Power Automate (si usas Microsoft).
- La IA dentro de las automatizaciones las hace inteligentes, no solo mecánicas.
- Tu primera automatización se crea en 30 minutos y te ahorra horas cada mes.
- El ROI de tiempo se calcula fácil y los números convencen a cualquier jefe.

En el Capítulo 7 vamos a hablar de algo igual de importante: cómo hacer que todo esto te ayude a crecer profesionalmente. Porque una cosa es ser productivo y otra es que tu jefe, tu empresa y tu industria lo noten.
