import * as thrift from './thrift.service';
import * as compiler from './thrift-compiler';


export interface UrlOptions {
    host: string;
    port: number;
    https: boolean;
};

export const ThriftService = thrift.ThriftService;
export const ClientFactory = compiler.ClientFactory;