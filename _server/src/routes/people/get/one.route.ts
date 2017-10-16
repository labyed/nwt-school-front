import { OnGet, Route, ReplyNoContinue, Request } from '@hapiness/core';
import { PeopleService } from '../../../services';
import * as Boom from 'boom';

@Route({
    path: '/api/people/{id}',
    method: 'GET'
})
export class GetOnePeopleRoute implements OnGet {
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
        this._peopleService.one(request.params.id)
            .do(_ => console.log('GetOnePeopleRoute.onGet():', _))
            .subscribe(_ => reply(_), e => reply(Boom.notFound(e.message)));
    }
}
