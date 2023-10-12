import { usersModel } from "../../models/users.model.js";

 export class UsersMongo{

    constructor(){
        this.model= usersModel;
    };

// crear usuario
async save(user){
    try{
        const userCreated = await this.model.create(user);
        return userCreated;
    }catch(error){
        throw error;
   }
};

// traer usuario
async getUsers() {
    try {
        const users = await this.model.find().lean();
        return users;
    } catch (error) {
        console.log(error.message);
        throw new Error("Hubo un error al obtener el usuario");
    }
};

// traer usuario por id  
async getUserById(userId) {
    try {
        const user = await this.model.findById(userId).lean().populate('userProd');
        if(!user){
            throw new Error("Usuario no registrado")
        }
        return user;            
    } catch (error) {
        console.log(error.message);
        throw new Error("Usuario no encontrado");
    }
};
// traer el usuario por el email
async getByEmail(userEmail){
    try {
        const user = await this.model.findOne({email:userEmail});
        if(user){
            return user;
        } else{
            return null;
        }
    } catch (error) {
        throw error;
    }
};

// actualizar usuario
async updateUser(userId, newUserInfo) {
    try {
        const userUpdated = await this.model.findByIdAndUpdate(userId, newUserInfo,{new: true}); // Devolverá el documento modificado después de la actualización
        if (userUpdated) {
            console.log("Usuario actualizado con éxito. El usuario actualizado es:", userUpdated);
            return userUpdated;
        } else {
            throw new Error("Usuario no encontrado");
        }
    } catch (error) {
        console.log(error.message);
        throw new Error("Hubo un error al actualizar el usuario");
    }
};

 }