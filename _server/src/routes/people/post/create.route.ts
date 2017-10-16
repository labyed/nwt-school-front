import { OnPost, Route, ReplyNoContinue, Request } from '@hapiness/core';
import { PeopleService } from '../../../services';
import * as Boom from 'boom';

@Route({
    path: '/api/people',
    method: 'POST',
    config: {
        payload: {
            output: 'data',
            allow: 'application/json',
            parse: true
        }
    }
})
export class PostCreatePeopleRoute implements OnPost {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(private _peopleService: PeopleService) {
    }

    /**
     * OnPost implementation
     * @param request
     * @param reply
     */
    onPost(request: Request, reply: ReplyNoContinue): void {
        this._peopleService.create(request.payload)
            .do(_ => console.log('PostCreatePeopleRoute.onPost():', _))
            .subscribe(_ => reply(_), e => reply(Boom.conflict(e.message)));
    }
}
