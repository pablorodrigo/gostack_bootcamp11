import {Request, Response} from 'express'
import createUser from "./services/CreateUser";

export function helloWorld(request: Request, response: Response) {

    const user = createUser({
        email: 'teste@gmail.com',
        password: '1111',
        name: 'sdsdsdsd',
        techs:[
            {title: 'teste', experience: 100}
        ]
    });

    return response.json(user)
}
