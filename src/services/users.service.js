import { usersDao } from "../dao/factory.js";

export class UsersService {
   static getUserByEmail = async (email) =>{
    return await usersDao.getByEmail(email);
   };
   static createUser = async (newUser) =>{
    return await usersDao.save(newUser);
   };
   static getUserById = async (userId) =>{
    return  await usersDao.getUserById(userId);
   };
   static getUsers = async ()=>{
      return await usersDao.getUsers();
   };
   static  updateUser = async (userId, newUserInfo) =>{
      return await usersDao.updateUser(userId, newUserInfo);
   };
};