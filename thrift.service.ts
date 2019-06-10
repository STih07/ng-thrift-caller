import { Observable } from 'rxjs';
import { ClientFactory } from './thrift-compiler';
import { Injectable } from '@angular/core';

@Injectable()
export class ThriftService {
  public clients;
  protected factory: ClientFactory;
  protected callback: (err, res) => void;
  protected before_request: (any?) => void;

  constructor(
    factory: ClientFactory,
    clients: any,
    callback?: (err, res) => void,
    before_request?: (any?) => void
    ) {
    this.clients = clients;
    this.factory = factory;
    this.callback = callback;
    this.before_request = before_request;
  }

  public setCallback(callback: (err, res) => void) {
    this.callback = callback;
  }

  public call(client, method: string, data: Object, ...rest) {
    return new Observable<any>((observer) => {
      this.before_request && this.before_request(this);
      client[method](data, ...rest, (err, res) => {
        this.callback && this.callback(err, res);
        if (err) {
          observer.error(err);
        } else if(res) {
          observer.next(res);
        }
        observer.complete();
        return {unsubscribe() {}};
      })
    })
  }
}
