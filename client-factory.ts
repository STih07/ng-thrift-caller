import { ThriftMaker } from './thrift-compiler';
import { createXHRClient, createXHRConnection } from 'thrift';


export const ClientFactory = ThriftMaker.getFactory(createXHRConnection, createXHRClient);
