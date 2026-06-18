// Vercel Serverless Function: приём заявки с сайта.
// 1) создаёт лид в AlfaCRM, 2) шлёт уведомление админу в MAX.
// Секреты берутся из переменных окружения Vercel (Settings → Environment Variables).
// Зависимостей нет — используется встроенный fetch (Node 18+).

const {
  ALFACRM_HOST, ALFACRM_EMAIL, ALFACRM_API_KEY,
  ALFACRM_BRANCH = '1', ALFACRM_LEAD_SOURCE_ID,
  MAX_BOT_TOKEN, MAX_ADMIN_USER_ID, MAX_ADMIN_CHAT_ID,
} = process.env;

// --- AlfaCRM: создать лид ---
async function createAlfaLead({ parentName, childName, childAge, phone, tariff }) {
  if (!ALFACRM_HOST || !ALFACRM_EMAIL || !ALFACRM_API_KEY) {
    return { ok: false, skipped: true, reason: 'AlfaCRM не настроен (нет ALFACRM_* переменных)' };
  }
  const base = `https://${ALFACRM_HOST}/v2api`;

  // 1. Авторизация -> токен
  const authRes = await fetch(`${base}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ALFACRM_EMAIL, api_key: ALFACRM_API_KEY }),
  });
  if (!authRes.ok) throw new Error(`AlfaCRM auth ${authRes.status}`);
  const token = (await authRes.json()).token;

  // 2. Создать лид (is_study:0). Имя карточки — ребёнок, остальное в примечание.
  const note = [
    `Родитель: ${parentName}`,
    `Ребёнок: ${childName}, ${childAge} лет`,
    tariff ? `Интересует тариф: ${tariff}` : null,
    'Заявка с сайта «Энциклопедия Невозможного»',
  ].filter(Boolean).join('\n');

  const body = {
    name: childName || parentName,
    legal_type: 1,
    is_study: 0,
    branch_ids: [Number(ALFACRM_BRANCH) || ALFACRM_BRANCH],
    phone: [phone],
    note,
  };
  if (ALFACRM_LEAD_SOURCE_ID) body.lead_source_id = Number(ALFACRM_LEAD_SOURCE_ID);

  const crmRes = await fetch(`${base}/${ALFACRM_BRANCH}/customer/create`, {
    method: 'POST',
    headers: { 'X-ALFACRM-TOKEN': token, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!crmRes.ok) throw new Error(`AlfaCRM create ${crmRes.status}`);
  return { ok: true };
}

// --- MAX: уведомить админа ---
async function notifyMax({ parentName, childName, childAge, phone, tariff }) {
  const recipient = MAX_ADMIN_USER_ID
    ? `user_id=${encodeURIComponent(MAX_ADMIN_USER_ID)}`
    : (MAX_ADMIN_CHAT_ID ? `chat_id=${encodeURIComponent(MAX_ADMIN_CHAT_ID)}` : null);
  if (!MAX_BOT_TOKEN || !recipient) {
    return { ok: false, skipped: true, reason: 'MAX не настроен (нет MAX_BOT_TOKEN / получателя)' };
  }
  const text = [
    '🔥 Новая заявка с сайта лагеря!',
    `Родитель: ${parentName}`,
    `Ребёнок: ${childName}, ${childAge} лет`,
    `Телефон: ${phone}`,
    tariff ? `Тариф: ${tariff}` : 'Тариф: не выбран',
  ].join('\n');

  const res = await fetch(`https://platform-api.max.ru/messages?${recipient}`, {
    method: 'POST',
    headers: { 'Authorization': MAX_BOT_TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, attachments: [] }),
  });
  if (!res.ok) throw new Error(`MAX ${res.status}`);
  return { ok: true };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  let data = req.body;
  if (typeof data === 'string') { try { data = JSON.parse(data); } catch { data = {}; } }
  data = data || {};

  const parentName = (data.parentName || '').toString().trim();
  const childName = (data.childName || '').toString().trim();
  const childAge = (data.childAge || '').toString().trim();
  const phone = (data.phone || '').toString().trim();
  const tariff = (data.tariff || '').toString().trim();

  if (!parentName || !childName || !childAge || !phone) {
    res.status(400).json({ ok: false, error: 'Заполните имя родителя, имя и возраст ребёнка, телефон' });
    return;
  }
  const phoneDigits = phone.replace(/\D/g, '');
  if (phoneDigits.length < 10) {
    res.status(400).json({ ok: false, error: 'Некорректный номер телефона' });
    return;
  }
  const ageNum = parseInt(childAge, 10);
  if (Number.isNaN(ageNum) || ageNum < 4 || ageNum > 17) {
    res.status(400).json({ ok: false, error: 'Некорректный возраст ребёнка' });
    return;
  }

  const payload = { parentName, childName, childAge, phone, tariff };

  // Шлём в обе системы независимо: одна упадёт — вторая всё равно отработает.
  const [crm, max] = await Promise.allSettled([createAlfaLead(payload), notifyMax(payload)]);

  const crmOk = crm.status === 'fulfilled' && crm.value.ok;
  const maxOk = max.status === 'fulfilled' && max.value.ok;

  if (crm.status === 'rejected') console.error('AlfaCRM error:', crm.reason?.message || crm.reason);
  if (max.status === 'rejected') console.error('MAX error:', max.reason?.message || max.reason);

  // Успех для пользователя, если заявка хоть куда-то попала.
  if (crmOk || maxOk) {
    res.status(200).json({ ok: true, crm: crmOk, max: maxOk });
  } else {
    res.status(502).json({ ok: false, error: 'Не удалось сохранить заявку. Напишите нам в Телеграм.' });
  }
}
