import { removeDataLayer } from '@/router/utils.ts';
import type { AxiosResponse } from 'axios';
import { describe, it, expect } from 'vitest';

describe('api', () => {
  it('will remove duplicate data when present', () => {
    const response = {
      headers: {},
      data: { data: [] },
      config: {},
    } as AxiosResponse;

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
    } as AxiosResponse;

    const result = removeDataLayer(response);

    expect(result.headers).not.toBeUndefined();
    expect(result.config).not.toBeUndefined();
    expect(result.data).toEqual({ hello: 'world' });
  });
});
