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
        define(["require", "exports", "@hapiness/core", "../../../services"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const core_1 = require("@hapiness/core");
    const services_1 = require("../../../services");
    let GetRandomPeopleRoute = class GetRandomPeopleRoute {
        /**
         * Class constructor
         * @param _peopleService
         */
        constructor(_peopleService) {
            this._peopleService = _peopleService;
        }
        /**
         * OnGet implementation
         * @param request
         * @param reply
         */
        onGet(request, reply) {
            this._peopleService.random()
                .do(_ => console.log('GetRandomPeopleRoute.onGet():', _))
                .subscribe(_ => !_ ? reply().code(204) : reply(_));
        }
    };
    GetRandomPeopleRoute = __decorate([
        core_1.Route({
            path: '/api/people/random',
            method: 'GET'
        }),
        __metadata("design:paramtypes", [services_1.PeopleService])
    ], GetRandomPeopleRoute);
    exports.GetRandomPeopleRoute = GetRandomPeopleRoute;
});
//# sourceMappingURL=random.route.js.map