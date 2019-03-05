"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseUrlToUrlOptions(url) {
    var parse_http = url.split('://');
    var has_http = parse_http.length > 1;
    return {
        host: has_http ? parse_http[1].split(':')[0] : url.split(':')[0],
        https: has_http ? parse_http[0] === 'https' : true,
        port: (has_http ? +parse_http[1].split(':')[1] : +url.split(':')[1]) || 80
    };
}
var ThriftCompiler = /** @class */ (function () {
    function ThriftCompiler(transport, protocol, url) {
        if (typeof url === 'string') {
            this.url = parseUrlToUrlOptions(url);
        }
        else {
            this.url = url;
        }
        this.transport = transport;
        this.protocol = protocol;
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
        if (typeof url === 'string') {
            this.url = parseUrlToUrlOptions(url);
        }
        else {
            this.url = url;
        }
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