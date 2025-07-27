import 'jest-preset-angular/setup-jest';

// Optional: Add global mocks if needed
// Example: mocking global objects or browser-specific APIs
Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>',
});
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    display: 'none',
    appearance: ['-webkit-appearance'],
  }),
});
