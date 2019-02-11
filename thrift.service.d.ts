import { Observable } from 'rxjs';
import { ClientFactory } from './thrift-compiler';
export declare class ThriftService {
    clients: any;
    private factory;
    private callback;
    private before_request;
    constructor(factory: ClientFactory, clients: any, callback?: (err: any, res: any) => void, before_request?: (any?: any) => void);
    call(client: any, method: string, data: Object, ...rest: any[]): Observable<any>;
}
