const campoCodigo = document.getElementById("codigo");
const saida = document.getElementById("saida");
const botaoLimpar = document.getElementById("limparinfor");

// Adiciona o evento para limpar o conteúdo
botaoLimpar.addEventListener("click", () => {
  campoCodigo.value = "";   // limpa o campo textarea
  saida.innerHTML = "";     // limpa os resultados da análise
});

// Associa o botão de limpar à função que limpa os campos
document.getElementById("limparinfor").addEventListener("click", () => {
  document.getElementById("codigo").value = "";
  document.getElementById("saida").innerHTML = "";
});

function analisar() {
  const input = document.getElementById("codigo").value;

  // Remove comentários HTML, CSS e JS
  let semComentarios = input
    .replace(/<!--[\s\S]*?-->/g, "")       // HTML
    .replace(/\/\*[\s\S]*?\*\//g, "")      // CSS
    .replace(/\/\/.*/g, "");               // JS linha única

  // Remove linhas em branco
  const linhas = semComentarios.split("\n").filter(l => l.trim() !== "");
  const codigoLimpo = linhas.join("\n");

  const totalCaracteres = codigoLimpo.length;

  // REGEX HTML: pega tags const htmlRegex = /<[^>]+>/g;
  const htmlRegex = /<\s*\/?\s*[a-zA-Z]+\s*[^>]*>/g;

  const htmlMatches = codigoLimpo.match(htmlRegex) || [];
  const htmlChars = htmlMatches.join("").length;

  // REGEX JS: pega tudo dentro de <script>...</script>
  const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  const jsEmScript = [...codigoLimpo.matchAll(scriptRegex)].map(m => m[1]).join("");

  // Se não encontrar JS em <script>, tenta detectar código JS direto
  const jsSoltoRegex = /\b(let|const|var|function|=>|document|window|querySelector|console|\.log)\b/g;
  const isJsSolto = jsSoltoRegex.test(codigoLimpo) && jsEmScript.length === 0;
  const jsChars = isJsSolto ? codigoLimpo.length : jsEmScript.length;

  // REGEX CSS: dentro de <style>...</style>
  const styleRegex = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
  const cssEmStyle = [...codigoLimpo.matchAll(styleRegex)].map(m => m[1]).join("");

  // REGEX CSS solto: pega body{...}, .classe{...}, etc.
  const cssSoltoRegex = /([.#@]?[a-zA-Z0-9\-_:]+[\s]*\{[\s\S]*?\})/g;
  const cssSoltos = codigoLimpo.match(cssSoltoRegex) || [];
  const cssChars = cssEmStyle.length + cssSoltos.join("").length;

  // Soma total detectado
  const total = htmlChars + cssChars + jsChars || 1; // evita divisão por zero

  const percentHTML = ((htmlChars / total) * 100).toFixed(1);
  const percentCSS = ((cssChars / total) * 100).toFixed(1);
  const percentJS = ((jsChars / total) * 100).toFixed(1);

  // Exibe resultado
  const saida = document.getElementById("saida");
  saida.innerHTML = `
    <li>🟨 HTML: ${percentHTML}%</li>
    <li>🟦 CSS: ${percentCSS}%</li>
    <li>🟩 JavaScript: ${percentJS}%</li>
  `;
}
