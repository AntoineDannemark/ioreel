declare global {
    interface Window {
        // TODO Consider typing api?
        // https://stackoverflow.com/questions/56457935/typescript-error-property-x-does-not-exist-on-type-window/56458070
        api: any;
    }
}

export interface IDbInitResult {
    dbReady: boolean;
    error: string | null;
}
  
export interface IError {
    header: string;
    message: string;
}

export interface IState {
    tenants: any[];
    fetchPending: Boolean;
    fetchError: IError | null;
    createPending: boolean;
    createError: IError | null;
    updatePending: boolean;
    updateError: IError | null;
    removePending: boolean;
    removeError: IError | null;
}