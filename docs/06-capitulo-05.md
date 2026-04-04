# CAPÍTULO 5: Excel + IA = Tu Nuevo Superpoder

## Confesionario de Excel

Vamos a empezar este capítulo con honestidad brutal.

Levanta la mano si alguna de estas frases te describe:

- "No sé hacer tablas dinámicas y en este punto de mi carrera me da pena preguntar."
- "Cada vez que necesito un BUSCARV, lo googleo. Cada. Vez."
- "Mi reporte mensual es un Frankenstein de fórmulas que armó alguien que ya no trabaja aquí y nadie sabe cómo funciona."
- "He pasado 2 horas intentando que una fórmula funcione y al final le pedí al becario que la hiciera."
- "Mi estrategia con Excel es copiar y pegar hasta que algo funcione."

Si levantaste la mano en al menos una, bienvenido. Eres la mayoría. Y este capítulo va a cambiar tu relación con Excel para siempre.

No porque te vaya a convertir en experto en Excel — hay libros enteros para eso. Sino porque vas a aprender a usar la IA como tu traductor personal entre "lo que necesitas que Excel haga" y "la fórmula que logra que lo haga". Ya nunca más vas a tener que googlear "cómo hacer BUSCARV" a las 11 de la noche antes de una entrega.

## El cambio mental: ya no necesitas aprender fórmulas

Aquí va algo que va a sonar radical pero es la pura verdad:

**Ya no necesitas memorizar fórmulas de Excel.**

Así como ya no necesitas memorizar números de teléfono porque los guardas en tu celular, ya no necesitas memorizar BUSCARV, SUMAR.SI.CONJUNTO, ÍNDICE/COINCIDIR ni ninguna de esas fórmulas que suenan a hechizo de Harry Potter.

Lo que SÍ necesitas es saber describirle a la IA qué quieres lograr. Y eso ya lo sabes hacer — llevas toda la vida explicándole cosas a la gente. La diferencia es que ahora le explicas a una IA y ella te escribe la fórmula.

El flujo es simple:

1. **Tú describes el problema** en español normal ("necesito sumar todas las ventas del mes de marzo que sean mayores a $10,000")
2. **La IA te da la fórmula** exacta, lista para copiar y pegar
3. **La IA te explica qué hace** cada parte, para que no estés pegando cosas a ciegas
4. **Tú la pegas en Excel**, verificas que funcione, y sigues con tu vida

Eso es todo. Vamos a ver cómo se ve en la práctica.

## Los 5 prompts de Excel que te van a cambiar la vida

Estos son los cinco escenarios con los que más pelean los profesionales no técnicos en Excel. Cada uno tiene un prompt listo para copiar y usar.

### Prompt 1: "Escríbeme la fórmula para..."

Este es el pan de cada día. Necesitas una fórmula y no sabes cómo escribirla.

```
[ROL] Actúa como un experto en Excel que le explica las 
cosas a personas que no son técnicas.

[OBJETIVO] Necesito una fórmula de Excel que haga lo 
siguiente: [describe lo que quieres en lenguaje normal].

[CONTEXTO] Mi hoja de Excel está organizada así:
- Columna A: [qué contiene]
- Columna B: [qué contiene]
- Columna C: [qué contiene]
- [sigue con todas las columnas relevantes]
Los datos empiezan en la fila [número] y terminan 
aproximadamente en la fila [número]. Uso Excel [versión 
o "no sé qué versión"]. [Si aplica: "Tengo varias hojas 
y necesito traer datos de otra hoja llamada X"].

[ACCIÓN] Dame: 
1) La fórmula exacta que debo poner (indicándome en qué 
   celda la pongo)
2) Explicación de qué hace cada parte de la fórmula 
   (como si se lo explicaras a un niño de 12 años)
3) Cómo arrastrar o copiar la fórmula si necesito 
   aplicarla a más filas
4) Qué errores comunes podrían aparecer (#N/A, #REF!, 
   #VALOR!) y cómo solucionarlos
```

**Ejemplo real:** digamos que tienes una lista de empleados en una hoja y necesitas buscar el departamento de alguien. Le dices a la IA:

```
Necesito una fórmula que busque el nombre de un empleado 
que yo escriba en la celda F1 y me traiga su departamento. 
La lista de empleados está en la Hoja "Directorio": 
columna A tiene los nombres y columna D tiene el 
departamento. Son 200 empleados.
```

La IA te va a dar algo como:

`=BUSCARV(F1,Directorio!A:D,4,FALSO)`

Y te va a explicar: "BUSCARV busca el valor de F1 en la primera columna del rango (columna A del Directorio), y cuando lo encuentra, va 4 columnas a la derecha para traerte el departamento. El FALSO al final significa que quieres una coincidencia exacta."

¿Ves? Lo que te tomaba 30 minutos de frustración ahora son 30 segundos.

---

### Prompt 2: "Explícame qué hace esta fórmula..."

Ese archivo que heredaste de tu predecesor tiene fórmulas que parecen código encriptado. En lugar de borrarlas y rezar, pregúntale a la IA qué hacen.

```
Soy usuario de Excel nivel básico-intermedio. Encontré 
esta fórmula en una hoja de cálculo de mi trabajo y no 
entiendo qué hace:

[pega la fórmula completa]

Explícame en español simple:
1) Qué hace esta fórmula en una oración
2) Qué hace cada parte, paso por paso
3) De dónde jala los datos (qué celdas o rangos usa)
4) Si hay algún riesgo de que se rompa (por ejemplo, si 
   alguien agrega filas o cambia el orden de las columnas)
5) ¿Hay una versión más simple que haga lo mismo?
```

**Esto es oro** cuando heredas archivos de Excel. En lugar de tenerle miedo a las fórmulas, ahora puedes entenderlas, explicarlas a otros y decidir si las mantienes o las simplificas.

---

### Prompt 3: "Limpia estos datos..."

Datos sucios. El dolor silencioso de todo profesional que trabaja con Excel. Nombres escritos de 15 formas diferentes, espacios extra, fechas en formato inconsistente, celdas vacías donde no debería haber, duplicados por todos lados.

```
[ROL] Actúa como un analista de datos que limpia y 
estandariza información en Excel.

[OBJETIVO] Tengo datos sucios que necesito limpiar 
para poder analizarlos.

[CONTEXTO] Los problemas que tiene mi hoja son: 
[describe todo lo que está mal, por ejemplo:]
- Hay nombres escritos de diferentes formas 
  ("Cd. de México", "CDMX", "Ciudad de Mexico")
- Algunas fechas están como texto, no como fecha
- Hay filas duplicadas
- Hay espacios extra en algunos datos
- Algunas celdas tienen números guardados como texto
- [cualquier otro problema]

La hoja tiene [X] columnas y aproximadamente [X] filas.

[ACCIÓN] Dame un proceso paso a paso para limpiar estos 
datos. Para cada paso dame:
1) La fórmula o función de Excel que debo usar
2) Instrucciones exactas de dónde aplicarla (como 
   "en la columna E, escribe esta fórmula")
3) Si puedo usar Buscar y Reemplazar, dime exactamente 
   qué poner en cada campo
Prioriza los métodos más simples. Si hay una forma de 
hacerlo sin fórmulas (con funcionalidades nativas de 
Excel como Quitar Duplicados), prefiero esa opción.
```

**Tip:** si el archivo no es confidencial, puedes copiar las primeras 10-15 filas de datos y pegarlas en el chat para que la IA vea exactamente cómo están los datos y te dé soluciones más precisas.

---

### Prompt 4: "Crea un reporte con estos datos..."

Tienes los datos. Tu jefe quiere un reporte visual. Y tú tienes la pantalla en blanco.

```
[ROL] Actúa como un analista de negocio que crea reportes 
ejecutivos en Excel.

[OBJETIVO] Necesito convertir datos crudos en un reporte 
visual y claro para presentar a [mi jefe / dirección / 
el equipo].

[CONTEXTO] Tengo datos de [describe qué son: ventas 
mensuales, gastos por departamento, resultados de encuesta, 
etc.]. Las columnas son: [describe]. El periodo es [periodo]. 
Lo que mi jefe quiere saber es: [las 2-3 preguntas clave 
que quiere responder con este reporte].

Aquí están los datos (o un resumen de los datos):
[pega los datos o describe los números clave]

[ACCIÓN] Dime:
1) Qué tipo de tabla dinámica crear (con qué campos en 
   filas, columnas y valores)
2) Qué tipo de gráfica es la más adecuada para estos datos 
   y por qué (barras, líneas, pastel, etc.)
3) Paso a paso cómo crear la tabla dinámica en Excel
4) 3-5 conclusiones o insights que puedo destacar como 
   texto acompañante del reporte
5) Un título profesional para el reporte

Si puedes, dame las instrucciones para el formato 
condicional que haga que los números se vean bien 
(rojo para negativo, verde para positivo, etc.).
```

**La clave aquí** es que la IA no solo te dice qué gráfica usar, sino que te explica POR QUÉ. "Usa una gráfica de barras horizontales porque estás comparando categorías, no tendencias en el tiempo." Eso te da argumentos cuando tu jefe pregunte por qué elegiste esa visualización.

---

### Prompt 5: "Enséñame a hacer una tabla dinámica..."

La tabla dinámica. El Everest de Excel para muchos profesionales. Pero con la IA como guía, se convierte en una caminata por el parque.

```
Necesito aprender a crear una tabla dinámica en Excel 
paso a paso. Explícamelo como si NUNCA hubiera hecho 
una en mi vida.

Mis datos están organizados así:
- Columna A: [ejemplo: Fecha de venta]
- Columna B: [ejemplo: Vendedor]
- Columna C: [ejemplo: Producto]
- Columna D: [ejemplo: Región]
- Columna E: [ejemplo: Monto de venta]

Tengo [número] filas de datos.

Lo que quiero analizar es: [ejemplo: "quiero ver el total 
de ventas por vendedor y por mes, y poder filtrar por 
región"].

Dame:
1) Paso a paso con instrucciones exactas de dónde hacer 
   clic (como un tutorial para principiantes absolutos)
2) Qué campo poner en Filas, Columnas, Valores y Filtros
3) Cómo cambiar el formato de los números (que se vean 
   como moneda, con comas, etc.)
4) Cómo agregar un filtro para ver solo una región o 
   un vendedor específico
5) Un tip para que la tabla se actualice cuando agregue 
   datos nuevos
```

**Lo hermoso de este enfoque** es que la IA no solo te da las instrucciones: te las da adaptadas a TUS datos. No es un tutorial genérico de YouTube donde tienes que traducir mentalmente "ventas de frutas" a tu propia realidad. La IA habla de TUS columnas, TUS datos, TU caso.

---

## Copilot en Excel vs. ChatGPT para Excel: ¿cuándo usar cada uno?

Ahora que ya sabes pedirle fórmulas a la IA, vale la pena entender que hay dos caminos y cuándo conviene cada uno.

### Camino 1: Copilot (IA dentro de Excel)

Microsoft Copilot está integrado directamente en Excel si tienes una suscripción de Microsoft 365 con Copilot incluido. La ventaja es que Copilot puede VER tu hoja de cálculo directamente — no necesitas copiar y pegar datos ni describir tus columnas.

**Úsalo cuando:**
- Tu empresa ya tiene licencia de Copilot
- Necesitas analizar datos que ya están en tu archivo
- Quieres crear gráficas o tablas dinámicas sin salir de Excel
- Los datos son confidenciales y no quieres pegarlos en un chat externo

**Limitaciones:**
- Necesitas la licencia de paga (no es barato)
- A veces no entiende bien lo que le pides con datos complejos
- Está en constante evolución, así que las funciones cambian seguido

### Camino 2: ChatGPT / Claude / Gemini (IA externa)

Aquí el flujo es: abres tu herramienta de IA en el navegador, describes tu situación o pegas tus datos, y te da la respuesta que luego tú aplicas manualmente en Excel.

**Úsalo cuando:**
- No tienes Copilot
- Necesitas que te explique las cosas paso a paso (la IA externa es mucho mejor para esto)
- Quieres aprender, no solo obtener la fórmula
- Necesitas ayuda con lógica compleja que requiere ir y venir en la conversación
- Quieres entender opciones antes de implementar

**Limitaciones:**
- No puede ver tu archivo directamente (tienes que describir o copiar datos)
- Tienes que aplicar las fórmulas tú manualmente
- Cuidado con pegar datos confidenciales

### Mi recomendación honesta:

Si tienes acceso a Copilot, úsalo para tareas rápidas dentro de Excel. Pero cuando necesites que te enseñen o que te expliquen el razonamiento detrás de algo, usa ChatGPT o Claude. La combinación de ambos es lo más poderoso.

Y si no tienes Copilot, no te preocupes. Con ChatGPT gratuito y los prompts de este capítulo puedes hacer el 90% de lo que necesitas. Solo toma un paso extra de copiar y pegar.

---

## El flujo de trabajo completo: de datos crudos a reporte en 10 minutos

Vamos a juntar todo lo que aprendiste en un flujo de trabajo realista. Imagina que es viernes, son las 4 de la tarde, y tu jefe te pide "el reporte de ventas del mes para la junta del lunes".

### Minuto 0-2: Evalúa los datos
Abre tu archivo de Excel. Identifica qué tienes: qué columnas, cuántas filas, si los datos están limpios o son un desastre.

### Minuto 2-4: Limpia si es necesario
Si los datos están sucios, abre ChatGPT y usa el Prompt 3 (Limpia estos datos). Describe los problemas. Aplica las soluciones que te dé.

### Minuto 4-6: Crea la tabla dinámica
Usa el Prompt 5 (tabla dinámica) describiendo tus columnas y lo que quieres analizar. Sigue las instrucciones paso a paso.

### Minuto 6-8: Agrega la gráfica
Parte del Prompt 4 (reporte). La IA te dice qué tipo de gráfica usar y cómo crearla.

### Minuto 8-10: Escribe las conclusiones
Pégale los números clave a la IA y pídele que te escriba 3-5 conclusiones ejecutivas y un título para el reporte. Copia el texto y pégalo en tu Excel o en un correo.

Diez minutos. Reporte listo. Fin de semana salvado.

¿Exagerado? Tal vez la primera vez te tome 20 minutos porque estás aprendiendo el flujo. Pero para la tercera o cuarta vez, 10 minutos va a ser tu estándar. Y lo que antes te tomaba una hora o más se convierte en algo que haces sin sudar.

---

## El error que no debes cometer

Un último consejo antes de cerrar el tema de Excel: **siempre verifica los resultados.**

La IA es muy buena dando fórmulas. Pero no es perfecta. Puede confundir una columna, darte un rango incorrecto o usar una función que tu versión de Excel no soporta. Antes de mandar el reporte a tu jefe, revisa que los números tengan sentido.

¿La suma total coincide con lo que esperabas? ¿Los nombres se trajeron correctamente? ¿Las fechas están bien? Una revisión de 2 minutos te ahorra una vergüenza de 2 horas.

La IA hace el trabajo pesado. Tú haces el control de calidad. Esa combinación es imbatible.

---

## Resumen del Capítulo 5

Excel dejó de ser tu enemigo. Ahora es una herramienta que puedes dominar con la IA como copiloto. Lo que aprendiste:

- Ya no necesitas memorizar fórmulas. Solo necesitas saber describir lo que quieres.
- Los 5 prompts de Excel cubren el 90% de lo que necesitas en tu día a día.
- Copilot y ChatGPT se complementan: uno trabaja dentro de Excel, el otro te enseña y te explica.
- El flujo de "datos crudos a reporte" es de 10 minutos una vez que le agarras la onda.
- Siempre verifica los resultados antes de enviar.

En el Capítulo 6 vamos a ir un paso más allá: no solo hacer las cosas más rápido, sino hacer que algunas se hagan SOLAS. Bienvenido al mundo de la automatización sin código.

Nos vemos ahí.
