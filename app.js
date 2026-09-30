const root = document.documentElement;
const langButton = document.querySelector('#lang-toggle');
let lang = 'ar';

function setLanguage(next) {
  lang = next;
  root.lang = lang;
  root.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-ar][data-en]').forEach((node) => {
    node.innerHTML = node.dataset[lang];
  });
  langButton.innerHTML = lang === 'ar' ? 'EN <span>↗</span>' : 'AR <span>↗</span>';
  document.querySelector('#demo-input').placeholder = lang === 'ar' ? 'اكتب أمرًا...' : 'Type a command...';
}
langButton.addEventListener('click', () => setLanguage(lang === 'ar' ? 'en' : 'ar'));

const output = document.querySelector('#console-output');
const input = document.querySelector('#demo-input');
const form = document.querySelector('#demo-form');
const replies = {
  ar: ['تم. أعددت الأمر للتنفيذ على جهاز Windows.', 'وجدت لك النتائج وفتحتها في المتصفح.', 'هذا الأمر يحتاج تأكيدًا قبل التنفيذ.', 'جاهز. يمكنك تجربة أمر آخر.'],
  en: ['Done. I prepared the command for execution on Windows.', 'I found the results and opened them in your browser.', 'This command needs confirmation before execution.', 'Ready. Try another command.']
};
function addLine(kind, text) {
  const line = document.createElement('div');
  line.className = `line ${kind}`;
  line.textContent = text;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}
function demoCommand(command) {
  if (!command.trim()) return;
  addLine('user', `${lang === 'ar' ? 'أنت' : 'You'}: ${command}`);
  const lower = command.toLowerCase();
  let reply = replies[lang][3];
  if (lower.includes('بحث') || lower.includes('search')) reply = replies[lang][1];
  else if (lower.includes('إيقاف') || lower.includes('shutdown') || lower.includes('حذف') || lower.includes('delete')) reply = replies[lang][2];
  else if (lower.includes('افتح') || lower.includes('open') || lower.includes('شغّل') || lower.includes('run')) reply = replies[lang][0];
  setTimeout(() => addLine('reply', `JARVIS: ${reply}`), 280);
}
form.addEventListener('submit', (event) => { event.preventDefault(); demoCommand(input.value); input.value = ''; });
document.querySelectorAll('[data-command]').forEach((button) => button.addEventListener('click', () => demoCommand(button.dataset.command)));
