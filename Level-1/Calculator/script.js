let expr = '';
let ans = 0;
const exprEl = document.getElementById('expr');
const resultEl = document.getElementById('result');

function updateDisplay() {
  exprEl.textContent = expr || '';
  if (expr === '') { resultEl.textContent = '0'; return; }
  try {
    let e = expr
      .replace(/×/g,'*').replace(/÷/g,'/')
      .replace(/−/g,'-').replace(/%/g,'/100')
      .replace(/√(\d+(\.\d+)?)/g,'Math.sqrt($1)')
      .replace(/√\(([^)]+)\)/g,'Math.sqrt($1)');
    let val = Function('"use strict"; return (' + e + ')')();
    if (isFinite(val)) {
      let disp = parseFloat(val.toFixed(10)).toString();
      resultEl.textContent = disp;
    } else { resultEl.textContent = 'Error'; }
  } catch(ex) { resultEl.textContent = '…'; }
}

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const v = btn.textContent.trim();
    if (v === 'clear') { expr = ''; updateDisplay(); return; }
    if (v === 'del') { expr = expr.slice(0,-1); updateDisplay(); return; }
    if (v === 'ans') { expr += ans.toString(); updateDisplay(); return; }
    if (v === 'ENTER') {
      if (!expr) return;
      try {
        let e = expr.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-').replace(/%/g,'/100').replace(/√(\d+(\.\d+)?)/g,'Math.sqrt($1)').replace(/√\(([^)]+)\)/g,'Math.sqrt($1)');
        let val = Function('"use strict"; return (' + e + ')')();
        if (isFinite(val)) {
          ans = parseFloat(val.toFixed(10));
          exprEl.textContent = expr;
          resultEl.textContent = ans.toString();
          expr = ans.toString();
        } else { resultEl.textContent = 'Error'; expr = ''; }
      } catch(ex) { resultEl.textContent = 'Error'; expr = ''; }
      return;
    }
    if (v === '±') {
      if (expr.startsWith('-')) expr = expr.slice(1);
      else if (expr) expr = '-' + expr;
      updateDisplay(); return;
    }
    expr += v;
    updateDisplay();
  });
});

document.addEventListener('keydown', e => {
  if (e.key >= '0' && e.key <= '9' || e.key === '.') { expr += e.key; updateDisplay(); }
  else if (e.key === '+') { expr += '+'; updateDisplay(); }
  else if (e.key === '-') { expr += '−'; updateDisplay(); }
  else if (e.key === '*') { expr += '×'; updateDisplay(); }
  else if (e.key === '/') { e.preventDefault(); expr += '÷'; updateDisplay(); }
  else if (e.key === '%') { expr += '%'; updateDisplay(); }
  else if (e.key === '(' || e.key === ')') { expr += e.key; updateDisplay(); }
  else if (e.key === 'Backspace') { expr = expr.slice(0,-1); updateDisplay(); }
  else if (e.key === 'Escape') { expr = ''; updateDisplay(); }
  else if (e.key === 'Enter' || e.key === '=') { document.querySelector('.btn-enter').click(); }
});
