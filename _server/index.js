(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@hapiness/core", "./application.module"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const core_1 = require("@hapiness/core");
    const application_module_1 = require("./application.module");
    // bootstrap application
    core_1.Hapiness.bootstrap(application_module_1.ApplicationModule, [
        core_1.HttpServerExt.setConfig({
            host: '0.0.0.0', port: 9000, options: {
                connections: {
                    routes: {
                        cors: {
                            origin: ['http://0.0.0.0:4200', 'http://localhost:4200', 'http://127.0.0.1:4200']
                        }
                    }
                }
            }
        })
    ]);
});
//# sourceMappingURL=index.js.map