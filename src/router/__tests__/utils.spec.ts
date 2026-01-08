import { removeDataLayer } from '@/router/utils.ts';
import { describe, it, expect } from 'vitest';

describe('api', () => {
  it('will remove duplicate data when present', () => {
    const response = {
      headers: {},
      data: { data: [] },
      config: {},
    };

    const result = removeDataLayer(response);

    expect(result.headers).not.toBeUndefined();
    expect(result.config).not.toBeUndefined();
    expect(result.data).toEqual([]);
  });

  it('will not remove data key when not nested', () => {
    const response = {
      headers: {},
      data: { hello: 'world' },
      config: {},
    };

    const result = removeDataLayer(response);

    expect(result.headers).not.toBeUndefined();
    expect(result.config).not.toBeUndefined();
    expect(result.data).toEqual({ hello: 'world' });
  });
});
