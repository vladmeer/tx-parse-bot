// custom-env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    BOT_TOKEN: string;
    SOLANA_RPC: string;
  }
}
