(function(){
  if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') return; // нет React — оставляем статичный контент
  try {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  useEffect
} = React;

// Хелпер для отправки целей в Яндекс.Метрику (безопасен, если Метрика не загрузилась)
const track = goal => {
  try {
    if (window.ym && window.YM_ID) window.ym(window.YM_ID, 'reachGoal', goal);
  } catch (e) {/* Метрика недоступна — игнорируем */}
};

// --- ICONS ---
const Icons = {
  Play: props => /*#__PURE__*/React.createElement("svg", _extends({}, props, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "none"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "5 3 19 12 5 21 5 3"
  })),
  ChevronRight: props => /*#__PURE__*/React.createElement("svg", _extends({}, props, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m9 18 6-6-6-6"
  })),
  Check: props => /*#__PURE__*/React.createElement("svg", _extends({}, props, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  })),
  X: props => /*#__PURE__*/React.createElement("svg", _extends({}, props, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  })),
  Menu: props => /*#__PURE__*/React.createElement("svg", _extends({}, props, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4",
    x2: "20",
    y1: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4",
    x2: "20",
    y1: "6",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4",
    x2: "20",
    y1: "18",
    y2: "18"
  })),
  Shield: props => /*#__PURE__*/React.createElement("svg", _extends({}, props, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
  })),
  User: props => /*#__PURE__*/React.createElement("svg", _extends({}, props, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "7",
    r: "4"
  })),
  Pizza: props => /*#__PURE__*/React.createElement("svg", _extends({}, props, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15 11h.01"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11 15h.01"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 16h.01"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 16h20"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 16v4c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 16.13a7.6 7.6 0 0 1 2.5-4.5c2.3-1.8 4.5-2.6 6.5-5.9a2.1 2.1 0 0 1 3.5 1.5c1.4 5 4.3 6.9 7.5 8.9"
  })),
  Camera: props => /*#__PURE__*/React.createElement("svg", _extends({}, props, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "13",
    r: "3"
  })),
  Star: props => /*#__PURE__*/React.createElement("svg", _extends({}, props, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "none"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
  })),
  Clock: props => /*#__PURE__*/React.createElement("svg", _extends({}, props, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 6 12 12 16 14"
  })),
  MapPin: props => /*#__PURE__*/React.createElement("svg", _extends({}, props, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "10",
    r: "3"
  })),
  Phone: props => /*#__PURE__*/React.createElement("svg", _extends({}, props, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
  })),
  Send: props => /*#__PURE__*/React.createElement("svg", _extends({}, props, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m22 2-7 20-4-9-9-4Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 2 11 13"
  })),
  Instagram: props => /*#__PURE__*/React.createElement("svg", _extends({}, props, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "20",
    height: "20",
    x: "2",
    y: "2",
    rx: "5",
    ry: "5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "17.5",
    x2: "17.51",
    y1: "6.5",
    y2: "6.5"
  })),
  Vk: props => /*#__PURE__*/React.createElement("svg", _extends({}, props, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13.6 21.6C7.9 21.6 4.3 17.6 2.7 10H5.6C6.1 14.1 7.9 15.9 9.3 16.3V10H12V13.6C13.7 13.4 15.4 11.5 16 10H18.8C18.3 12.3 16.6 14 15.4 14.7C16.6 15.3 18.5 16.8 19.3 21.6H16.2C15.6 18.9 13.4 16.8 12.3 16.2V21.6H13.6Z"
  })),
  Award: props => /*#__PURE__*/React.createElement("svg", _extends({}, props, {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8",
    r: "7"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "8.21 13.89 7 23 12 20 17 23 15.79 13.88"
  })),
  Briefcase: props => /*#__PURE__*/React.createElement("svg", _extends({}, props, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "20",
    height: "14",
    x: "2",
    y: "7",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
  })),
  Video: props => /*#__PURE__*/React.createElement("svg", _extends({}, props, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m22 8-6 4 6 4V8Z"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "14",
    height: "12",
    x: "2",
    y: "6",
    rx: "2",
    ry: "2"
  })),
  Mic: props => /*#__PURE__*/React.createElement("svg", _extends({}, props, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 10v2a7 7 0 0 1-14 0v-2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    x2: "12",
    y1: "19",
    y2: "23"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    x2: "16",
    y1: "23",
    y2: "23"
  })),
  Trophy: props => /*#__PURE__*/React.createElement("svg", _extends({}, props, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 22h16"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 14.66V17"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 14.66V17"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 2H6v7a6 6 0 0 0 12 0V2Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 22l1-4.66"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15.5 22l-1-4.66"
  })),
  Music: props => /*#__PURE__*/React.createElement("svg", _extends({}, props, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 18V5l12-2v13"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "18",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "16",
    r: "3"
  })),
  Globe: props => /*#__PURE__*/React.createElement("svg", _extends({}, props, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 12h20"
  })),
  Film: props => /*#__PURE__*/React.createElement("svg", _extends({}, props, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "18",
    height: "18",
    x: "3",
    y: "3",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "7",
    x2: "7",
    y1: "3",
    y2: "21"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "17",
    x2: "17",
    y1: "3",
    y2: "21"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    x2: "21",
    y1: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    x2: "7",
    y1: "7",
    y2: "7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    x2: "7",
    y1: "17",
    y2: "17"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "17",
    x2: "21",
    y1: "17",
    y2: "17"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "17",
    x2: "21",
    y1: "7",
    y2: "7"
  }))
};
const PrivacyModal = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md modal-overlay",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900 border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative text-slate-300 p-8",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:text-amber-400 transition-colors z-10"
  }, /*#__PURE__*/React.createElement(Icons.X, {
    className: "w-6 h-6"
  })), /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-white mb-6 font-cinematic uppercase"
  }, "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4 text-sm"
  }, /*#__PURE__*/React.createElement("p", null, "\u041D\u0430\u0441\u0442\u043E\u044F\u0449\u0430\u044F \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0441\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0430 \u0432 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0438 \u0441 \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u044F\u043C\u0438 \u0424\u0435\u0434\u0435\u0440\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0437\u0430\u043A\u043E\u043D\u0430 \u043E\u0442 27.07.2006. \u2116152-\u0424\u0417 \xAB\u041E \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445\xBB \u0438 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u0442 \u043F\u043E\u0440\u044F\u0434\u043E\u043A \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0438 \u043C\u0435\u0440\u044B \u043F\u043E \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0435\u043D\u0438\u044E \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445, \u043F\u0440\u0435\u0434\u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u043C\u044B\u0435 \u0426\u0435\u043D\u0442\u0440\u043E\u043C \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u044F \xAB\u0422\u0440\u0438 \u041A\u0438\u0442\u0430\xBB (\u0434\u0430\u043B\u0435\u0435 \u2014 \u041E\u043F\u0435\u0440\u0430\u0442\u043E\u0440)."), /*#__PURE__*/React.createElement("p", null, "1. \u041E\u043F\u0435\u0440\u0430\u0442\u043E\u0440 \u0441\u0442\u0430\u0432\u0438\u0442 \u0441\u0432\u043E\u0435\u0439 \u0432\u0430\u0436\u043D\u0435\u0439\u0448\u0435\u0439 \u0446\u0435\u043B\u044C\u044E \u0438 \u0443\u0441\u043B\u043E\u0432\u0438\u0435\u043C \u043E\u0441\u0443\u0449\u0435\u0441\u0442\u0432\u043B\u0435\u043D\u0438\u044F \u0441\u0432\u043E\u0435\u0439 \u0434\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u0441\u043E\u0431\u043B\u044E\u0434\u0435\u043D\u0438\u0435 \u043F\u0440\u0430\u0432 \u0438 \u0441\u0432\u043E\u0431\u043E\u0434 \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u0430 \u0438 \u0433\u0440\u0430\u0436\u0434\u0430\u043D\u0438\u043D\u0430 \u043F\u0440\u0438 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0435 \u0435\u0433\u043E \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445, \u0432 \u0442\u043E\u043C \u0447\u0438\u0441\u043B\u0435 \u0437\u0430\u0449\u0438\u0442\u044B \u043F\u0440\u0430\u0432 \u043D\u0430 \u043D\u0435\u043F\u0440\u0438\u043A\u043E\u0441\u043D\u043E\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0447\u0430\u0441\u0442\u043D\u043E\u0439 \u0436\u0438\u0437\u043D\u0438, \u043B\u0438\u0447\u043D\u0443\u044E \u0438 \u0441\u0435\u043C\u0435\u0439\u043D\u0443\u044E \u0442\u0430\u0439\u043D\u0443."), /*#__PURE__*/React.createElement("p", null, "2. \u041E\u043F\u0435\u0440\u0430\u0442\u043E\u0440 \u043C\u043E\u0436\u0435\u0442 \u043E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0442\u044C \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F: \u0424\u0430\u043C\u0438\u043B\u0438\u044F, \u0438\u043C\u044F, \u043E\u0442\u0447\u0435\u0441\u0442\u0432\u043E; \u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u044B\u0439 \u0430\u0434\u0440\u0435\u0441; \u041D\u043E\u043C\u0435\u0440\u0430 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u043E\u0432; \u0414\u0430\u043D\u043D\u044B\u0435 \u043E \u0434\u0435\u0442\u044F\u0445 (\u0438\u043C\u044F, \u0432\u043E\u0437\u0440\u0430\u0441\u0442), \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u044B\u0435 \u0434\u043B\u044F \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0443\u0441\u043B\u0443\u0433."), /*#__PURE__*/React.createElement("p", null, "3. \u0426\u0435\u043B\u044C \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u2014 \u0438\u043D\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u043E\u0441\u0440\u0435\u0434\u0441\u0442\u0432\u043E\u043C \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u044B\u0445 \u043F\u0438\u0441\u0435\u043C; \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043A \u0441\u0435\u0440\u0432\u0438\u0441\u0430\u043C, \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u0438/\u0438\u043B\u0438 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u0430\u043C, \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0449\u0438\u043C\u0441\u044F \u043D\u0430 \u0432\u0435\u0431-\u0441\u0430\u0439\u0442\u0435; \u0437\u0430\u043F\u0438\u0441\u044C \u043D\u0430 \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u044B."), /*#__PURE__*/React.createElement("p", null, "4. \u041E\u043F\u0435\u0440\u0430\u0442\u043E\u0440 \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0438\u0432\u0430\u0435\u0442 \u0441\u043E\u0445\u0440\u0430\u043D\u043D\u043E\u0441\u0442\u044C \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0438 \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442 \u0432\u0441\u0435 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u044B\u0435 \u043C\u0435\u0440\u044B, \u0438\u0441\u043A\u043B\u044E\u0447\u0430\u044E\u0449\u0438\u0435 \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u043C \u0434\u0430\u043D\u043D\u044B\u043C \u043D\u0435\u0443\u043F\u043E\u043B\u043D\u043E\u043C\u043E\u0447\u0435\u043D\u043D\u044B\u0445 \u043B\u0438\u0446."), /*#__PURE__*/React.createElement("p", null, "5. \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043C\u043E\u0436\u0435\u0442 \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043B\u044E\u0431\u044B\u0435 \u0440\u0430\u0437\u044A\u044F\u0441\u043D\u0435\u043D\u0438\u044F \u043F\u043E \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0443\u044E\u0449\u0438\u043C \u0432\u043E\u043F\u0440\u043E\u0441\u0430\u043C, \u043A\u0430\u0441\u0430\u044E\u0449\u0438\u043C\u0441\u044F \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0435\u0433\u043E \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445, \u043E\u0431\u0440\u0430\u0442\u0438\u0432\u0448\u0438\u0441\u044C \u043A \u041E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0443."))));
};
const CookieConsent = ({
  onOpenPrivacy
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const acceptCookies = () => {
    setIsVisible(false);
  };
  if (!isVisible) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-0 left-0 right-0 z-[100] p-4 bg-slate-900/95 backdrop-blur-md border-t border-white/10 cookie-banner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto flex flex-col md:flex-row items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-slate-300 text-xs md:text-sm text-center md:text-left"
  }, "\u041C\u044B \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u0444\u0430\u0439\u043B\u044B cookie \u0434\u043B\u044F \u0443\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u044F \u0440\u0430\u0431\u043E\u0442\u044B \u0441\u0430\u0439\u0442\u0430. \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0441\u0430\u0439\u0442, \u0432\u044B \u0441\u043E\u0433\u043B\u0430\u0448\u0430\u0435\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u0448\u0435\u0439 ", /*#__PURE__*/React.createElement("button", {
    onClick: onOpenPrivacy,
    className: "text-amber-400 hover:underline bg-transparent border-0 p-0 inline"
  }, "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u043E\u0439 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438"), "."), /*#__PURE__*/React.createElement("button", {
    onClick: acceptCookies,
    className: "px-6 py-2 bg-amber-400 text-black font-bold uppercase text-xs tracking-widest rounded-sm hover:bg-white transition-colors shrink-0"
  }, "\u0421\u043E\u0433\u043B\u0430\u0441\u0438\u0442\u044C\u0441\u044F")));
};
const VideoModal = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md modal-overlay",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:text-amber-400 transition-colors z-10"
  }, /*#__PURE__*/React.createElement(Icons.X, {
    className: "w-6 h-6"
  })), /*#__PURE__*/React.createElement("div", {
    className: "w-full h-full flex items-center justify-center text-slate-500"
  }, /*#__PURE__*/React.createElement("iframe", {
    src: "https://drive.google.com/file/d/1xumuKAX0jAFds9mSpXsgRVe_H2tlgtpz/preview",
    width: "100%",
    height: "100%",
    frameBorder: "0",
    allow: "autoplay"
  }))));
};
const Modal = ({
  isOpen,
  onClose,
  mission
}) => {
  const [activeTab, setActiveTab] = useState('info');
  if (!isOpen || !mission) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md modal-overlay",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900 border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative modal-scroll flex flex-col md:flex-row shadow-[0_0_50px_rgba(0,0,0,0.5)]",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:text-amber-400 transition-colors z-20"
  }, /*#__PURE__*/React.createElement(Icons.X, {
    className: "w-6 h-6"
  })), /*#__PURE__*/React.createElement("div", {
    className: "w-full md:w-1/3 h-48 md:h-auto bg-cover bg-center relative shrink-0",
    style: {
      backgroundImage: `url(${mission.modalImage})`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:bg-gradient-to-r"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-4 left-4 md:bottom-8 md:left-8"
  }, /*#__PURE__*/React.createElement("span", {
    className: `inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-2 text-black ${mission.bg}`
  }, mission.dates), /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl md:text-3xl font-bold text-white font-cinematic uppercase leading-none"
  }, mission.title))), /*#__PURE__*/React.createElement("div", {
    className: "w-full md:w-2/3 flex flex-col h-full min-h-[500px]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex border-b border-white/10"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveTab('info'),
    className: `flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === 'info' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-500 hover:text-white'}`
  }, "\u0418\u043D\u0444\u043E"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveTab('program'),
    className: `flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === 'program' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-500 hover:text-white'}`
  }, "\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveTab('project'),
    className: `flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === 'project' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-500 hover:text-white'}`
  }, "\u041F\u0440\u043E\u0435\u043A\u0442")), /*#__PURE__*/React.createElement("div", {
    className: "p-6 md:p-8 overflow-y-auto flex-1"
  }, activeTab === 'info' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-white font-bold uppercase text-xs mb-2 opacity-50"
  }, "\u041B\u0435\u0433\u0435\u043D\u0434\u0430"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-300 leading-relaxed text-sm md:text-base"
  }, mission.legendFull)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-white font-bold uppercase text-xs mb-2 opacity-50"
  }, "\u041F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u0438 \u0441\u043C\u0435\u043D\u044B"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, mission.professions.map((prof, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "px-3 py-1 bg-white/5 rounded-full text-xs text-emerald-400 border border-white/10"
  }, prof)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-white font-bold uppercase text-xs mb-2 opacity-50"
  }, "\u041D\u0430\u0432\u044B\u043A\u0438 (\u041F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0438 \u043B\u0438\u0447\u043D\u044B\u0435 \u043A\u043E\u043C\u043F\u0435\u0442\u0435\u043D\u0446\u0438\u0438)"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-2 text-slate-400 text-sm"
  }, mission.learnList.map((item, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement(Icons.Check, {
    className: "w-4 h-4 text-amber-500 shrink-0"
  }), " ", item))))), activeTab === 'program' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-amber-900/10 border border-amber-500/20 p-4 rounded-lg mb-4"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-amber-400 font-bold uppercase text-xs mb-2"
  }, "\u0420\u0430\u0441\u043F\u043E\u0440\u044F\u0434\u043E\u043A \u0434\u043D\u044F"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-300 flex flex-wrap gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "whitespace-nowrap px-2 py-1 bg-white/5 rounded"
  }, "09:00 \u0421\u0431\u043E\u0440"), /*#__PURE__*/React.createElement("span", {
    className: "whitespace-nowrap px-2 py-1 bg-white/5 rounded"
  }, "09:30 \u041F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u043D\u0430\u0432\u044B\u043A\u0438"), /*#__PURE__*/React.createElement("span", {
    className: "whitespace-nowrap px-2 py-1 bg-white/5 rounded"
  }, "11:30 \u041F\u0440\u043E\u0435\u043A\u0442\u044B"), /*#__PURE__*/React.createElement("span", {
    className: "whitespace-nowrap px-2 py-1 bg-white/5 rounded"
  }, "13:00 \u041E\u0431\u0435\u0434"), /*#__PURE__*/React.createElement("span", {
    className: "whitespace-nowrap px-2 py-1 bg-white/5 rounded"
  }, "15:00 \u041A\u0432\u0435\u0441\u0442\u044B"), /*#__PURE__*/React.createElement("span", {
    className: "whitespace-nowrap px-2 py-1 bg-white/5 rounded"
  }, "17:00 \u0420\u0435\u0444\u043B\u0435\u043A\u0441\u0438\u044F"), /*#__PURE__*/React.createElement("span", {
    className: "whitespace-nowrap px-2 py-1 bg-white/5 rounded"
  }, "18:00 \u0414\u043E\u043C"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-0 relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute left-[5px] top-2 bottom-4 w-[2px] bg-gradient-to-b from-amber-500 via-purple-500 to-transparent opacity-50"
  }), mission.program.map((day, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "relative pl-6 pb-6 last:pb-0 group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute -left-1 top-1 w-3 h-3 rounded-full bg-slate-900 border-2 border-amber-500 group-hover:bg-amber-400 transition-colors shadow-[0_0_10px_rgba(245,158,11,0.5)]"
  }), /*#__PURE__*/React.createElement("h5", {
    className: "text-white font-bold text-sm mb-1 group-hover:text-amber-400 transition-colors"
  }, day.title), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-xs leading-relaxed"
  }, day.desc))))), activeTab === 'project' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center p-6 bg-gradient-to-br from-white/5 to-transparent rounded-xl border border-white/10"
  }, /*#__PURE__*/React.createElement(Icons.Award, {
    className: "w-12 h-12 text-amber-400 mx-auto mb-4"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-white mb-2"
  }, mission.project.title), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-sm"
  }, "\u0420\u0435\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0440\u0435\u0431\u0435\u043D\u043E\u043A \u0437\u0430\u0431\u0435\u0440\u0435\u0442 \u0434\u043E\u043C\u043E\u0439.")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 gap-3"
  }, mission.project.items.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold text-xs"
  }, i + 1), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-300 text-sm"
  }, item)))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 pt-4 border-t border-white/10"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-white font-bold uppercase text-xs mb-3 opacity-50"
  }, "\u0412\u044B\u0435\u0437\u0434\u044B \u0438 \u042D\u043A\u0441\u043A\u0443\u0440\u0441\u0438\u0438"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-2 text-slate-400 text-sm"
  }, mission.excursions.map((item, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-purple-400"
  }, "\uD83D\uDE80"), " ", item)))))), /*#__PURE__*/React.createElement("div", {
    className: "p-6 border-t border-white/10"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      track('booking_click');
      onClose();
      document.getElementById('заявка').scrollIntoView({
        behavior: 'smooth'
      });
    },
    className: "w-full py-4 bg-amber-400 hover:bg-white text-black font-bold uppercase tracking-widest transition-all rounded-sm shadow-neon"
  }, "\u0425\u043E\u0447\u0443 \u0432 \u044D\u0442\u043E\u0442 \u044D\u043A\u0438\u043F\u0430\u0436")))));
};
const Nav = ({
  onOpenPrivacy
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return /*#__PURE__*/React.createElement("nav", {
    className: `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-deep/95 backdrop-blur-md py-4 border-b border-white/5 shadow-lg' : 'py-6 bg-transparent'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-6 flex justify-between items-center relative z-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 flex-1 justify-start"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 bg-gradient-to-tr from-amber-400 to-amber-600 rounded flex items-center justify-center font-bold text-black font-cinematic text-2xl shadow-[0_0_15px_rgba(251,191,36,0.3)] shrink-0 mt-4"
  }, "\u042D"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col justify-center h-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] tracking-[0.3em] uppercase text-amber-400 font-bold leading-tight mb-0.5"
  }, "\u041B\u0435\u0442\u043D\u0438\u0439 \u041F\u0440\u043E\u0435\u043A\u0442"), /*#__PURE__*/React.createElement("div", {
    className: "text-lg md:text-xl font-bold tracking-tight uppercase font-cinematic leading-none text-white"
  }, "\u042D\u043D\u0446\u0438\u043A\u043B\u043E\u043F\u0435\u0434\u0438\u044F", /*#__PURE__*/React.createElement("br", null), "\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0433\u043E")))), /*#__PURE__*/React.createElement("div", {
    className: "hidden lg:flex items-center gap-10"
  }, ['Сюжет', 'Методика', 'Безопасность', 'Галерея', 'Вопросы'].map(item => /*#__PURE__*/React.createElement("a", {
    key: item,
    href: `#${item.toLowerCase()}`,
    className: "text-xs font-bold uppercase tracking-[0.15em] text-slate-400 hover:text-white transition-colors relative group"
  }, item, /*#__PURE__*/React.createElement("span", {
    className: "absolute -bottom-2 left-0 w-0 h-[2px] bg-amber-400 transition-all duration-300 group-hover:w-full"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-6 flex-1 justify-end"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => document.getElementById('pricing').scrollIntoView({
      behavior: 'smooth'
    }),
    className: "hidden lg:flex items-center gap-3 px-8 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-amber-400 transition-all duration-300 group rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.1)]"
  }, /*#__PURE__*/React.createElement("span", null, "\u0412\u0441\u0442\u0443\u043F\u0438\u0442\u044C"), /*#__PURE__*/React.createElement(Icons.ChevronRight, {
    className: "w-4 h-4 transition-transform group-hover:translate-x-1"
  })), /*#__PURE__*/React.createElement("button", {
    className: "lg:hidden text-white",
    onClick: () => setIsMobileOpen(!isMobileOpen)
  }, isMobileOpen ? /*#__PURE__*/React.createElement(Icons.X, null) : /*#__PURE__*/React.createElement(Icons.Menu, null)))), isMobileOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-deep/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 animate-fade-in"
  }, ['Сюжет', 'Методика', 'Безопасность', 'Галерея', 'Вопросы'].map(item => /*#__PURE__*/React.createElement("a", {
    key: item,
    href: `#${item.toLowerCase()}`,
    onClick: () => setIsMobileOpen(false),
    className: "text-2xl font-bold uppercase tracking-widest text-white font-cinematic"
  }, item)), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      document.getElementById('pricing').scrollIntoView({
        behavior: 'smooth'
      });
      setIsMobileOpen(false);
    },
    className: "px-8 py-4 bg-amber-400 text-black font-bold uppercase tracking-widest rounded-sm mt-4"
  }, "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E")));
};
const Hero = ({
  onOpenVideo
}) => {
  return /*#__PURE__*/React.createElement("header", {
    className: "relative min-h-screen flex items-center justify-center overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-deep z-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 hero-bg bg-cover bg-center opacity-40 mix-blend-lighten"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-space-nebula opacity-90"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"
  })), /*#__PURE__*/React.createElement("div", {
    className: "relative z-10 container mx-auto px-6 text-center mt-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md mb-8 animate-fade-in-up"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_10px_#f59e0b]"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold tracking-[0.2em] uppercase text-amber-200"
  }, "\u041F\u0440\u0435\u043C\u044C\u0435\u0440\u0430 \u0441\u0435\u0437\u043E\u043D\u0430 2026")), /*#__PURE__*/React.createElement("h1", {
    className: "text-5xl md:text-7xl lg:text-9xl font-bold leading-[0.9] tracking-tighter mb-8 font-cinematic animate-fade-in-up uppercase",
    style: {
      animationDelay: '0.1s'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "block text-white drop-shadow-2xl"
  }, "\u042D\u043D\u0446\u0438\u043A\u043B\u043E\u043F\u0435\u0434\u0438\u044F"), /*#__PURE__*/React.createElement("span", {
    className: "block text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-500 to-amber-700 pb-4"
  }, "\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0433\u043E")), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-200 text-lg md:text-2xl max-w-3xl mx-auto mb-10 animate-fade-in-up font-medium leading-relaxed",
    style: {
      animationDelay: '0.2s'
    }
  }, "\u041A\u0430\u043D\u0438\u043A\u0443\u043B\u044B, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043C\u0435\u043D\u044F\u044E\u0442 \u043C\u044B\u0448\u043B\u0435\u043D\u0438\u0435. ", /*#__PURE__*/React.createElement("br", null), "\u041C\u044B \u0443\u0447\u0438\u043C \u0434\u0435\u0442\u0435\u0439 \u043D\u0435 \u0441\u0434\u0430\u0432\u0430\u0442\u044C\u0441\u044F, \u0434\u0443\u043C\u0430\u0442\u044C, \u0434\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0438 \u0441\u043E\u0437\u0434\u0430\u0432\u0430\u0442\u044C \u0431\u0443\u0434\u0443\u0449\u0435\u0435."), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row items-center justify-center gap-6 animate-fade-in-up",
    style: {
      animationDelay: '0.3s'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => document.getElementById('сюжет').scrollIntoView({
      behavior: 'smooth'
    }),
    className: "group relative px-10 py-5 bg-amber-400 text-black font-bold uppercase tracking-widest text-sm overflow-hidden hover:scale-105 transition-transform duration-300 rounded-sm shadow-neon"
  }, /*#__PURE__*/React.createElement("span", {
    className: "relative z-10 flex items-center gap-3"
  }, "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0421\u044E\u0436\u0435\u0442 ", /*#__PURE__*/React.createElement(Icons.Play, {
    className: "w-4 h-4 fill-black"
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: onOpenVideo,
    className: "flex items-center gap-3 px-8 py-5 border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-all rounded-sm backdrop-blur-md"
  }, /*#__PURE__*/React.createElement(Icons.Camera, {
    className: "w-5 h-5 text-amber-400"
  }), /*#__PURE__*/React.createElement("span", null, "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0432\u0438\u0434\u0435\u043E")))));
};
const Methodology = () => {
  return /*#__PURE__*/React.createElement("section", {
    id: "\u043C\u0435\u0442\u043E\u0434\u0438\u043A\u0430",
    className: "py-24 bg-deep relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-16"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl md:text-5xl font-bold text-white mb-4 font-cinematic uppercase"
  }, "\u041C\u0435\u0445\u0430\u043D\u0438\u043A\u0430 \u0411\u043B\u043E\u043A\u0431\u0430\u0441\u0442\u0435\u0440\u0430"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 max-w-2xl mx-auto"
  }, "\u041C\u044B \u043E\u0431\u044A\u0435\u0434\u0438\u043D\u0438\u043B\u0438 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435 \u0438 \u0438\u0433\u0440\u0443. \u0414\u0435\u0442\u0438 \u0434\u0443\u043C\u0430\u044E\u0442, \u0447\u0442\u043E \u0440\u0430\u0437\u0432\u043B\u0435\u043A\u0430\u044E\u0442\u0441\u044F,", /*#__PURE__*/React.createElement("br", null), "\u043D\u043E \u043D\u0430 \u0441\u0430\u043C\u043E\u043C \u0434\u0435\u043B\u0435 \u2014 \u0443\u0447\u0430\u0442\u0441\u044F.")), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-8 rounded-2xl hover:border-amber-500/50 transition-colors group"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-amber-400 text-sm font-bold uppercase tracking-widest mb-2"
  }, "\u0412\u043C\u0435\u0441\u0442\u043E \u0437\u0430\u0434\u0430\u043D\u0438\u0439"), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-white mb-3 uppercase"
  }, "\u0411\u043E\u043B\u044C\u0448\u0430\u044F \u0418\u0433\u0440\u0430"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-sm leading-relaxed"
  }, "\u041D\u0435 \u0441\u043A\u0443\u0447\u043D\u044B\u0435 \u0443\u0440\u043E\u043A\u0438, \u0430 \u0433\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u0430\u044F \u043C\u0438\u0441\u0441\u0438\u044F. \u0420\u0435\u0431\u0435\u043D\u043E\u043A \u0447\u0443\u0432\u0441\u0442\u0432\u0443\u0435\u0442 \u0441\u0435\u0431\u044F \u0433\u0435\u0440\u043E\u0435\u043C \u0444\u0438\u043B\u044C\u043C\u0430, \u043E\u0442 \u0440\u0435\u0448\u0435\u043D\u0438\u0439 \u043A\u043E\u0442\u043E\u0440\u043E\u0433\u043E \u0437\u0430\u0432\u0438\u0441\u0438\u0442 \u0444\u0438\u043D\u0430\u043B.")), /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-8 rounded-2xl hover:border-emerald-500/50 transition-colors group"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-emerald-400 text-sm font-bold uppercase tracking-widest mb-2"
  }, "\u0412\u043C\u0435\u0441\u0442\u043E \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u0439"), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-white mb-3 uppercase"
  }, "\u041B\u0430\u0431\u043E\u0440\u0430\u0442\u043E\u0440\u0438\u044F"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-sm leading-relaxed"
  }, "\u0423 \u043D\u0430\u0441 \u043D\u0435\u0442 \u043E\u0442\u0432\u0435\u0442\u043E\u0432 \u0432 \u043A\u043E\u043D\u0446\u0435 \u0443\u0447\u0435\u0431\u043D\u0438\u043A\u0430. \u0415\u0441\u0442\u044C \u0433\u0438\u043F\u043E\u0442\u0435\u0437\u044B \u0438 \u0442\u0435\u0441\u0442\u044B. \u041C\u044B \u0443\u0447\u0438\u043C \u043C\u044B\u0441\u043B\u0438\u0442\u044C, \u0430 \u043D\u0435 \u0437\u0443\u0431\u0440\u0438\u0442\u044C.")), /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-8 rounded-2xl hover:border-purple-500/50 transition-colors group"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-purple-400 text-sm font-bold uppercase tracking-widest mb-2"
  }, "\u0412\u043C\u0435\u0441\u0442\u043E \u043E\u0446\u0435\u043D\u043E\u043A"), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-white mb-3 uppercase"
  }, "\u0422\u043E\u0447\u043A\u0430 \u0420\u043E\u0441\u0442\u0430"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-sm leading-relaxed"
  }, "\u041E\u0448\u0438\u0431\u0441\u044F? \u041E\u0442\u043B\u0438\u0447\u043D\u043E! \u0422\u0435\u043F\u0435\u0440\u044C \u0443 \u0442\u0435\u0431\u044F \u0435\u0441\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435, \u0447\u0442\u043E\u0431\u044B \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u043B\u0443\u0447\u0448\u0435. \u0410\u043D\u0430\u043B\u0438\u0437\u0438\u0440\u0443\u0435\u043C, \u0438\u0441\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C \u0438 \u043F\u043E\u0431\u0435\u0436\u0434\u0430\u0435\u043C.")), /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-8 rounded-2xl hover:border-primary transition-colors group"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-primary text-sm font-bold uppercase tracking-widest mb-2"
  }, "\u0412\u043C\u0435\u0441\u0442\u043E \u0432\u0438\u0440\u0442\u0443\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438"), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-white mb-3 uppercase"
  }, "\u0421\u0443\u043F\u0435\u0440-\u041A\u043E\u043C\u0430\u043D\u0434\u0430"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-sm leading-relaxed"
  }, "\u041A\u0430\u0436\u0434\u044B\u0439 \u043D\u0430\u0445\u043E\u0434\u0438\u0442 \u0441\u0432\u043E\u044E \u0440\u043E\u043B\u044C. \u0418\u043D\u0436\u0435\u043D\u0435\u0440, \u0441\u0442\u0440\u0430\u0442\u0435\u0433, \u043F\u0435\u0440\u0435\u0433\u043E\u0432\u043E\u0440\u0449\u0438\u043A. \u041C\u044B \u0443\u0447\u0438\u043C, \u0447\u0442\u043E \u0432\u043C\u0435\u0441\u0442\u0435 \u043C\u043E\u0436\u043D\u043E \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0442\u043E, \u0447\u0442\u043E \u043D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u043E\u0434\u043D\u043E\u043C\u0443.")))));
};
const Events = () => {
  return /*#__PURE__*/React.createElement("section", {
    className: "py-24 bg-deep relative border-t border-white/5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-16"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl md:text-5xl font-bold text-white mb-4 font-cinematic uppercase"
  }, "\u0410\u0444\u0438\u0448\u0430 \u0421\u043E\u0431\u044B\u0442\u0438\u0439"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 max-w-2xl mx-auto"
  }, "\u041A\u0430\u0436\u0434\u044B\u0439 \u0434\u0435\u043D\u044C \u2014 \u044D\u0442\u043E \u043D\u043E\u0432\u043E\u0435 \u0448\u043E\u0443")), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-xl hover:bg-white/5 transition-colors"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mb-4 text-amber-400"
  }, /*#__PURE__*/React.createElement(Icons.Briefcase, {
    className: "w-6 h-6"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "text-white font-bold text-lg mb-2"
  }, "\u0411\u0438\u0437\u043D\u0435\u0441-\u042F\u0441\u043B\u0438"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-sm"
  }, "\u0412\u0441\u0442\u0440\u0435\u0447\u0438 \u0441 \u043F\u0440\u0435\u0434\u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0442\u0435\u043B\u044F\u043C\u0438 \u0438 \u0432\u044B\u0434\u0430\u044E\u0449\u0438\u043C\u0438\u0441\u044F \u043B\u044E\u0434\u044C\u043C\u0438 \u0433\u043E\u0440\u043E\u0434\u0430. \u0424\u043E\u0440\u043C\u0430\u0442 \u043D\u0430\u0441\u0442\u0430\u0432\u043D\u0438\u0447\u0435\u0441\u0442\u0432\u0430 \u0438 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u0439 \u043F\u0440\u043E\u0444\u043E\u0440\u0438\u0435\u043D\u0442\u0430\u0446\u0438\u0438")), /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-xl hover:bg-white/5 transition-colors"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 text-purple-400"
  }, /*#__PURE__*/React.createElement(Icons.Video, {
    className: "w-6 h-6"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "text-white font-bold text-lg mb-2"
  }, "\u0421\u044A\u0435\u043C\u043A\u0430 \u0411\u043B\u043E\u043A\u0431\u0430\u0441\u0442\u0435\u0440\u0430"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-sm"
  }, "\u041D\u0430\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u044F, \u0441\u044A\u0435\u043C\u043A\u0430, \u043C\u043E\u043D\u0442\u0430\u0436. \u0423\u0447\u0430\u0441\u0442\u0438\u0435 \u0432 \u0440\u0435\u0430\u043B\u0438\u0442\u0438-\u0448\u043E\u0443 \u0432 \u0440\u0435\u0436\u0438\u043C\u0435 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0432\u0440\u0435\u043C\u0435\u043D\u0438")), /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-xl hover:bg-white/5 transition-colors"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 text-emerald-400"
  }, /*#__PURE__*/React.createElement(Icons.Mic, {
    className: "w-6 h-6"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "text-white font-bold text-lg mb-2"
  }, "\u041A\u043E\u043D\u0444\u0435\u0440\u0435\u043D\u0446\u0438\u0438 \u0438 \u0422\u043E\u043A-\u0448\u043E\u0443"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-sm"
  }, "\u0414\u0435\u0431\u0430\u0442\u044B, \u0437\u0430\u0449\u0438\u0442\u0430 \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432, \u043F\u0443\u0431\u043B\u0438\u0447\u043D\u044B\u0435 \u0432\u044B\u0441\u0442\u0443\u043F\u043B\u0435\u043D\u0438\u044F. \u0423\u0447\u0438\u043C\u0441\u044F \u0430\u0440\u0433\u0443\u043C\u0435\u043D\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0438 \u0443\u0431\u0435\u0436\u0434\u0430\u0442\u044C")), /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-xl hover:bg-white/5 transition-colors"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mb-4 text-orange-400"
  }, /*#__PURE__*/React.createElement(Icons.Trophy, {
    className: "w-6 h-6"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "text-white font-bold text-lg mb-2"
  }, "\u0414\u0440\u0430\u0439\u0432 \u0438 \u0421\u043F\u043E\u0440\u0442"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-sm"
  }, "\u0414\u0432\u043E\u0440\u043E\u0432\u044B\u0435 \u0438\u0433\u0440\u044B, \u0441\u043F\u043E\u0440\u0442\u0438\u0432\u043D\u044B\u0435 \u0441\u043E\u0440\u0435\u0432\u043D\u043E\u0432\u0430\u043D\u0438\u044F, \u043A\u0432\u0435\u0441\u0442\u044B. \u042D\u043D\u0435\u0440\u0433\u0438\u044F, \u043A\u043E\u0442\u043E\u0440\u0443\u044E \u043D\u0443\u0436\u043D\u043E \u0432\u044B\u043F\u043B\u0435\u0441\u043D\u0443\u0442\u044C \u043C\u0438\u0440\u043D\u043E")), /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-xl hover:bg-white/5 transition-colors"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mb-4 text-red-400"
  }, /*#__PURE__*/React.createElement(Icons.Music, {
    className: "w-6 h-6"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "text-white font-bold text-lg mb-2"
  }, "\u041C\u0443\u0437\u044B\u043A\u0430\u043B\u044C\u043D\u044B\u0435 \u0432\u0435\u0447\u0435\u0440\u0430"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-sm"
  }, "\u041A\u043E\u043D\u0446\u0435\u0440\u0442\u044B, \u0442\u0432\u043E\u0440\u0447\u0435\u0441\u043A\u0438\u0435 \u0432\u0435\u0447\u0435\u0440\u0430, \u043F\u0435\u0441\u043D\u0438 \u043F\u043E\u0434 \u0433\u0438\u0442\u0430\u0440\u0443. \u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430 \u0434\u043E\u0432\u0435\u0440\u0438\u044F \u0438 \u0442\u0435\u043F\u043B\u0430")), /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-xl hover:bg-white/5 transition-colors border border-white/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 text-blue-400"
  }, /*#__PURE__*/React.createElement(Icons.Globe, {
    className: "w-6 h-6"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "text-white font-bold text-lg mb-2"
  }, "\u0412\u044B\u0437\u043E\u0432\u044B \u041C\u0438\u0440\u0430"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-sm"
  }, "\u041C\u044B \u0431\u0443\u0434\u0435\u043C \u0440\u0430\u0437\u0431\u0438\u0440\u0430\u0442\u044C \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u0432\u044B\u0437\u043E\u0432\u044B \u043C\u0438\u0440\u0430 \u0438 \u0440\u0430\u0437\u0431\u0438\u0440\u0430\u0442\u044C\u0441\u044F \u0432 \u043D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u044B\u0445 \u0438 \u0437\u0430\u043A\u043E\u043D\u043E\u043C\u0435\u0440\u043D\u044B\u0445 \u0432\u0435\u0449\u0430\u0445")))));
};
const MissionRadar = () => {
  const [selectedMission, setSelectedMission] = useState(null);
  const missions = [{
    id: 1,
    title: "Затерянный Остров",
    theme: "Adventure",
    dates: "6.07 - 17.07",
    color: "text-amber-400",
    bg: "bg-amber-500",
    borderColor: "border-amber-400",
    image: "https://lh3.googleusercontent.com/d/1xjqlGflDYwbHHEgXQwU52izb1JvdlqWp",
    modalImage: "https://lh3.googleusercontent.com/d/1xjqlGflDYwbHHEgXQwU52izb1JvdlqWp",
    legend: "Протокол «Робинзон». Навигация потеряна. Остров не отмечен на картах. Выживи и разгадай тайну",
    legendFull: "Бортовой журнал, запись 1. Наш борт исчез с радаров в зоне аномалии. Мы одни. Связи нет. Задача: развернуть базу из обломков, расшифровать древние знаки на скалах и построить маяк до начала сезона штормов. Это не прогулка, это тест на характер",
    professions: ["Инженер", "Картограф", "Эколог", "Спасатель МЧС"],
    project: {
      title: "Макет Убежища + Карта Выживших",
      items: ["Макет лагеря 50×50 см", "Карта местности с легендой", "Личный дневник экспедиции"]
    },
    learnList: ["Читать топографические знаки и компас", "Строить укрытия (шалаши) и вязать 10 видов узлов", "Очищать воду подручными средствами", "Оказывать первую помощь (наложение шин, помощь при ожогах)"],
    excursions: ["Большой поход в лесопарк: практика ориентирования", "Веревочный парк: тренировка ловкости", "Мастер-класс от школы выживания: костер без спичек"],
    program: [{
      title: "День 1. Крушение",
      desc: "Знакомство с легендой, распределение ролей, инвентаризация ресурсов."
    }, {
      title: "День 2. Ориентирование",
      desc: "Школа штурманов. Изучение азимута и создание первой карты."
    }, {
      title: "День 3. Инженерия",
      desc: "Строительство моста и сигнальной вышки. Испытания на прочность."
    }, {
      title: "День 5. Макет",
      desc: "Начало большого строительства: создаем модель нашего лагеря."
    }, {
      title: "День 7. Экспедиция",
      desc: "Поход-квест в лесопарк. Поиск артефактов и пикник."
    }, {
      title: "День 10. Спасение",
      desc: "Защита проектов перед родителями (спасательной экспедицией)."
    }]
  }, {
    id: 2,
    title: "Секреты Природы",
    theme: "Science",
    dates: "20.07 - 31.07",
    color: "text-emerald-400",
    bg: "bg-emerald-500",
    borderColor: "border-emerald-400",
    image: "https://lh3.googleusercontent.com/d/1w7I-As6OsT1I9VHg6u7EnA4xjt54R9Ce",
    modalImage: "https://lh3.googleusercontent.com/d/1w7I-As6OsT1I9VHg6u7EnA4xjt54R9Ce",
    legend: "Проект «Аватар». Мы взламываем ДНК джунглей, чтобы украсть технологии у природы и совершить прорыв",
    legendFull: "Человеческие технологии устарели. Мы отправляемся в био-экспедицию. Наша цель — подсмотреть инженерные решения у муравьев, создать материалы прочнее стали по чертежам пауков и спроектировать города, которые дышат. Стань экспертом по биооптимизации нового времени",
    professions: ["Биолог", "Химик", "Медик", "Агроном", "Ветеринар"],
    project: {
      title: "Флорариум + техническая модель",
      items: ["Флорариум (живая экосистема)", "Портфолио экспериментов", "Модель биомеханической системы"]
    },
    learnList: ["Работать с микроскопами (свой мир в капле воды)", "Инженерия по законам природы: создаем макеты зданий", "Основам ботаники и зоопсихологии", "Создадим флорариум своими руками"],
    excursions: ["Исследовательская экспедиция в Зоопарк", "Ботанический сад: поиск редких растений", "Выездная лекция 'Океанариум' или 'Музей воды'"],
    program: [{
      title: "День 1. Загадка",
      desc: "Видео-послание 'Планета заражена'. Получение ролей: Биолог, Химик."
    }, {
      title: "День 2. Тайны растений",
      desc: "Изучаем клетки под микроскопом. Эксперимент с фотосинтезом."
    }, {
      title: "День 3. Химия жизни",
      desc: "Изучаем PH, выращиваем кристаллы, безопасные опыты с огнем."
    }, {
      title: "День 5. Флорариум",
      desc: "Создаем замкнутую экосистему в банке, которую заберем домой."
    }, {
      title: "День 7. Зоопарк",
      desc: "Выездной квест 'Найди хищника'. Изучение повадок животных."
    }, {
      title: "День 10. Конференция",
      desc: "Научная конференция. Защита портфолио перед родителями."
    }]
  }, {
    id: 3,
    title: "Повелители Стихий",
    dates: "3.08 - 14.08",
    color: "text-orange-400",
    bg: "bg-orange-500",
    borderColor: "border-orange-400",
    image: "https://lh3.googleusercontent.com/d/18ONDBZv1PcRhGWb95cccycGOov7slUZR",
    modalImage: "https://lh3.googleusercontent.com/d/18ONDBZv1PcRhGWb95cccycGOov7slUZR",
    legend: "Операция Полное отключение. Энергия исчезла. Твоя миссия — запустить сердце цивилизации заново, используя физику",
    legendFull: "Вчера погас свет во всем мире. Гаджеты — просто куски пластика. Мы — последний отряд инженеров. Нам нужно укротить ветер, заставить воду работать и добыть огонь из науки. Мы строим новый мир, где стихия — не враг, а топливо",
    professions: ["Физик", "Инженер-энергетик", "Изобретатель", "Конструктор"],
    project: {
      title: "Водяная Ракета",
      items: ["Водяная ракета (рабочая модель)", "Ветрогенератор (макет)", "Презентация проекта"]
    },
    learnList: ["Создавать электричество из лимонов и картошки", "Строить ветрогенераторы и запускать водяные ракеты", "Понимать аэродинамику", "Конструировать мосты из спагетти"],
    excursions: ["Музей занимательных наук 'Реактор'", "Экскурсия в настоящую пожарную часть", "Метеостанция (или тематический квест)"],
    program: [{
      title: "День 1. Тьма",
      desc: "Мир без электричества. Добываем энергию из лимонов и меди."
    }, {
      title: "День 2. Ветер",
      desc: "Аэродинамика. Строим ветрогенераторы и тестируем лопасти."
    }, {
      title: "День 4. Ракета",
      desc: "Инженерный вызов: строим и запускаем водяные ракеты на улице."
    }, {
      title: "День 6. Механика",
      desc: "Строим 'машину Голдберга' из простых механизмов."
    }, {
      title: "День 7. Реактор",
      desc: "Выезд в музей наук. Шоу с катушкой Теслы."
    }, {
      title: "День 10. Инвесторы",
      desc: "Защита проекта энергостанции будущего перед родителями."
    }]
  }, {
    id: 4,
    title: "Город Будущего",
    theme: "Future",
    dates: "17.08 - 28.08",
    color: "text-purple-400",
    bg: "bg-purple-500",
    borderColor: "border-purple-400",
    image: "https://lh3.googleusercontent.com/d/1rGEF7LjX_pnBjzBaZLnvjXGomWAn-gZ7",
    modalImage: "https://lh3.googleusercontent.com/d/1rGEF7LjX_pnBjzBaZLnvjXGomWAn-gZ7",
    legend: "Код 2088. Старые города рухнули. Ты — архитектор новой эры. ИИ, кибернетика и власть в твоих руках",
    legendFull: "Добро пожаловать в Сектор Зеро. Здесь нет пробок и серых стен, потому что здесь пока ничего нет. Вы — Совет Основателей. Каким будет этот мегаполис? Стеклянным раем или кибер-джунглями? Вы пишете законы и решаете: роботы — слуги или граждане?",
    professions: ["Архитектор", "Предприниматель", "Урбанист", "Маркетолог"],
    project: {
      title: "Макет Района + Бизнес-план",
      items: ["Макет района со светодиодами", "Бизнес-план города", "Видео-презентация"]
    },
    learnList: ["Макетированию: строим район из картона и светодиодов", "Финансовой грамотности: бюджет города, налоги", "Публичным выступлениям: защита проекта", "Основам дизайн-мышления"],
    excursions: ["Визит в офис современной ИТ-компании", "Экскурсия в современный жилой комплекс", "Умная библиотека: квест по цифровым технологиям"],
    program: [{
      title: "День 1. Основание",
      desc: "Выбор локации, названия и ценностей нашего города."
    }, {
      title: "День 3. Финансы",
      desc: "Игра 'Мэр на час'. Учимся управлять бюджетом и налогами."
    }, {
      title: "День 5. Маркетинг",
      desc: "Создаем бренд города. Логотип, слоган, рекламная кампания."
    }, {
      title: "День 7. IT-Офис",
      desc: "Выезд в реальную IT-компанию. Как работают профи."
    }, {
      title: "День 8. Подсветка",
      desc: "Финализируем макет: добавляем светодиоды и детали."
    }, {
      title: "День 10. Питч",
      desc: "Защита проекта города перед Советом Инвесторов."
    }]
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "\u0441\u044E\u0436\u0435\u0442",
    className: "radar-section-bg py-24 bg-deep relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-deep/50"
  }), /*#__PURE__*/React.createElement(Modal, {
    isOpen: !!selectedMission,
    mission: selectedMission,
    onClose: () => setSelectedMission(null)
  }), /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-6 relative z-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-10"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl md:text-6xl font-bold text-white mb-4 font-cinematic uppercase"
  }, "4 \u0421\u044E\u0436\u0435\u0442\u0430 \u2014 4 \u041C\u0438\u0440\u0430"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-300 text-lg"
  }, "\u041D\u0430\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430 \u0441\u0435\u043A\u0442\u043E\u0440, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435")), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
  }, missions.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.id,
    onClick: () => setSelectedMission(m),
    className: "tech-border-container cursor-pointer group",
    style: {
      filter: `drop-shadow(0 0 5px ${m.color.replace('text-', '').replace('-400', '')})`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: `tech-shape relative h-[320px] bg-slate-900 group overflow-hidden`
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-70",
    style: {
      backgroundImage: `url(${m.image})`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 p-8 flex flex-col justify-between z-10 bg-gradient-to-t from-deep/90 via-deep/40 to-deep/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-start"
  }, /*#__PURE__*/React.createElement("span", {
    className: `text-xs font-bold uppercase tracking-widest px-2 py-1 bg-black/60 backdrop-blur rounded ${m.color}`
  }, m.dates), /*#__PURE__*/React.createElement(Icons.Play, {
    className: `w-8 h-8 ${m.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-black uppercase font-cinematic text-white mb-2 leading-tight drop-shadow-md group-hover:text-amber-400 transition-colors"
  }, m.title), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-200 font-medium leading-relaxed line-clamp-3 drop-shadow-sm"
  }, m.legend), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
  }, /*#__PURE__*/React.createElement("span", null, "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0434\u043E\u0441\u044C\u0435"), " ", /*#__PURE__*/React.createElement(Icons.ChevronRight, {
    className: "w-4 h-4 text-amber-400"
  })))), /*#__PURE__*/React.createElement("div", {
    className: `absolute inset-0 border-2 border-white/5 group-hover:${m.borderColor} transition-colors duration-300 pointer-events-none`
  })))))));
};
const HeroProfile = () => {
  return /*#__PURE__*/React.createElement("section", {
    className: "py-24 bg-deep relative border-t border-white/5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-16"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl md:text-5xl font-bold text-white mb-4 font-cinematic uppercase"
  }, "\u041F\u0440\u043E\u0444\u0430\u0439\u043B \u0413\u0435\u0440\u043E\u044F"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 max-w-2xl mx-auto"
  }, "\u042D\u0442\u043E \u043D\u0435 \u0433\u0440\u0430\u043C\u043E\u0442\u0430. \u042D\u0442\u043E \u043A\u0430\u0440\u0442\u0430 \u0440\u043E\u0441\u0442\u0430 \u0432\u0430\u0448\u0435\u0433\u043E \u0440\u0435\u0431\u0435\u043D\u043A\u0430.")), /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto bg-slate-900 border border-white/20 rounded-xl p-8 shadow-2xl relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-8 relative z-10"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold text-white mb-2"
  }, "\u0410\u0440\u0442\u0435\u043C \u0418\u0432\u0430\u043D\u043E\u0432, 12 \u043B\u0435\u0442"), /*#__PURE__*/React.createElement("p", {
    className: "text-amber-400 text-sm font-bold uppercase tracking-widest mb-6"
  }, "\u0421\u043C\u0435\u043D\u0430: \u0417\u0430\u0442\u0435\u0440\u044F\u043D\u043D\u044B\u0439 \u041E\u0441\u0442\u0440\u043E\u0432"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-xs text-slate-300 mb-1"
  }, /*#__PURE__*/React.createElement("span", null, "\u041A\u0440\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u043C\u044B\u0448\u043B\u0435\u043D\u0438\u0435"), /*#__PURE__*/React.createElement("span", null, "+40%")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-white/10 rounded-full h-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-amber-400 h-2 rounded-full",
    style: {
      width: '80%'
    }
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-xs text-slate-300 mb-1"
  }, /*#__PURE__*/React.createElement("span", null, "\u0418\u043D\u0436\u0435\u043D\u0435\u0440\u0438\u044F"), /*#__PURE__*/React.createElement("span", null, "+85%")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-white/10 rounded-full h-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-emerald-400 h-2 rounded-full",
    style: {
      width: '90%'
    }
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-xs text-slate-300 mb-1"
  }, /*#__PURE__*/React.createElement("span", null, "\u041B\u0438\u0434\u0435\u0440\u0441\u0442\u0432\u043E"), /*#__PURE__*/React.createElement("span", null, "+30%")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-white/10 rounded-full h-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-purple-400 h-2 rounded-full",
    style: {
      width: '60%'
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "border-l border-white/10 pl-8 flex flex-col justify-center"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-white font-bold mb-2"
  }, "\u0414\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F:"), /*#__PURE__*/React.createElement("ul", {
    className: "text-sm text-slate-400 space-y-2 mb-6"
  }, /*#__PURE__*/React.createElement("li", null, "\u2705 \u041F\u043E\u0441\u0442\u0440\u043E\u0438\u043B \u043C\u0430\u043A\u0435\u0442 \u043B\u0430\u0433\u0435\u0440\u044F"), /*#__PURE__*/React.createElement("li", null, "\u2705 \u0417\u0430\u0449\u0438\u0442\u0438\u043B \u043F\u0440\u043E\u0435\u043A\u0442 \u043F\u0435\u0440\u0435\u0434 \u044D\u043A\u0438\u043F\u0430\u0436\u0435\u043C"), /*#__PURE__*/React.createElement("li", null, "\u2705 \u041F\u043E\u043B\u0443\u0447\u0438\u043B \u0440\u043E\u043B\u044C \"\u0413\u043B\u0430\u0432\u043D\u044B\u0439 \u041A\u0430\u0440\u0442\u043E\u0433\u0440\u0430\u0444\"")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white/5 p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-300 italic"
  }, "\"\u0410\u0440\u0442\u0435\u043C \u043F\u043E\u043A\u0430\u0437\u0430\u043B \u043E\u0442\u043B\u0438\u0447\u043D\u044B\u0435 \u043B\u0438\u0434\u0435\u0440\u0441\u043A\u0438\u0435 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0430. \u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u043C \u0440\u0430\u0437\u0432\u0438\u0432\u0430\u0442\u044C \u0438\u043D\u0436\u0435\u043D\u0435\u0440\u043D\u044B\u0435 \u043D\u0430\u0432\u044B\u043A\u0438...\" \u2014 ", /*#__PURE__*/React.createElement("span", {
    className: "text-white font-bold"
  }, "\u041C\u0435\u043D\u0442\u043E\u0440 \u0415\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0430"))))))));
};
const SkillTree = () => {
  return /*#__PURE__*/React.createElement("section", {
    className: "py-24 bg-deep relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-16 text-center"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl md:text-5xl font-bold text-white font-cinematic uppercase"
  }, "\u0427\u0442\u043E \u043E\u0441\u0442\u0430\u043D\u0435\u0442\u0441\u044F \u043F\u043E\u0441\u043B\u0435 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u044B?"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 mt-4"
  }, "\u0421\u0447\u0430\u0441\u0442\u043B\u0438\u0432\u043E\u0435 \u0434\u0435\u0442\u0441\u0442\u0432\u043E, \u043A\u043E\u0442\u043E\u0440\u043E\u0433\u043E \u043D\u0430\u043C \u0438\u043D\u043E\u0433\u0434\u0430 \u043D\u0435 \u0445\u0432\u0430\u0442\u0430\u0435\u0442: \u0434\u0440\u0443\u0436\u0431\u0430, \u043E\u0442\u043A\u0440\u044B\u0442\u0438\u044F \u0438 \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u043F\u0440\u0438\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F")), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-xl border border-white/5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-amber-400 text-4xl mb-4 font-cinematic"
  }, "\u041F\u0420\u041E\u0424\u041D\u0410\u0412\u042B\u041A\u0418"), /*#__PURE__*/React.createElement("h3", {
    className: "text-white font-bold text-xl mb-3"
  }, "\u0417\u043D\u0430\u043D\u0438\u044F"), /*#__PURE__*/React.createElement("ul", {
    className: "text-slate-400 text-sm space-y-2 list-disc pl-4"
  }, /*#__PURE__*/React.createElement("li", null, "\u0420\u0430\u0431\u043E\u0442\u0430 \u0441 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0430\u043C\u0438"), /*#__PURE__*/React.createElement("li", null, "\u041E\u0441\u043D\u043E\u0432\u044B \u0444\u0438\u0437\u0438\u043A\u0438 \u0438 \u0445\u0438\u043C\u0438\u0438"), /*#__PURE__*/React.createElement("li", null, "3D-\u043C\u043E\u0434\u0435\u043B\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435"), /*#__PURE__*/React.createElement("li", null, "\u0411\u0438\u043E\u043B\u043E\u0433\u0438\u044F \u043D\u0430 \u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0435"))), /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-xl border border-white/5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-purple-400 text-4xl mb-4 font-cinematic"
  }, "\u0413\u0418\u0411\u041A\u0418\u0415 \u041D\u0410\u0412\u042B\u041A\u0418"), /*#__PURE__*/React.createElement("h3", {
    className: "text-white font-bold text-xl mb-3"
  }, "\u041A\u043E\u043C\u043C\u0443\u043D\u0438\u043A\u0430\u0446\u0438\u044F"), /*#__PURE__*/React.createElement("ul", {
    className: "text-slate-400 text-sm space-y-2 list-disc pl-4"
  }, /*#__PURE__*/React.createElement("li", null, "\u0417\u0430\u0449\u0438\u0442\u0430 \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432"), /*#__PURE__*/React.createElement("li", null, "\u0420\u0430\u0431\u043E\u0442\u0430 \u0432 \u043A\u043E\u043C\u0430\u043D\u0434\u0435"), /*#__PURE__*/React.createElement("li", null, "\u041E\u0440\u0430\u0442\u043E\u0440\u0441\u043A\u043E\u0435 \u0438\u0441\u043A\u0443\u0441\u0441\u0442\u0432\u043E"), /*#__PURE__*/React.createElement("li", null, "\u042D\u043C\u043E\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0439 \u0438\u043D\u0442\u0435\u043B\u043B\u0435\u043A\u0442"))), /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-xl border border-white/5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-emerald-400 text-4xl mb-4 font-cinematic"
  }, "\u0416\u0418\u0417\u041D\u0415\u041D\u041D\u042B\u0415 \u0421\u0422\u0420\u0410\u0422\u0415\u0413\u0418\u0418"), /*#__PURE__*/React.createElement("h3", {
    className: "text-white font-bold text-xl mb-3"
  }, "\u0421\u0430\u043C\u043E\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C"), /*#__PURE__*/React.createElement("ul", {
    className: "text-slate-400 text-sm space-y-2 list-disc pl-4"
  }, /*#__PURE__*/React.createElement("li", null, "\u0422\u0430\u0439\u043C-\u043C\u0435\u043D\u0435\u0434\u0436\u043C\u0435\u043D\u0442"), /*#__PURE__*/React.createElement("li", null, "\u0424\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u0430\u044F \u0433\u0440\u0430\u043C\u043E\u0442\u043D\u043E\u0441\u0442\u044C"), /*#__PURE__*/React.createElement("li", null, "\u0411\u044B\u0442\u043E\u0432\u043E\u0435 \u0441\u0430\u043C\u043E\u043E\u0431\u0441\u043B\u0443\u0436\u0438\u0432\u0430\u043D\u0438\u0435"), /*#__PURE__*/React.createElement("li", null, "\u0420\u0435\u0448\u0435\u043D\u0438\u0435 \u043A\u043E\u043D\u0444\u043B\u0438\u043A\u0442\u043E\u0432"))), /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-xl border border-amber-500 bg-amber-900/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-white text-4xl mb-4 font-cinematic"
  }, "\u041F\u041E\u0414\u0410\u0420\u041E\u041A"), /*#__PURE__*/React.createElement("h3", {
    className: "text-white font-bold text-xl mb-3"
  }, "\u041F\u0440\u043E\u0444\u0430\u0439\u043B \u0413\u0435\u0440\u043E\u044F"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-300 text-sm leading-relaxed"
  }, "\u0418\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u043E\u0442\u0447\u0435\u0442 \u043E\u0442 \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0430 \u0438 \u043C\u0435\u043D\u0442\u043E\u0440\u043E\u0432: \u0442\u0430\u043B\u0430\u043D\u0442\u044B \u0440\u0435\u0431\u0435\u043D\u043A\u0430, \u0442\u043E\u0447\u043A\u0438 \u0440\u043E\u0441\u0442\u0430 \u0438 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0438 \u0434\u043B\u044F \u0440\u043E\u0434\u0438\u0442\u0435\u043B\u0435\u0439")))));
};
const Security = () => {
  return /*#__PURE__*/React.createElement("section", {
    id: "\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C",
    className: "py-24 bg-[#0a0a0c] border-y border-white/5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid lg:grid-cols-2 gap-12 items-center"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl md:text-5xl font-bold text-white font-cinematic uppercase mb-8"
  }, "\u041A\u043E\u043C\u0444\u043E\u0440\u0442 \u0438 \u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center shrink-0 border border-white/10 text-emerald-400"
  }, /*#__PURE__*/React.createElement(Icons.Shield, {
    className: "w-8 h-8"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-white font-bold text-xl mb-1"
  }, "\u041A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0435\u043C\u0430\u044F \u0441\u0432\u043E\u0431\u043E\u0434\u0430"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-sm leading-relaxed"
  }, "\u0412\u0438\u0434\u0435\u043E\u043D\u0430\u0431\u043B\u044E\u0434\u0435\u043D\u0438\u0435. \u041F\u0440\u043E\u0433\u0443\u043B\u043A\u0438 \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430 \u0441\u043F\u0435\u0446. \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0430\u0445. \u041F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u0430\u044F \u0441\u0432\u044F\u0437\u044C \u0441 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u043E\u043C. \u0412\u044B \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442\u0435 \u0441\u043F\u043E\u043A\u043E\u0439\u043D\u043E"))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center shrink-0 border border-white/10 text-emerald-400"
  }, /*#__PURE__*/React.createElement(Icons.User, {
    className: "w-8 h-8"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-white font-bold text-xl mb-1"
  }, "\u041C\u0435\u043D\u0442\u043E\u0440\u044B, \u0430 \u043D\u0435 \u043D\u0430\u0434\u0437\u0438\u0440\u0430\u0442\u0435\u043B\u0438"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-sm leading-relaxed"
  }, "1 \u0432\u0437\u0440\u043E\u0441\u043B\u044B\u0439 \u043D\u0430 10 \u0434\u0435\u0442\u0435\u0439. \u0412\u0441\u0435 \u043D\u0430\u0441\u0442\u0430\u0432\u043D\u0438\u043A\u0438 \u043F\u0440\u043E\u0445\u043E\u0434\u044F\u0442 \u0441\u043F\u0435\u0446. \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435 \u043F\u043E \u0438\u0433\u0440\u043E\u0432\u043E\u0439 \u043F\u0435\u0434\u0430\u0433\u043E\u0433\u0438\u043A\u0435 \u0438 \u043F\u0435\u0440\u0432\u043E\u0439 \u043F\u043E\u043C\u043E\u0449\u0438"))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center shrink-0 border border-white/10 text-emerald-400"
  }, /*#__PURE__*/React.createElement(Icons.Pizza, {
    className: "w-8 h-8"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-white font-bold text-xl mb-1"
  }, "\u0412\u043A\u0443\u0441\u043D\u0430\u044F \u043F\u043E\u043B\u044C\u0437\u0430"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-sm leading-relaxed"
  }, "3-\u0440\u0430\u0437\u043E\u0432\u043E\u0435 \u043F\u0438\u0442\u0430\u043D\u0438\u0435. \u0412\u044B\u0431\u0438\u0440\u0430\u0435\u043C \u0442\u043E, \u0447\u0442\u043E \u043D\u0440\u0430\u0432\u0438\u0442\u0441\u044F \u0434\u0435\u0442\u044F\u043C \u0438 \u043F\u043E\u043B\u0435\u0437\u043D\u043E. \u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E \u043E\u0432\u043E\u0449\u0438, \u0444\u0440\u0443\u043A\u0442\u044B. \u041F\u043E \u043F\u044F\u0442\u043D\u0438\u0446\u0430\u043C \u2014 \u043F\u0438\u0446\u0446\u0430 \u0438\u043B\u0438 \u043B\u044E\u0431\u0438\u043C\u043E\u0435 \u0431\u043B\u044E\u0434\u043E"))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-br from-slate-900 to-black p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-white font-bold text-3xl font-cinematic mb-6"
  }, "\u0413\u0435\u043D\u0435\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043A\u043E\u0434 \u043F\u0440\u043E\u0435\u043A\u0442\u0430"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-base mb-10 leading-relaxed"
  }, "\xAB\u042D\u043D\u0446\u0438\u043A\u043B\u043E\u043F\u0435\u0434\u0438\u044F \u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0433\u043E\xBB \u2014 \u044D\u0442\u043E \u043F\u0440\u0435\u043C\u044C\u0435\u0440\u0430 2026 \u0433\u043E\u0434\u0430. \u041D\u043E \u043C\u044B \u0441\u043E\u0437\u0434\u0430\u0435\u043C \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043C\u0438\u0440\u044B \u0443\u0436\u0435 5 \u043B\u0435\u0442. \u0418 \u0437\u043D\u0430\u0435\u043C, \u043A\u0430\u043A \u0437\u0430\u0436\u0435\u0447\u044C \u0433\u043B\u0430\u0437\u0430 \u0440\u0435\u0431\u0435\u043D\u043A\u0443 6 \u043B\u0435\u0442 \u0438 \u0443\u0432\u043B\u0435\u0447\u044C \u043F\u043E\u0434\u0440\u043E\u0441\u0442\u043A\u0430 12 \u043B\u0435\u0442."), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-12 border-t border-white/10 pt-8"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-4xl font-bold text-amber-400 font-cinematic"
  }, "1300+"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-500 uppercase tracking-widest mt-1"
  }, "\u0421\u0447\u0430\u0441\u0442\u043B\u0438\u0432\u044B\u0445 \u0434\u0435\u0442\u0435\u0439")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-4xl font-bold text-amber-400 font-cinematic"
  }, "75"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-500 uppercase tracking-widest mt-1"
  }, "\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C \u043F\u0440\u043E\u0432\u0435\u0434\u0435\u043D\u043E"))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 mt-6 pt-4 border-t border-white/5"
  }, "\u041E\u043F\u044B\u0442 \u043D\u0430\u0448\u0438\u0445 \u043F\u0435\u0434\u0430\u0433\u043E\u0433\u043E\u0432 \u0438 \u043C\u0435\u0442\u043E\u0434\u0438\u0441\u0442\u043E\u0432 \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u043D\u0430\u043C \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C \u0438 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442.")))));
};
const Gallery = () => {
  const photos = ["https://lh3.googleusercontent.com/d/1WcFtI4Eqoh5PMFwIRmoJcapZA0DjTJLj", "https://lh3.googleusercontent.com/d/15-ZkusjP7AnDjKDKf_oPBUXuD5q_mUDv", "https://lh3.googleusercontent.com/d/19IzVgdv4WjtXFM5WMzO2qNn3EwZ_XwlB", "https://lh3.googleusercontent.com/d/1qr4Ra5fhDtOH_h4kZ1fBQuGu-Voq6P5F", "https://lh3.googleusercontent.com/d/1Yi-LrP-EWrKjhiUgHjbA_HvEpGIH01Vz",
  // Updated Video Cover from Drive
  "https://lh3.googleusercontent.com/d/1tim8LpPTKJPJ8WNQbRv0EEnTZ3v3xGzl"];
  const [videoOpen, setVideoOpen] = useState(false);
  return /*#__PURE__*/React.createElement("section", {
    id: "\u0433\u0430\u043B\u0435\u0440\u0435\u044F",
    className: "py-24 bg-deep border-t border-white/5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row justify-between items-end mb-12"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl md:text-5xl font-bold text-white mb-2 font-cinematic uppercase"
  }, "\u0425\u0440\u043E\u043D\u0438\u043A\u0438 \u041F\u0440\u043E\u0448\u043B\u044B\u0445 \u0421\u0435\u0437\u043E\u043D\u043E\u0432"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400"
  }, "\u041B\u0443\u0447\u0448\u0435 \u043E\u0434\u0438\u043D \u0440\u0430\u0437 \u0443\u0432\u0438\u0434\u0435\u0442\u044C, \u0447\u0435\u043C \u0441\u0442\u043E \u0440\u0430\u0437 \u0443\u0441\u043B\u044B\u0448\u0430\u0442\u044C")), /*#__PURE__*/React.createElement("a", {
    href: "https://t.me/TriKitaPenza",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "text-amber-400 uppercase tracking-widest text-xs font-bold hover:text-white transition-colors mt-4 md:mt-0 flex items-center gap-2"
  }, "\u0411\u043E\u043B\u044C\u0448\u0435 \u0444\u043E\u0442\u043E \u0432 \u0442\u0435\u043B\u0435\u0433\u0440\u0430\u043C ", /*#__PURE__*/React.createElement(Icons.ChevronRight, {
    className: "w-4 h-4"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-3 gap-4"
  }, photos.slice(0, 5).map((src, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: `relative rounded-xl overflow-hidden group cursor-pointer h-64 hover:shadow-neon transition-all`
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110",
    style: {
      backgroundImage: `url(${src})`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"
  }))), /*#__PURE__*/React.createElement("div", {
    onClick: () => setVideoOpen(true),
    className: "relative rounded-xl overflow-hidden group cursor-pointer h-64 hover:shadow-neon transition-all bg-black flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-cover bg-center opacity-60",
    style: {
      backgroundImage: `url(${photos[5]})`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"
  }), /*#__PURE__*/React.createElement("div", {
    className: "z-10 w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform"
  }, /*#__PURE__*/React.createElement(Icons.Play, {
    className: "w-8 h-8 text-white ml-1"
  }))))), videoOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md modal-overlay",
    onClick: () => setVideoOpen(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setVideoOpen(false),
    className: "absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:text-amber-400 transition-colors z-10"
  }, /*#__PURE__*/React.createElement(Icons.X, {
    className: "w-6 h-6"
  })), /*#__PURE__*/React.createElement("div", {
    className: "w-full h-full"
  }, /*#__PURE__*/React.createElement("iframe", {
    src: "https://drive.google.com/file/d/1F1GQY4Lnsf6Dz_7mhmPOVIoIwmjfH6ch/preview",
    width: "100%",
    height: "100%",
    frameBorder: "0",
    allow: "autoplay"
  })))));
};
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [{
    q: "Почему такая стоимость? В школьном лагере дешевле",
    a: "В школьном лагере дешевле, потому что там другие задачи — присмотр и досуг. Мы создаем образовательную среду. В стоимость входит: 3-разовое сбалансированное питание, работа с профессиональным оборудованием (микроскопы, робототехника), экскурсии, трансферы и работа профильных педагогов."
  }, {
    q: "А если ребенок заболеет? Деньги сгорят?",
    a: "Мы не возвращаем 100% суммы (бронь расходов), но мы понимаем риски. Если есть справка от врача, мы переносим дни на следующую смену."
  }, {
    q: "Кто вожатые? Студенты?",
    a: "У нас отличный баланс: опытные менторы (25+ лет) обеспечивают методику и безопасность, а энергичные студенты (прошедшие нашу Школу Вожатых) создают драйв и атмосферу, в которой детям легко и весело. Все проходят строгий отбор."
  }, {
    q: "Можно ли брать телефон?",
    a: "Мы за разумный цифровой детокс. Телефоны находятся у детей, но во время активностей и занятий мы просим их убрать. У нас так интересно, что дети сами забывают о гаджетах."
  }, {
    q: "Мой ребенок стеснительный, ему будет комфортно?",
    a: "Наша методика построена на командной работе. Вожатые и психологи помогают каждому найти свою роль в команде, где он будет чувствовать себя уверенно. Никто не останется в стороне."
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "\u0432\u043E\u043F\u0440\u043E\u0441\u044B",
    className: "py-24 bg-deep"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-6 max-w-4xl"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl md:text-5xl font-bold text-white text-center mb-12 font-cinematic uppercase"
  }, "\u0427\u0435\u0441\u0442\u043D\u044B\u0435 \u043E\u0442\u0432\u0435\u0442\u044B"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, faqs.map((item, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "border border-white/10 rounded-lg overflow-hidden bg-white/5"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpenIndex(openIndex === idx ? null : idx),
    className: "w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white font-bold text-lg"
  }, item.q), /*#__PURE__*/React.createElement(Icons.ChevronRight, {
    className: `w-5 h-5 text-amber-400 transition-transform ${openIndex === idx ? 'rotate-90' : ''}`
  })), /*#__PURE__*/React.createElement("div", {
    className: `px-6 text-slate-400 overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-48 pb-6' : 'max-h-0'}`
  }, item.a))))));
};
const Pricing = () => {
  return /*#__PURE__*/React.createElement("section", {
    className: "py-24 bg-deep relative border-t border-white/5",
    id: "pricing"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-6 relative z-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-16"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl md:text-6xl font-bold text-white mb-4 font-cinematic uppercase"
  }, "\u0411\u043E\u0440\u0442\u043E\u0432\u043E\u0439 \u0436\u0443\u0440\u043D\u0430\u043B"), /*#__PURE__*/React.createElement("p", {
    className: "text-amber-400 font-bold tracking-widest uppercase text-sm"
  }, "\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0446\u0435\u043D\u044B")), /*#__PURE__*/React.createElement("div", {
    className: "grid lg:grid-cols-2 gap-12"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-6 p-8 bg-slate-800 rounded-xl border border-white/10 shadow-lg hover:border-amber-400/30 transition-all"
  }, /*#__PURE__*/React.createElement(Icons.Clock, {
    className: "w-8 h-8 text-amber-400 shrink-0"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-xl font-bold text-white mb-2"
  }, "\u0420\u0435\u0436\u0438\u043C \u0434\u043D\u044F"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-200 text-lg"
  }, "\u0411\u0430\u0437\u043E\u0432\u043E\u0435 \u0432\u0440\u0435\u043C\u044F: ", /*#__PURE__*/React.createElement("span", {
    className: "text-white font-bold"
  }, "09:00 \u2014 18:00")), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-sm mt-2"
  }, "\u0412\u043E\u0437\u043C\u043E\u0436\u0435\u043D \u043F\u0440\u043E\u0434\u043B\u0435\u043D\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 (\u0441 \u0443\u0442\u0440\u0430 \u0438 \u0432\u0435\u0447\u0435\u0440\u043E\u043C) \u0434\u043B\u044F \u0443\u0434\u043E\u0431\u0441\u0442\u0432\u0430 \u0433\u0440\u0430\u0444\u0438\u043A\u0430 \u0440\u0430\u0431\u043E\u0442\u044B \u0440\u043E\u0434\u0438\u0442\u0435\u043B\u0435\u0439 \u0438 \u0434\u043B\u044F \u0440\u0430\u0431\u043E\u0442\u044B \u043D\u0430\u0434 \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u044B\u043C\u0438 \u043F\u0440\u043E\u0435\u043A\u0442\u0430\u043C\u0438"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-6 p-8 bg-slate-800 rounded-xl border border-white/10 shadow-lg hover:border-amber-400/30 transition-all"
  }, /*#__PURE__*/React.createElement(Icons.MapPin, {
    className: "w-8 h-8 text-amber-400 shrink-0"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-xl font-bold text-white mb-2"
  }, "\u041B\u043E\u043A\u0430\u0446\u0438\u044F \u0438 \u041F\u0438\u0442\u0430\u043D\u0438\u0435"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-200 text-lg"
  }, "\u0410\u0440\u0431\u0435\u043A\u043E\u0432\u043E + \u041C\u0430\u0441\u0442\u0435\u0440-\u043A\u043B\u0430\u0441\u0441\u044B \u0438 \u044D\u043A\u0441\u043A\u0443\u0440\u0441\u0438\u0438"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-sm mt-2"
  }, "3-\u0440\u0430\u0437\u043E\u0432\u043E\u0435 \u0441\u0431\u0430\u043B\u0430\u043D\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0435 \u043F\u0438\u0442\u0430\u043D\u0438\u0435 (\"\u041A\u043E\u0441\u043C\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u043C\u0435\u043D\u044E\")"))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-br from-slate-800 to-indigo-950 p-6 md:p-6 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-end mb-4 relative z-10"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-white"
  }, "\u0422\u0430\u0440\u0438\u0444\u044B 2026"), /*#__PURE__*/React.createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-amber-400 text-[10px] font-bold uppercase tracking-widest block"
  }, "\u0420\u0430\u043D\u043D\u0435\u0435 \u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1.5 relative z-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-3 rounded-lg bg-slate-900/80 border border-white/10 flex justify-between items-center group hover:border-amber-400/50 transition-all cursor-pointer"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-0.5"
  }, "\u0420\u0430\u0437\u0432\u0435\u0434\u0447\u0438\u043A"), /*#__PURE__*/React.createElement("div", {
    className: "font-bold text-white text-sm"
  }, "5 \u0434\u043D\u0435\u0439")), /*#__PURE__*/React.createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-base font-bold text-white"
  }, "15 990 \u20BD"))), /*#__PURE__*/React.createElement("div", {
    className: "p-3 rounded-lg bg-slate-900/80 border border-white/10 flex justify-between items-center group hover:border-amber-400/50 transition-all cursor-pointer"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-amber-400 text-[10px] font-bold uppercase tracking-widest mb-0.5"
  }, "\u041A\u0430\u0434\u0435\u0442"), /*#__PURE__*/React.createElement("div", {
    className: "font-bold text-white text-sm"
  }, "1 \u0421\u0435\u0437\u043E\u043D (10 \u0434\u043D\u0435\u0439)")), /*#__PURE__*/React.createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bg-purple-500/20 text-purple-300 text-[9px] px-1.5 py-0.5 rounded ml-1"
  }, "\u0420\u0430\u0441\u0441\u0440\u043E\u0447\u043A\u0430 0%"), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-slate-500 line-through decoration-red-500"
  }, "32 000 \u20BD"), /*#__PURE__*/React.createElement("div", {
    className: "text-base font-bold text-white"
  }, "29 990 \u20BD"))), /*#__PURE__*/React.createElement("div", {
    className: "p-3 rounded-lg bg-white/10 border border-amber-400/60 flex justify-between items-center relative overflow-hidden shadow-[0_0_20px_rgba(251,191,36,0.1)] transform scale-[1.01]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 right-0 bg-amber-400 text-black text-[9px] font-bold px-2 py-0.5 uppercase rounded-bl"
  }, "\u0425\u0438\u0442"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-amber-400 text-[10px] font-bold uppercase tracking-widest mb-0.5"
  }, "\u0418\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u0435\u043B\u044C"), /*#__PURE__*/React.createElement("div", {
    className: "font-bold text-white text-sm"
  }, "2 \u0421\u0435\u0437\u043E\u043D\u0430 (4 \u043D\u0435\u0434\u0435\u043B\u0438)")), /*#__PURE__*/React.createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bg-purple-500/20 text-purple-300 text-[9px] px-1.5 py-0.5 rounded ml-1"
  }, "\u0420\u0430\u0441\u0441\u0440\u043E\u0447\u043A\u0430 0%"), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-slate-400 line-through decoration-red-500"
  }, "55 980 \u20BD"), /*#__PURE__*/React.createElement("div", {
    className: "text-base font-bold text-white"
  }, "52 990 \u20BD"))), /*#__PURE__*/React.createElement("div", {
    className: "p-3 rounded-lg bg-slate-900/80 border border-white/10 flex justify-between items-center group hover:border-purple-400/50 transition-all cursor-pointer"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-0.5"
  }, "\u041A\u043E\u043C\u0430\u043D\u0434\u043E\u0440"), /*#__PURE__*/React.createElement("div", {
    className: "font-bold text-white text-sm"
  }, "\u0412\u0441\u0435 \u043B\u0435\u0442\u043E (VIP)")), /*#__PURE__*/React.createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-slate-500 line-through decoration-red-500"
  }, "111 960 \u20BD"), /*#__PURE__*/React.createElement("div", {
    className: "text-base font-bold text-white"
  }, "96 990 \u20BD"))), /*#__PURE__*/React.createElement("div", {
    className: "p-2 rounded border border-white/5 flex flex-row justify-between items-center opacity-70 hover:opacity-100 transition-opacity"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-slate-300 font-bold uppercase tracking-widest pl-1 flex-1"
  }, "\u041F\u043E\u043B\u043E\u0432\u0438\u043D\u0430 \u0434\u043D\u044F - 5 \u0434\u043D\u0435\u0439"), /*#__PURE__*/React.createElement("div", {
    className: "text-sm font-bold text-white whitespace-nowrap ml-2"
  }, "9 990 \u20BD"))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      track('booking_click');
      document.getElementById('заявка').scrollIntoView({
        behavior: 'smooth'
      });
    },
    className: "w-full py-3 bg-amber-400 text-black font-bold uppercase tracking-widest text-xs hover:bg-white hover:scale-105 transition-all rounded-sm shadow-[0_0_20px_rgba(251,191,36,0.3)]"
  }, "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C (\u0411\u0440\u043E\u043D\u044C 5000\u20BD)"), /*#__PURE__*/React.createElement("p", {
    className: "text-center text-slate-400 text-[10px] mt-2"
  }, "\u0412\u043D\u0435\u0441\u0438\u0442\u0435 5000\u20BD \u0441\u0435\u0439\u0447\u0430\u0441, \u0447\u0442\u043E\u0431\u044B \u0437\u0430\u0444\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u043A\u0438\u0434\u043A\u0443"))))));
};
const Footer = () => {
  return /*#__PURE__*/React.createElement("footer", {
    className: "bg-deep py-16 border-t border-white/10",
    id: "contacts"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-12 mb-12 items-start"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl font-bold text-white mb-6 font-cinematic uppercase tracking-widest text-slate-700"
  }, "\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0435 \u043D\u0430\u0447\u0438\u043D\u0430\u0435\u0442\u0441\u044F", /*#__PURE__*/React.createElement("br", null), "\u0441 \u043F\u0435\u0440\u0432\u043E\u0433\u043E \u0448\u0430\u0433\u0430"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 mb-8 max-w-md"
  }, "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043C\u0435\u0441\u0442 \u0432 \u0433\u0440\u0443\u043F\u043F\u0430\u0445 \u0441\u0442\u0440\u043E\u0433\u043E \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u043E (15 \u0447\u0435\u043B\u043E\u0432\u0435\u043A). \u0417\u0430\u043F\u043E\u043B\u043D\u044F\u0442\u044C \u0444\u043E\u0440\u043C\u0443 \u043D\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E \u2014 \u043F\u0440\u043E\u0441\u0442\u043E \u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u043D\u0430\u043C \u0432 \u0443\u0434\u043E\u0431\u043D\u044B\u0439 \u043C\u0435\u0441\u0441\u0435\u043D\u0434\u0436\u0435\u0440 \u0438\u043B\u0438 \u043F\u043E\u0437\u0432\u043E\u043D\u0438\u0442\u0435."), /*#__PURE__*/React.createElement("a", {
    href: "https://t.me/TriKitaPenza",
    target: "_blank",
    rel: "noopener noreferrer",
    onClick: () => track('telegram'),
    className: "inline-flex items-center gap-3 px-8 py-4 bg-amber-500 hover:bg-white hover:text-black text-black font-bold uppercase tracking-widest transition-all rounded shadow-neon mb-4 md:mb-0"
  }, /*#__PURE__*/React.createElement(Icons.Send, {
    className: "w-5 h-5"
  }), " \u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0432 \u0422\u0435\u043B\u0435\u0433\u0440\u0430\u043C")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col justify-between h-full"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl font-bold text-white font-cinematic uppercase tracking-wider mb-6"
  }, "\u0422\u0420\u0418\u041A\u0418\u0422\u0410"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-300 mb-4 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.MapPin, {
    className: "w-5 h-5 text-amber-500"
  }), " \u041F\u0435\u043D\u0437\u0430, \u0443\u043B. \u041B\u0430\u0434\u043E\u0436\u0441\u043A\u0430\u044F, 153 (\u043E\u0441\u0442. \u0422\u0426 \"\u0412\u0435\u0441\u043D\u0430\")"), /*#__PURE__*/React.createElement("a", {
    href: "tel:+79374037248",
    onClick: () => track('phone'),
    className: "text-amber-500 font-bold text-2xl mb-8 flex items-center gap-2 hover:text-white transition-colors"
  }, /*#__PURE__*/React.createElement(Icons.Phone, {
    className: "w-5 h-5"
  }), " +7 (937) 403-72-48"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-4"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://vk.com/trikita.school.penza",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "p-3 bg-white/5 rounded-full hover:bg-blue-600 transition-colors text-white"
  }, /*#__PURE__*/React.createElement(Icons.Vk, {
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement("a", {
    href: "https://t.me/TriKitaPenza",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "p-3 bg-white/5 rounded-full hover:bg-blue-400 transition-colors text-white"
  }, /*#__PURE__*/React.createElement(Icons.Send, {
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement("a", {
    href: "https://www.instagram.com/trikita.school.penza/",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "p-3 bg-white/5 rounded-full hover:bg-pink-600 transition-colors text-white"
  }, /*#__PURE__*/React.createElement(Icons.Instagram, {
    className: "w-5 h-5"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-500 space-y-2 mt-12 max-w-sm"
  }, /*#__PURE__*/React.createElement("p", {
    className: "leading-tight"
  }, "*Instagram \u043F\u0440\u0438\u043D\u0430\u0434\u043B\u0435\u0436\u0438\u0442 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438 Meta, \u043F\u0440\u0438\u0437\u043D\u0430\u043D\u043D\u043E\u0439 \u044D\u043A\u0441\u0442\u0440\u0435\u043C\u0438\u0441\u0442\u0441\u043A\u043E\u0439 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0435\u0439 \u0438 \u0437\u0430\u043F\u0440\u0435\u0449\u0435\u043D\u043D\u043E\u0439 \u0432 \u0420\u0424."), /*#__PURE__*/React.createElement("a", {
    href: "https://drive.google.com/file/d/1B0BZo2Rz3D6dtuljZ3D031t4qPvWT3SC/view?usp=sharing",
    target: "_blank",
    className: "block hover:text-white transition-colors"
  }, "\u041B\u0438\u0446\u0435\u043D\u0437\u0438\u044F \u043D\u0430 \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u043D\u0443\u044E \u0434\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C"), /*#__PURE__*/React.createElement("button", {
    onClick: () => window.openPrivacyModal(),
    className: "block hover:text-white transition-colors text-left w-full"
  }, "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438"), /*#__PURE__*/React.createElement("p", {
    className: "pt-4"
  }, "\xA9 2026 \u0422\u0440\u0438\u041A\u0438\u0442\u0430. \u0412\u0441\u0435 \u043F\u0440\u0430\u0432\u0430 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u044B."))))));
};
const PromoPopup = ({
  onClose,
  onOpenVideo
}) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10000); // 10 seconds
    return () => clearTimeout(timer);
  }, []);
  if (!isVisible) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm modal-overlay",
    onClick: () => setIsVisible(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/90 border border-white/10 rounded-3xl max-w-4xl w-full relative p-10 shadow-[0_0_80px_rgba(251,191,36,0.15)] flex flex-col md:flex-row gap-10 items-center popup-blur",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsVisible(false),
    className: "absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-full"
  }, /*#__PURE__*/React.createElement(Icons.X, {
    className: "w-6 h-6"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 text-center md:text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6 animate-pulse"
  }, "\u0422\u0440\u0430\u043D\u0441\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F"), /*#__PURE__*/React.createElement("h3", {
    className: "text-4xl md:text-5xl font-bold text-white font-cinematic uppercase mb-6 leading-[0.9]"
  }, "\u042D\u0442\u043E \u043D\u0435 \u043B\u0430\u0433\u0435\u0440\u044C.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600"
  }, "\u042D\u0442\u043E \u0436\u0438\u0437\u043D\u044C \u0432\u043D\u0443\u0442\u0440\u0438 \u0438\u0441\u0442\u043E\u0440\u0438\u0438.")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row gap-4 mt-8"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setIsVisible(false);
      onOpenVideo();
    },
    className: "px-8 py-4 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3 group"
  }, /*#__PURE__*/React.createElement(Icons.Video, {
    className: "w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform"
  }), "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0432\u0438\u0434\u0435\u043E"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setIsVisible(false);
      document.getElementById('сюжет').scrollIntoView({
        behavior: 'smooth'
      });
    },
    className: "px-8 py-4 bg-amber-400 text-black font-bold uppercase tracking-widest rounded-lg hover:bg-white hover:scale-105 transition-all shadow-neon"
  }, "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0440\u043E\u043B\u044C"))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4 w-full md:w-auto min-w-[300px]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-6 bg-white/5 rounded-2xl border border-white/5 text-center group hover:bg-white/10 transition-colors"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-white font-cinematic mb-1 group-hover:text-amber-400 transition-colors"
  }, "10"), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] uppercase tracking-widest text-slate-400"
  }, "\u0416\u0438\u0437\u043D\u0435\u0439")), /*#__PURE__*/React.createElement("div", {
    className: "p-6 bg-white/5 rounded-2xl border border-white/5 text-center group hover:bg-white/10 transition-colors"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-white font-cinematic mb-1 group-hover:text-amber-400 transition-colors"
  }, "4"), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] uppercase tracking-widest text-slate-400"
  }, "\u0412\u0441\u0435\u043B\u0435\u043D\u043D\u044B\u0435")), /*#__PURE__*/React.createElement("div", {
    className: "p-6 bg-white/5 rounded-2xl border border-white/5 text-center col-span-2 group hover:bg-white/10 transition-colors"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-white font-cinematic mb-1 group-hover:text-amber-400 transition-colors"
  }, "100%"), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] uppercase tracking-widest text-slate-400"
  }, "\u041F\u043E\u0433\u0440\u0443\u0436\u0435\u043D\u0438\u0435")))));
};
const LeadForm = () => {
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [form, setForm] = useState({
    name: '',
    childName: '',
    childAge: '',
    phone: '',
    tariff: ''
  });
  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name.trim() || !form.childName.trim() || !form.childAge.trim() || !form.phone.trim()) return;
    setStatus('sending');
    try {
      // ВАЖНО: замените YOUR_FORM_ID на ваш ID с https://formspree.io (бесплатно).
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'Имя родителя': form.name,
          'Имя ребёнка': form.childName,
          'Возраст ребёнка': form.childAge,
          Телефон: form.phone,
          'Интересует тариф': form.tariff || 'не указан',
          Источник: 'Сайт «Энциклопедия Невозможного»'
        })
      });
      if (res.ok) {
        setStatus('success');
        track('lead'); // цель в Яндекс.Метрике
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "\u0437\u0430\u044F\u0432\u043A\u0430",
    className: "py-24 bg-deep relative border-t border-white/5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-6 max-w-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-10"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl md:text-5xl font-bold text-white mb-4 font-cinematic uppercase"
  }, "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400"
  }, "\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B \u2014 \u043F\u0435\u0440\u0435\u0437\u0432\u043E\u043D\u0438\u043C, \u0440\u0430\u0441\u0441\u043A\u0430\u0436\u0435\u043C \u043E \u0441\u043C\u0435\u043D\u0430\u0445 \u0438 \u0437\u0430\u0444\u0438\u043A\u0441\u0438\u0440\u0443\u0435\u043C \u0441\u043A\u0438\u0434\u043A\u0443 \u0440\u0430\u043D\u043D\u0435\u0433\u043E \u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F. \u041C\u0435\u0441\u0442 \u0432 \u0433\u0440\u0443\u043F\u043F\u0435 \u0432\u0441\u0435\u0433\u043E 15.")), status === 'success' ? /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-10 rounded-2xl text-center border border-emerald-500/30"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-emerald-400 text-5xl mb-4"
  }, "\u2713"), /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold text-white mb-2"
  }, "\u0417\u0430\u044F\u0432\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430!"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400"
  }, "\u041C\u044B \u0441\u0432\u044F\u0436\u0435\u043C\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0432 \u0431\u043B\u0438\u0436\u0430\u0439\u0448\u0435\u0435 \u0432\u0440\u0435\u043C\u044F. \u0410 \u043F\u043E\u043A\u0430 \u043C\u043E\u0436\u0435\u0442\u0435 \u043D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u043D\u0430\u043C \u0432 \u0422\u0435\u043B\u0435\u0433\u0440\u0430\u043C \u2014 \u043E\u0442\u0432\u0435\u0442\u0438\u043C \u0431\u044B\u0441\u0442\u0440\u0435\u0435."), /*#__PURE__*/React.createElement("a", {
    href: "https://t.me/TriKitaPenza",
    target: "_blank",
    rel: "noopener noreferrer",
    onClick: () => track('telegram'),
    className: "inline-flex items-center gap-3 mt-6 px-8 py-3 bg-amber-400 hover:bg-white text-black font-bold uppercase tracking-widest transition-all rounded-sm"
  }, /*#__PURE__*/React.createElement(Icons.Send, {
    className: "w-5 h-5"
  }), " \u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0432 \u0422\u0435\u043B\u0435\u0433\u0440\u0430\u043C")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "glass-panel p-8 md:p-10 rounded-2xl space-y-5"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2"
  }, "\u0418\u043C\u044F \u0440\u043E\u0434\u0438\u0442\u0435\u043B\u044F *"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    value: form.name,
    onChange: e => setForm({
      ...form,
      name: e.target.value
    }),
    className: "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none transition-colors",
    placeholder: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \u0415\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0430"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-3 gap-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sm:col-span-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2"
  }, "\u0418\u043C\u044F \u0440\u0435\u0431\u0451\u043D\u043A\u0430 *"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    value: form.childName,
    onChange: e => setForm({
      ...form,
      childName: e.target.value
    }),
    className: "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none transition-colors",
    placeholder: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \u0410\u0440\u0442\u0451\u043C"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2"
  }, "\u0412\u043E\u0437\u0440\u0430\u0441\u0442 *"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    required: true,
    min: "4",
    max: "17",
    value: form.childAge,
    onChange: e => setForm({
      ...form,
      childAge: e.target.value
    }),
    className: "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none transition-colors",
    placeholder: "\u043B\u0435\u0442"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2"
  }, "\u0422\u0435\u043B\u0435\u0444\u043E\u043D *"), /*#__PURE__*/React.createElement("input", {
    type: "tel",
    required: true,
    value: form.phone,
    onChange: e => setForm({
      ...form,
      phone: e.target.value
    }),
    className: "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none transition-colors",
    placeholder: "+7 (___) ___-__-__"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2"
  }, "\u0418\u043D\u0442\u0435\u0440\u0435\u0441\u0443\u0435\u0442 \u0442\u0430\u0440\u0438\u0444 (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)"), /*#__PURE__*/React.createElement("select", {
    value: form.tariff,
    onChange: e => setForm({
      ...form,
      tariff: e.target.value
    }),
    className: "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-amber-400 focus:outline-none transition-colors"
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    className: "bg-slate-900"
  }, "\u0415\u0449\u0451 \u043D\u0435 \u0432\u044B\u0431\u0440\u0430\u043B(\u0430)"), /*#__PURE__*/React.createElement("option", {
    value: "\u0420\u0430\u0437\u0432\u0435\u0434\u0447\u0438\u043A (5 \u0434\u043D\u0435\u0439)",
    className: "bg-slate-900"
  }, "\u0420\u0430\u0437\u0432\u0435\u0434\u0447\u0438\u043A \u2014 5 \u0434\u043D\u0435\u0439"), /*#__PURE__*/React.createElement("option", {
    value: "\u041A\u0430\u0434\u0435\u0442 (10 \u0434\u043D\u0435\u0439)",
    className: "bg-slate-900"
  }, "\u041A\u0430\u0434\u0435\u0442 \u2014 1 \u0441\u0435\u0437\u043E\u043D (10 \u0434\u043D\u0435\u0439)"), /*#__PURE__*/React.createElement("option", {
    value: "\u0418\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u0435\u043B\u044C (4 \u043D\u0435\u0434\u0435\u043B\u0438)",
    className: "bg-slate-900"
  }, "\u0418\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u2014 2 \u0441\u0435\u0437\u043E\u043D\u0430 (4 \u043D\u0435\u0434\u0435\u043B\u0438)"), /*#__PURE__*/React.createElement("option", {
    value: "\u041A\u043E\u043C\u0430\u043D\u0434\u043E\u0440 (\u0432\u0441\u0451 \u043B\u0435\u0442\u043E)",
    className: "bg-slate-900"
  }, "\u041A\u043E\u043C\u0430\u043D\u0434\u043E\u0440 \u2014 \u0432\u0441\u0451 \u043B\u0435\u0442\u043E"))), status === 'error' && /*#__PURE__*/React.createElement("p", {
    className: "text-red-400 text-sm"
  }, "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C. \u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u043D\u0430\u043C \u043D\u0430\u043F\u0440\u044F\u043C\u0443\u044E \u0432 \u0422\u0435\u043B\u0435\u0433\u0440\u0430\u043C @TriKitaPenza \u0438\u043B\u0438 \u043F\u043E \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0443."), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: status === 'sending',
    className: "w-full py-4 bg-amber-400 hover:bg-white text-black font-bold uppercase tracking-widest transition-all rounded-sm shadow-neon disabled:opacity-60"
  }, status === 'sending' ? 'Отправляем…' : 'Отправить заявку'), /*#__PURE__*/React.createElement("p", {
    className: "text-center text-slate-500 text-xs"
  }, "\u041D\u0430\u0436\u0438\u043C\u0430\u044F \u043A\u043D\u043E\u043F\u043A\u0443, \u0432\u044B \u0441\u043E\u0433\u043B\u0430\u0448\u0430\u0435\u0442\u0435\u0441\u044C \u0441 ", /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => window.openPrivacyModal(),
    className: "text-amber-400 hover:underline bg-transparent border-0 p-0 inline"
  }, "\u043F\u043E\u043B\u0438\u0442\u0438\u043A\u043E\u0439 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438"), "."))));
};
const App = () => {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  useEffect(() => {
    window.openPrivacyModal = () => setPrivacyOpen(true);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen font-sans selection:bg-amber-500 selection:text-black"
  }, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement(Hero, {
    onOpenVideo: () => setVideoOpen(true)
  }), /*#__PURE__*/React.createElement(Methodology, null), /*#__PURE__*/React.createElement(Events, null), /*#__PURE__*/React.createElement(MissionRadar, null), /*#__PURE__*/React.createElement(SkillTree, null), /*#__PURE__*/React.createElement(HeroProfile, null), /*#__PURE__*/React.createElement(Security, null), /*#__PURE__*/React.createElement(Gallery, null), /*#__PURE__*/React.createElement(FAQ, null), /*#__PURE__*/React.createElement(Pricing, null), /*#__PURE__*/React.createElement(LeadForm, null), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(CookieConsent, {
    onOpenPrivacy: () => setPrivacyOpen(true)
  }), /*#__PURE__*/React.createElement(PrivacyModal, {
    isOpen: privacyOpen,
    onClose: () => setPrivacyOpen(false)
  }), /*#__PURE__*/React.createElement(VideoModal, {
    isOpen: videoOpen,
    onClose: () => setVideoOpen(false)
  }), /*#__PURE__*/React.createElement(PromoPopup, {
    onClose: () => {},
    onOpenVideo: () => setVideoOpen(true)
  }));
};
    ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
  } catch (e) {
    if (window.console && console.error) console.error('Ошибка инициализации приложения:', e);
  }
})();