// polyfill.ts

declare global {
  // Only extend NodeJS.Global for Node.js environments
  // to avoid conflicts with DOM typings
  namespace NodeJS {
    interface Global {
      btoa?: (data: string) => string;
      atob?: (base64: string) => string;
    }
  }
}

// Only polyfill in Node.js (not browsers)
if (typeof window === 'undefined') {
  if (typeof global.btoa === 'undefined') {
    global.btoa = (data: string) =>
      Buffer.from(data, 'utf-8').toString('base64');
  }

  if (typeof global.atob === 'undefined') {
    global.atob = (base64: string) =>
      Buffer.from(base64, 'base64').toString('utf-8');
  }
}

export {}; // Required for global declaration
