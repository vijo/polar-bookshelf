import uuid from 'uuid';
import {UUID} from './UUID';

export class UUIDs {

    public static create(): UUID {
        return uuid.v1();
    }

    public static compare(u0?: UUID, u1?: UUID) {

        if (u0 === undefined && u1 !== undefined) {
            return -1;
        }

        if (u0 === undefined && u1 === undefined) {
            return 0;
        }

        if (u0 !== undefined && u1 === undefined) {
            return 1;
        }

        // TODO: It's better to NOT use localeCompare but couldn't find an
        // easy workaround and since the chars are just ASCII we should be fine.
        return u0!.localeCompare(u1!, "en-us");
    }

}
