import { getErrorMessage } from '../getErrorMessage';

describe('getErrorMessage', () => {
  it('should return "Unknown error" for null or undefined', () => {
    expect(getErrorMessage(null)).toBe('Unknown error');
    expect(getErrorMessage(undefined)).toBe('Unknown error');
  });

  it('should return the string as-is', () => {
    expect(getErrorMessage('Custom error message')).toBe('Custom error message');
  });

  it('should extract message from Error objects', () => {
    const error = new Error('Test error message');
    expect(getErrorMessage(error)).toBe('Test error message');
  });

  it('should extract message from objects with message property', () => {
    const error = { message: 'Object error message' };
    expect(getErrorMessage(error)).toBe('Object error message');
  });

  it('should extract error from objects with error property', () => {
    const error = { error: 'Alternative error message' };
    expect(getErrorMessage(error)).toBe('Alternative error message');
  });

  it('should use toString method when available', () => {
    const error = {
      toString: () => 'Custom toString message',
    };
    expect(getErrorMessage(error)).toBe('Custom toString message');
  });

  it('should fallback to String() conversion', () => {
    const error = { custom: 'property' };
    expect(getErrorMessage(error)).toBe('[object Object]');
  });

  it('should handle objects where toString throws', () => {
    const error = {
      toString: () => {
        throw new Error('toString failed');
      },
    };
    expect(getErrorMessage(error)).toBe('Unknown error');
  });
});
