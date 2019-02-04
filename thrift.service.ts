import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientFactory, UrlOptions } from './thrift-compiler';



@Injectable()
export class ThriftService {
  public clients;
  private factory: ClientFactory;
  private callback;

  constructor(
    factory: ClientFactory,
    clients: any,
    callback?: (err, res) => void
    ) {
    this.clients = clients;
    this.factory = factory;
    this.callback = callback;
  }

  public call(client, method: string, data: Object) {
    return new Observable<any>((observer) => {
      client[method](data, (err, res) => {
        this.callback && this.callback(err, res);
        if (err) {
          observer.error(err);
        } else if(res) {
          observer.next(res);
        }
        return {unsubscribe() {}};
      })
    })
  }
}
