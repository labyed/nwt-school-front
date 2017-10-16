import { OnGet, Route, ReplyNoContinue, Request } from '@hapiness/core';
import { PeopleService } from '../../../services';

@Route({
    path: '/api/people/random',
    method: 'GET'
})
export class GetRandomPeopleRoute implements OnGet {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(private _peopleService: PeopleService) {}

    /**
     * OnGet implementation
     * @param request
     * @param reply
     */
    onGet(request: Request, reply: ReplyNoContinue): void {
        this._peopleService.random()
            .do(_ => console.log('GetRandomPeopleRoute.onGet():', _))
            .subscribe(_ => !_ ? reply().code(204) : reply(_));
    }
}
