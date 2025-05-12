function analisar() {
    const input = document.getElementById("codigo").value;
  
    // Remove comentários HTML
    let semComentarios = input.replace(/<!--[\s\S]*?-->/g, "");
    
    // Remove comentários CSS e JS
    semComentarios = semComentarios.replace(/\/\*[\s\S]*?\*\//g, "");
  
    // Remove linhas em branco
    const linhas = semComentarios.split("\n").filter(linha => linha.trim() !== "");
    const codigoLimpo = linhas.join("\n");
  
    const totalCaracteres = codigoLimpo.length;
  
    const htmlRegex = /<[^>]+>/g;
    const cssRegex = /{[^}]+}/g;
    const jsRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  
    const htmlMatches = codigoLimpo.match(htmlRegex) || [];
    const cssMatches = codigoLimpo.match(cssRegex) || [];
    const jsMatches = [...codigoLimpo.matchAll(jsRegex)];
  
    const htmlChars = htmlMatches.join("").length;
    const cssChars = cssMatches.join("").length;
    const jsChars = jsMatches.map(m => m[1]).join("").length;
  
    const total = htmlChars + cssChars + jsChars;
  
    const percentHTML = ((htmlChars / total) * 100).toFixed(1);
    const percentCSS = ((cssChars / total) * 100).toFixed(1);
    const percentJS = ((jsChars / total) * 100).toFixed(1);
  
    const saida = document.getElementById("saida");
    saida.innerHTML = `
      <li>🟨 HTML: ${percentHTML}%</li>
      <li>🟦 CSS: ${percentCSS}%</li>
      <li>🟩 JavaScript: ${percentJS}%</li>
    `;
  }
  