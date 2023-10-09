export const getPreguntaSeguridad = (numero) => {
    switch(numero){
        case 1:
            return "¿Cuál es tu color favorito?";
        case 2:
            return "¿Ciudad en la que se casaron tus padres?";
        case 3:
            return "¿Nombre de tu primera mascota?";
        default:
            return "None";
    }
}