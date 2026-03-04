type HookEvent = 'user.registered' | 'user.verified';

type HookPayload = {
  'user.registered': { name?: string; email: string };
  'user.verified': { email: string };
};

function formatMessage<E extends HookEvent>(event: E, data: HookPayload[E]): string {
  switch (event) {
    case 'user.registered': {
      const d = data as HookPayload['user.registered'];
      return `🆕 *New Registration*\nName: ${d.name || '—'}\nEmail: \`${d.email}\``;
    }
    case 'user.verified': {
      const d = data as HookPayload['user.verified'];
      return `✅ *Email Verified*\nEmail: \`${d.email}\``;
    }
    default:
      return `Event: ${event}`;
  }
}

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn('[hooks] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set');
    return;
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
    }),
  });

  if (!res.ok) {
    console.error('[hooks] Telegram API error:', res.status, await res.text());
  }
}

export async function emitHook<E extends HookEvent>(event: E, data: HookPayload[E]) {
  try {
    const message = formatMessage(event, data);
    await sendTelegram(message);
  } catch {
    // fire-and-forget — never break app flow
  }
}
