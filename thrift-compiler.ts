import { TClientConstructor, TProtocolConstructor, TTransportConstructor, ConnectOptions } from 'thrift';

export interface UrlOptions {
  host: string;
  port: number;
  https: boolean;
}

type createConnection = (host: string, port: number, options?: ConnectOptions) => any;
type createClient = (client, connection) => any;

export class ThriftCompiler {
  transport: TTransportConstructor;
  protocol: TProtocolConstructor;
  url: UrlOptions;
  constructor(transport: TTransportConstructor, protocol: TProtocolConstructor, url: UrlOptions) {
    this.transport = transport;
    this.protocol = protocol;
    this.url = url;
  }

  getFactory(connectionType: createConnection, clientType: createClient) : ClientFactory {
    return new ClientFactory(this.transport, this.protocol, connectionType, clientType, this.url);
  };
}


export class ClientFactory {
  transport: TTransportConstructor;
  protocol: TProtocolConstructor;
  url: UrlOptions;
  createConnection: createConnection;
  createClient: createClient;
  constructor(transport: TTransportConstructor, protocol: TProtocolConstructor, connectionType: createConnection,
              clientType: createClient, url: UrlOptions) {
    this.url = url;
    this.transport = transport;
    this.protocol = protocol;
    this.createConnection = connectionType;
    this.createClient = clientType;
  };

  getClient<TClient>(service: TClientConstructor<TClient>, path: string) : TClient {
    let connection = this.createConnection(this.url.host, this.url.port, {
      transport: this.transport,
      protocol: this.protocol,
      https: this.url.https,
      path: path
    });
    return this.createClient(service, connection);
  };
}



import { TBinaryProtocol } from 'thrift';
import { TBufferedTransport } from 'thrift';

export const ThriftMaker = new ThriftCompiler(TBufferedTransport, TBinaryProtocol, {host: '127.0.0.1', port: 92, https: false});

