export interface daoInterface<T>{
    create(params: T): Promise<T | null>;
    update(params: T): Promise<T | null>;
    delete(id: string): Promise<string | null>
    get(id: string): Promise<T | null>
    // list() filterの実装が難しそうなため未実装
}