import { TClientConstructor, TProtocolConstructor, TTransportConstructor, ConnectOptions } from 'thrift';
declare type createConnection = (host: string, port: number, options?: ConnectOptions) => any;
declare type createClient = (client: any, connection: any) => any;
interface UrlOptions {
    host: string;
    port: number;
    https: boolean;
}
export declare class ThriftCompiler {
    transport: TTransportConstructor;
    protocol: TProtocolConstructor;
    url: UrlOptions;
    constructor(transport: TTransportConstructor, protocol: TProtocolConstructor, url: UrlOptions);
    getFactory(connectionType: createConnection, clientType: createClient): ClientFactory;
}
export declare class ClientFactory {
    transport: TTransportConstructor;
    protocol: TProtocolConstructor;
    url: UrlOptions;
    createConnection: createConnection;
    createClient: createClient;
    constructor(transport: TTransportConstructor, protocol: TProtocolConstructor, connectionType: createConnection, clientType: createClient, url: UrlOptions);
    getClient<TClient>(service: TClientConstructor<TClient>, path: string): TClient;
}
export {};
