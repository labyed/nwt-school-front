import { HapinessModule, OnStart, HttpServerService } from '@hapiness/core';
import { PeopleService } from './services';
import {
    GetAllPeopleRoute,
    GetRandomPeopleRoute,
    GetOnePeopleRoute,
    PostCreatePeopleRoute,
    PutUpdatePeopleRoute,
    DeleteOnePeopleRoute
} from './routes';

@HapinessModule({
    version: '1.0.0',
    imports: [],
    declarations: [
        GetAllPeopleRoute,
        GetRandomPeopleRoute,
        GetOnePeopleRoute,
        PostCreatePeopleRoute,
        PutUpdatePeopleRoute,
        DeleteOnePeopleRoute
    ],
    providers: [
        PeopleService,
        HttpServerService
    ]
})
export class ApplicationModule implements OnStart {
    /**
     * Class constructor
     * @param _httpServer wrapper for instance of original Hapi server
     */
    constructor(private _httpServer: HttpServerService) {
    }

    /**
     * OnStart process
     */
    onStart(): void {
        console.log(`< Application.bootstrap > Server started at: ${this._httpServer.instance().info.uri}`);
    }
}
