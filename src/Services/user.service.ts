import { paginate } from "../Helpers/pagination"
import userModel from "../Models/user.model"

const getUsersData = async (page:number, limit:number) => await paginate(userModel, {page, limit});

const createUser = async(body: JSON) => {

    console.log(body);
    const userCreated = await userModel.create(body);
}

export {getUsersData, createUser}