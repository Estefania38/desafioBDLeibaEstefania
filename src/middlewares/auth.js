export const checkAuthenticated = (req,res,next)=>{
    if(req.user){
        next();
    } else {
         res.redirect("/login");  
    }
};

export const showLoginView = (req,res,next)=>{
    if(req.user){
        res.redirect("/perfil");
    } else {
        next();
    }
};

export const checkRole = (roles)=>{ 
    return (req,res,next)=>{
        if(roles.includes(req.user.role)){
            next();
        } else {
           res.render("/perfil", { message: "Su usuario no cuenta con permiso para esta Pagina" });
            // res.redirect("/perfil");
        }
    }
};

