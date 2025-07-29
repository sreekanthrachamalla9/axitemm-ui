import { TestBed } from '@angular/core/testing';
import { HttpRequest } from '@angular/common/http';
import { HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { authInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {
  let interceptor: HttpInterceptorFn;

  beforeEach(() => {
    // Simulate browser environment
    jest.spyOn(require('@angular/common'), 'isPlatformBrowser').mockReturnValue(true);

    interceptor = (req, next) =>
      TestBed.runInInjectionContext(() => authInterceptor(req, next));

    // Mock localStorage
    const store: Record<string, string> = {};
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => store[key] || null);
    jest.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation((key, value) => {
      store[key] = value;
    });
    jest.spyOn(window.localStorage.__proto__, 'removeItem').mockImplementation((key) => {
      delete store[key];
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should skip interception for /login URL', async () => {
    const req = new HttpRequest('GET', '/login');
    const next = jest.fn().mockResolvedValue(req);

    const result = await interceptor(req, next);

    expect(next).toHaveBeenCalledWith(req);
    expect(result).toBe(req);
  });

  it('should attach Authorization header if token exists', async () => {
    localStorage.setItem('token', 'test-token');

    const req = new HttpRequest('GET', '/api/data');
    const next = jest.fn().mockImplementation((modifiedReq) => {
      expect(modifiedReq.headers.get('Authorization')).toBe('Bearer test-token');
      return Promise.resolve(modifiedReq);
    });

    await interceptor(req, next);
  });

  it('should NOT attach Authorization header if token is missing', async () => {
    localStorage.removeItem('token');

    const req = new HttpRequest('GET', '/api/data');
    const next = jest.fn().mockImplementation((modifiedReq) => {
      expect(modifiedReq.headers.has('Authorization')).toBe(false);
      return Promise.resolve(modifiedReq);
    });

    await interceptor(req, next);
  });

  it('should NOT attach Authorization header if token is an empty string', async () => {
    localStorage.setItem('token', '');

    const req = new HttpRequest('GET', '/api/data');
    const next = jest.fn().mockImplementation((modifiedReq) => {
      expect(modifiedReq.headers.has('Authorization')).toBe(false);
      return Promise.resolve(modifiedReq);
    });

    await interceptor(req, next);
  });

  it('should not modify request if not running in browser', async () => {
    jest.spyOn(require('@angular/common'), 'isPlatformBrowser').mockReturnValue(false);

    const req = new HttpRequest('GET', '/api/data');
    const next = jest.fn().mockImplementation((modifiedReq) => {
      expect(modifiedReq.headers.has('Authorization')).toBe(false);
      return Promise.resolve(modifiedReq);
    });

    await interceptor(req, next);
  });

  it('should call clone if token is present', async () => {
    localStorage.setItem('token', 'test-token');

    const req = new HttpRequest('GET', '/api/data');
    const cloneSpy = jest.spyOn(req, 'clone');
    const next = jest.fn().mockResolvedValue(req);

    await interceptor(req, next);
    expect(cloneSpy).toHaveBeenCalled();
  });

  it('should not call clone if token is not present', async () => {
    localStorage.removeItem('token');

    const req = new HttpRequest('GET', '/api/data');
    const cloneSpy = jest.spyOn(req, 'clone');
    const next = jest.fn().mockResolvedValue(req);

    await interceptor(req, next);
    expect(cloneSpy).not.toHaveBeenCalled();
  });
});
