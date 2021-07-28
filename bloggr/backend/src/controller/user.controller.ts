import { Request, Response } from 'express';
import { omit } from 'lodash';
import { createUser, getUsers } from '../service/user.service';
import log from '../logger';

export async function getUsersHandler(req: Request, res: Response) {

    const users = await getUsers();

    return res.send(users);
}

export async function createUserHandler(req: Request, res: Response) {
    try {
        const user = await createUser(req.body);
        return res.send(omit(user.toJSON(), 'password'));
    } catch (e) {
        log.error(e);
        return res.status(409).send(e.message);
    }
}