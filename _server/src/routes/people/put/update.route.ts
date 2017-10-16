import { OnPut, Route, ReplyNoContinue, Request } from '@hapiness/core';
import { PeopleService } from '../../../services';
import * as Boom from 'boom';

@Route({
    path: '/api/people/{id}',
    method: 'PUT',
    config: {
        payload: {
            output: 'data',
            allow: 'application/json',
            parse: true
        }
    }
})
export class PutUpdatePeopleRoute implements OnPut {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(private _peopleService: PeopleService) {
    }

    /**
     * OnPut implementation
     * @param request
     * @param reply
     */
    onPut(request: Request, reply: ReplyNoContinue): void {
        this._peopleService.update(request.params.id, request.payload)
            .do(_ => console.log('DeleteOnePeopleRoute.onPut():', _))
            .subscribe(_ => reply(_), e => reply(Boom.notFound(e.message)));
    }
}
