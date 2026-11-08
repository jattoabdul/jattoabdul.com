import { createHmac, timingSafeEqual } from 'node:crypto';

const idPattern = '[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}';
const pattern = new RegExp(`^v1\\.(${idPattern})\\.([a-f0-9]{64})$`);
function signature(id: string, secret: string) {
  return createHmac('sha256', secret).update(`newsletter-unsubscribe:v1:${id}`).digest('hex');
}
export function unsubscribeToken(id: string, secret: string) {
  if (secret.length < 32 || !new RegExp(`^${idPattern}$`).test(id))
    throw new Error('unsubscribe_configuration_invalid');
  return `v1.${id}.${signature(id, secret)}`;
}
export function verifyUnsubscribeToken(token: string, secret: string) {
  const match = pattern.exec(token);
  if (!match || secret.length < 32) return null;
  return timingSafeEqual(
    Buffer.from(match[2], 'hex'),
    Buffer.from(signature(match[1], secret), 'hex')
  )
    ? match[1]
    : null;
}
