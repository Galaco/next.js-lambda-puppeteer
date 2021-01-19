declare module '*.css';

declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
}
