"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ThriftCompiler = /** @class */ (function () {
    function ThriftCompiler(transport, protocol, url) {
        this.transport = transport;
        this.protocol = protocol;
        this.url = url;
    }
    ThriftCompiler.prototype.getFactory = function (connectionType, clientType) {
        return new ClientFactory(this.transport, this.protocol, connectionType, clientType, this.url);
    };
    ;
    return ThriftCompiler;
}());
exports.ThriftCompiler = ThriftCompiler;
var ClientFactory = /** @class */ (function () {
    function ClientFactory(transport, protocol, connectionType, clientType, url) {
        this.url = url;
        this.transport = transport;
        this.protocol = protocol;
        this.createConnection = connectionType;
        this.createClient = clientType;
    }
    ;
    ClientFactory.prototype.getClient = function (service, path) {
        var connection = this.createConnection(this.url.host, this.url.port, {
            transport: this.transport,
            protocol: this.protocol,
            https: this.url.https,
            path: path
        });
        return this.createClient(service, connection);
    };
    ;
    return ClientFactory;
}());
exports.ClientFactory = ClientFactory;
//# sourceMappingURL=thrift-compiler.js.map