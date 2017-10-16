import { OnGet, Route, ReplyNoContinue, Request } from '@hapiness/core';
import { PeopleService } from '../../../services';

@Route({
    path: '/api/people',
    method: 'GET'
})
export class GetAllPeopleRoute implements OnGet {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(private _peopleService: PeopleService) {
    }

    /**
     * OnGet implementation
     * @param request
     * @param reply
     */
    onGet(request: Request, reply: ReplyNoContinue): void {
        this._peopleService.listAll()
            .do(_ => console.log('GetAllPeopleRoute.onGet():', _))
            .subscribe(_ => (!_ || _.length === 0) ? reply().code(204) : reply(_));
    }
}
