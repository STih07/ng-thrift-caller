import { Observable } from 'rxjs';
import { ClientFactory } from './thrift-compiler';
export declare class ThriftService {
    clients: any;
    private factory;
    private callback;
    constructor(factory: ClientFactory, clients: any, callback?: (err: any, res: any) => void);
    call(client: any, method: string, data: Object): Observable<any>;
}
