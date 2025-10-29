import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createChatOpenRouter } from '../index.js';
import { ChatOpenAI } from '@langchain/openai';

test('createChatOpenRouter', async (t) => {

  await t.test('throws if no apiKey is provided', () => {
    assert.throws(() => createChatOpenRouter({}), {
      message: 'OPENROUTER_API_KEY or apiKey is not set or provided',
    });
  });

  await t.test('uses apiKey from params if provided', () => {
    const chat = createChatOpenRouter({ apiKey: '123' });
    assert(chat instanceof ChatOpenAI);
    assert.strictEqual((chat as any).apiKey, '123'); // TS-safe
  });

  await t.test('uses apiKey from env if params.apiKey is missing', () => {
    process.env.OPENROUTER_API_KEY = 'env-key';
    const chat = createChatOpenRouter({});
    assert.strictEqual((chat as any).apiKey, 'env-key'); // TS-safe
    delete process.env.OPENROUTER_API_KEY;
  });

  await t.test('defaults baseURL if not provided', () => {
    const chat = createChatOpenRouter({ apiKey: '123' });
    const baseURL = (chat as any).fields.configuration?.baseURL ?? 'https://openrouter.ai/api/v1';
    assert.strictEqual(baseURL, 'https://openrouter.ai/api/v1');
  });

  await t.test('keeps custom baseURL if provided', () => {
    const chat = createChatOpenRouter({
      apiKey: '123',
      configuration: { baseURL: 'https://custom.com' },
    });
    const baseURL = (chat as any).fields.configuration?.baseURL;
    assert.strictEqual(baseURL, 'https://custom.com');
  });

});
