import {Request, Response} from 'express'
import createUser from "./services/CreateUser";

export function helloWorld(request: Request, response: Response) {

    const user = createUser({
        email: 'teste@gmail.com',
        password: '1111',
        name: 'sdsdsdsd',
        techs: ['tech1','tech2'],
    });

    return response.json(user)
}
