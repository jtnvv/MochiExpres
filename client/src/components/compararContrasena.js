export const compararContrasena = (antigua_contrasena, nueva_contrasena) => {
    if(antigua_contrasena === nueva_contrasena){
        return true;
    }else{
        return false;
    }
}