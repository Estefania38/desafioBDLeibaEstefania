import { usersDao } from "../dao/index.js";

export class UsersService {
   static getUserByEmail = async (email) =>{
    return await usersDao.getByEmail(email);
   };
   static createUser = async (newUser) =>{
    return await usersDao.createUser(newUser);
   };
   static getUserById = async (userId) =>{
    return  await usersDao.getUserById(userId);
   };
};