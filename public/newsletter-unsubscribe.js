(() => {
  const token = location.hash.slice(1);
  history.replaceState(null, '', location.pathname);
  const form = document.getElementById('unsubscribe');
  const heading = document.getElementById('heading');
  const message = document.getElementById('message');
  if (!/^v1\.[a-f0-9-]{36}\.[a-f0-9]{64}$/.test(token)) {
    heading.textContent = 'Open the link in your email.';
    message.textContent = 'Please reopen the unsubscribe link in a note from me, or get in touch below.';
    return;
  }
  form.hidden = false;
  form.action = '/api/newsletter/unsubscribe?token=' + encodeURIComponent(token);
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const button = form.querySelector('button');
    button.disabled = true;
    button.textContent = 'Saving…';
    try {
      const result = await fetch(form.action, { method:'POST' });
      const data = await result.json();
      if (!result.ok || data.code !== 'unsubscribed') throw new Error('unavailable');
      heading.textContent = 'You’re unsubscribed.';
      message.textContent = 'You won’t receive future Notes from Jatto Abdul. Your other topic preferences are unchanged. An email already being delivered may still arrive.';
      form.hidden = true;
      heading.focus();
    } catch {
      message.textContent = 'I couldn’t save that request. Please try again, or write to me below for help.';
      button.disabled = false;
      button.textContent = 'Try again';
    }
  });
})();
