var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@hapiness/core", "./services", "./routes"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const core_1 = require("@hapiness/core");
    const services_1 = require("./services");
    const routes_1 = require("./routes");
    let ApplicationModule = class ApplicationModule {
        /**
         * Class constructor
         * @param _httpServer wrapper for instance of original Hapi server
         */
        constructor(_httpServer) {
            this._httpServer = _httpServer;
        }
        /**
         * OnStart process
         */
        onStart() {
            console.log(`< Application.bootstrap > Server started at: ${this._httpServer.instance().info.uri}`);
        }
    };
    ApplicationModule = __decorate([
        core_1.HapinessModule({
            version: '1.0.0',
            imports: [],
            declarations: [
                routes_1.GetAllPeopleRoute,
                routes_1.GetRandomPeopleRoute,
                routes_1.GetOnePeopleRoute,
                routes_1.PostCreatePeopleRoute,
                routes_1.PutUpdatePeopleRoute,
                routes_1.DeleteOnePeopleRoute
            ],
            providers: [
                services_1.PeopleService,
                core_1.HttpServerService
            ]
        }),
        __metadata("design:paramtypes", [core_1.HttpServerService])
    ], ApplicationModule);
    exports.ApplicationModule = ApplicationModule;
});
//# sourceMappingURL=application.module.js.map