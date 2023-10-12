//Funcion para generar un mensaje de error personalizado hacia el cliente
export const createUserErrorMsg = (user)=>{
    return `
        Uno o mas campos son invalidos,
        Listado de campos requeridos:
        name: Este campo es obligatorio y de tipo string, el dato recibido fue ${user.first_name},
        lastname: Este campo es obligatorio y de tipo string, el dato recibido fue ${user.last_name},
        email: Este campo es obligatorio y de tipo string, el dato recibido fue ${user.email},
    `
}