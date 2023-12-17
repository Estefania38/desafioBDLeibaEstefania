import { usersDao } from "../dao/factory.js";

export class UsersService {
   static getByEmail = async (email) =>{
    return await usersDao.getByEmail(email);
   };
   static save = async (Newuser) =>{
    return await usersDao.save(Newuser);
   };
   static getById = async (userId) =>{
    return  await usersDao.getById(userId);
   };
   static getUsers = async ()=>{
      return await usersDao.getUsers();
   }; updateUser
   static updateUser = async (userId, newUserInfo) =>{
      return await usersDao.updateUser(userId, newUserInfo);
   };
};