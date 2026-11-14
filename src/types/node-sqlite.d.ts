declare module "node:sqlite" {
  export interface DatabaseSync {
    prepare(sql: string): StatementSync;
    exec(sql: string): void;
    close(): void;
    open(path: string): void;
    function(name: string, ...args: any[]): void;
    aggregate(name: string, ...args: any[]): void;
    createTagStore(name: string): void;
    createSession(name: string): void;
    applyChangeset(ds: any): void;
    enableLoadExtension(enable: boolean): void;
    loadExtension(lib: string): void;
    serialize(): Buffer;
    deserialize(buffer: Buffer): void;
    setAuthorizer(authorizer: any): void;
    createModule(...args: any[]): void;
    constructor();
  }

  export interface StatementSync {
    run(...params: any[]): unknown;
    get(...params: any[]): unknown;
    all(...params: any[]): unknown[];
    iterate(...params: any[]): unknown;
    finalize(): void;
    bind(...params: any[]): void;
    reset(): void;
    clearBindings(): void;
  }

  export const DatabaseSync: {
    new(path: string): DatabaseSync;
  };
}
