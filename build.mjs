// Сборка сайта: берём исходник index.src.html (React + JSX через Babel в браузере)
// и превращаем в SEO-friendly статику:
//   1) компилируем JSX заранее (без Babel в браузере),
//   2) предрендерим React в готовый HTML (контент виден поисковику без JS),
//   3) на клиенте — лёгкая гидрация уже готовой разметки.
// Дизайн при этом НЕ меняется — это та же разметка, просто посчитанная заранее.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import babel from '@babel/core';
import React from 'react';
import { renderToString } from 'react-dom/server';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, 'index.src.html');
const OUT_HTML = path.join(__dirname, 'index.html');
const OUT_JS = path.join(__dirname, 'app.js');

const srcHtml = fs.readFileSync(SRC, 'utf8');

// 1. Достаём код React-приложения из <script type="text/babel">…</script>
const m = srcHtml.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);
if (!m) throw new Error('Не найден <script type="text/babel"> в index.src.html');
let appCode = m[1];

// 2. Отрезаем загрузчик (createRoot/render) — он у клиента и сервера разный
appCode = appCode.replace(/const root = ReactDOM\.createRoot[\s\S]*?root\.render\(\s*<App\s*\/>\s*\);?/, '');

// 3. Компилируем JSX -> обычный JS
const { code: compiled } = babel.transformSync(appCode, {
  presets: [['@babel/preset-react', { runtime: 'classic' }]],
  filename: 'app.jsx',
  compact: false,
});

// 4. Серверный рендер в строку HTML
const factory = new Function('React', compiled + '\n;return App;');
const App = factory(React);
const ssrHtml = renderToString(React.createElement(App));

// 5. Клиентский бандл: тот же код + гидрация
const clientJs =
`(function(){
${compiled}
ReactDOM.hydrateRoot(document.getElementById('root'), React.createElement(App));
})();`;
fs.writeFileSync(OUT_JS, clientJs, 'utf8');

// 6. Готовим index.html на основе исходника:
let out = srcHtml;
// убираем Babel-компилятор из браузера (больше не нужен)
out = out.replace(/\s*<!-- Babel for JSX -->\s*<script src="https:\/\/unpkg\.com\/@babel\/standalone\/babel\.min\.js"><\/script>/, '');
// пиним версии React под серверный рендер (совпадение версий для гидрации)
out = out.replace('https://unpkg.com/react@18/umd/react.production.min.js', 'https://unpkg.com/[email protected]/umd/react.production.min.js');
out = out.replace('https://unpkg.com/react-dom@18/umd/react-dom.production.min.js', 'https://unpkg.com/[email protected]/umd/react-dom.production.min.js');
// вставляем предрендеренный HTML внутрь #root
out = out.replace('<div id="root"></div>', `<div id="root">${ssrHtml}</div>`);
// заменяем babel-скрипт на обычный скомпилированный app.js
out = out.replace(/<script type="text\/babel">[\s\S]*?<\/script>/, '<script src="app.js"></script>');

fs.writeFileSync(OUT_HTML, out, 'utf8');
console.log('Сборка готова: index.html (' + ssrHtml.length + ' символов предрендера) + app.js');
