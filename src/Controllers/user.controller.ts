import { Request, Response } from 'express';
import { getUsersData, createUser } from '../Services/user.service';


const getUsers = async(req: Request, res:Response) => {
    try{
        console.log("getting users");
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const responseUsers = await getUsersData(page, limit);
        res.send(responseUsers);
    } catch(err: any){
        res.status(400).json({message: err.message});
    }
}

const addUser = async (req:Request, res: Response) => {

    try{
        const responseUsers = await createUser(req.body);
        res.send(responseUsers);
    } catch(err: any){
        res.status(400).json({message: err.message});
    }
}


export default { getUsers, addUser }