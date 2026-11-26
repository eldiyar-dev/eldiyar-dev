import {test} from 'node:test';
import assert from 'node:assert/strict';
import {publishPending, telegramPayload} from './publish.mjs';

const post = {
  slug: 'owner-repo',
  githubUrl: 'https://github.com/owner/repo',
  content: {title: 'Repo <name>', summary: 'Описание & детали'},
  telegram: {status: 'pending'},
};

test('builds a caption with two distinct destinations', () => {
  const payload = telegramPayload(post, 'https://eldiyar.dev/ru/stack/digest/owner-repo');
  assert.match(payload.caption, /Repo &lt;name&gt;/);
  assert.match(payload.caption, /Описание &amp; детали/);
  assert.deepEqual(payload.reply_markup.inline_keyboard[0].map(button => button.url), [
    'https://eldiyar.dev/ru/stack/digest/owner-repo',
    post.githubUrl,
  ]);
});

test('only sends after the article is live and a claim has been saved', async () => {
  const current = structuredClone(post);
  const events = [];
  await publishPending([{...post, telegram: undefined}, current], {
    waitForPage: async () => events.push('live'),
    prepare: async () => events.push('prepare'),
    persist: async () => events.push(current.telegram.status),
    send: async () => {events.push('send'); return {kind: 'sent', messageId: 123};},
  });
  assert.deepEqual(events, ['live', 'prepare', 'sending', 'send', 'sent']);
  assert.equal(current.telegram.messageId, 123);
});

test('does not resend if Telegram may already have accepted the message', async () => {
  const current = structuredClone(post);
  let sends = 0;
  const deps = {
    waitForPage: async () => {},
    prepare: async () => {},
    persist: async () => {},
    send: async () => {sends++; throw new Error('connection closed');},
  };
  await assert.rejects(publishPending([current], deps), /connection closed/);
  assert.equal(current.telegram.status, 'sending');
  await assert.rejects(publishPending([current], deps), /проверьте канал/);
  assert.equal(sends, 1);
});

test('a definite Telegram rejection can be retried', async () => {
  const current = structuredClone(post);
  await assert.rejects(publishPending([current], {
    waitForPage: async () => {},
    prepare: async () => {},
    persist: async () => {},
    send: async () => ({kind: 'rejected', code: 429}),
  }), /429/);
  assert.equal(current.telegram.status, 'pending');
});
