import { OnDelete, Route, ReplyNoContinue, Request } from '@hapiness/core';
import { PeopleService } from '../../../services';
import * as Boom from 'boom';

@Route({
    path: '/api/people/{id}',
    method: 'DELETE'
})
export class DeleteOnePeopleRoute implements OnDelete {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(private _peopleService: PeopleService) {
    }

    /**
     * OnDelete implementation
     * @param request
     * @param reply
     */
    onDelete(request: Request, reply: ReplyNoContinue): void {
        this._peopleService.delete(request.params.id)
            .do(_ => console.log('DeleteOnePeopleRoute.onDelete():', _))
            .subscribe(_ => (!_ || _.length === 0) ? reply().code(204) : reply(_), e => reply(Boom.notFound(e.message)));
    }
}
