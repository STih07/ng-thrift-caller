"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var thrift_compiler_1 = require("./thrift-compiler");
var core_1 = require("@angular/core");
var ThriftService = /** @class */ (function () {
    function ThriftService(factory, clients, callback) {
        this.clients = clients;
        this.factory = factory;
        this.callback = callback;
    }
    ThriftService.prototype.call = function (client, method, data) {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            client[method](data, function (err, res) {
                _this.callback && _this.callback(err, res);
                if (err) {
                    observer.error(err);
                }
                else if (res) {
                    observer.next(res);
                }
                return { unsubscribe: function () { } };
            });
        });
    };
    ThriftService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [thrift_compiler_1.ClientFactory, Object, Function])
    ], ThriftService);
    return ThriftService;
}());
exports.ThriftService = ThriftService;
//# sourceMappingURL=thrift.service.js.map