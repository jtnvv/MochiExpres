export const getEstado = (numero) => {
    switch(numero){
        case 1:
            return "Entregado";
        case 2:
            return "En bodega";
        case 3:
            return "En camino";
        default:
            return "None";
    }
}

export const obtenerValorEstado = (estado) => {
    switch(estado){
        case "Entregado":
            return 1;
        case "En bodega":
            return 2;
        case "En camino":
            return 3;
        default:
            return 0;
    }
}