import { Observable } from 'rxjs';
import { ClientFactory } from './thrift-compiler';
export declare class ThriftService {
    clients: any;
    protected factory: ClientFactory;
    protected callback: (err: any, res: any) => void;
    protected before_request: (any?: any) => void;
    constructor(factory: ClientFactory, clients: any, callback?: (err: any, res: any) => void, before_request?: (any?: any) => void);
    setCallback(callback: (err: any, res: any) => void): void;
    call(client: any, method: string, data: Object, ...rest: any[]): Observable<any>;
}
