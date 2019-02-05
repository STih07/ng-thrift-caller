# ng-thrift-caller
Page on  [GitHub](https://github.com/STih07/ng-thrift-caller)

#### Installation
add to **package.json** as *dependency*
```
"ng-thrift-caller": "git+https://github.com/STih07/ng-thrift-caller.git"
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

  let clients = {
    'USER': factory.getClient(UserService, '/user'),
    'PROJECT': factory.getClient(ProjectService, '/project')
  };

  return new ThriftService(factory, clients, callback);
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
        this.thrift.call(this.thrift.USER, 'login', {...})
            .subscribe(...)
    }
}
```
