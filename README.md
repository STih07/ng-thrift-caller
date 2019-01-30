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
import { ThriftFactory, ThriftFactoryOptions } from 'ng-thrift-caller';
import { UserService, ProjectService, YourService } from 'path-to-your-thrift';
```
```typescript
const config: ThriftFactoryConfig = {
    transport: TBufferedTransport,
    protocol: TJSONProtocol,
    url: {host: '127.0.0.1', port: 92, https: false}
}
const services: ThriftFactoryServices = {
    USER: {client: UserService, path: '/user'}, //your thrift services
    PROJECT: {client: ProjectService, path: '/project'},
    SERVICE: {client: YourService, path: '/yours'}
 }
const MyConfig: ThriftFactoryOptions = ThriftFactory.getInstance(config, services)
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