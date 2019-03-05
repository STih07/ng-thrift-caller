# ng-thrift-caller
Page on  [GitHub](https://github.com/STih07/ng-thrift-caller)
[NPM](https://www.npmjs.com/package/ng-thrift-caller)

#### Installation
Install via **npm**
```
npm i -S ng-thrift-caller
```

#### Configure

1. Provide service in your **app.module.ts**
```typescript
import { ThriftService } from 'ng-thrift-caller';
import { ClientFactory, UrlOptions } from 'ng-thrift-caller';
import { UserService, ProjectService } from 'path-to-your-thrift';
```
```typescript
export function MyConfig() {

  let url: UrlOptions = {host: '127.0.0.1', port: 92, https: false};
  /* OR 
  * let url = 'https://127.0.0.1:92',
  * also url = '127.0.0.1' will be parsed with https: true and port 80
  */
  

  let factory = new ClientFactory(TBufferedTransport, TBinaryProtocol, createXHRConnection, createXHRClient, url);

  let callback = (err, res) => {
    if (err) {
      if(err.code == 2) {
        console.warn('YOUR TOKEN WAS DEPRECATED!');
      }
      console.error(err);
    } else if (res) {
      console.log(res);
    }
  };
  
  let prerequest = () => {
    console.log('One more request started!');
  }

  let clients = {
    'USER': factory.getClient(UserService, '/user'),
    'PROJECT': factory.getClient(ProjectService, '/project')
  };

  return new ThriftService(factory, clients, callback, prerequest);
};
```
```typescript
@NgModule({
    //{...},
    providers: [
        {...},
        { 
            provide: ThriftService,
            useFactory: MyConfig
        },
        {...}
    ],
    //{...}
})
```

#### Usage
```typescript
import { ThriftService } from 'ng-thrift-caller';

@Component()
export class YourComponent {
    constructor(private thrift: ThriftService) {
        this.thrift.call(this.thrift.clients.USER, 'login', {...})
            .subscribe(...)
    }
}
```
