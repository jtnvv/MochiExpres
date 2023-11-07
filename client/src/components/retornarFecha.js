export const retornarFecha = (fecha) => {
    let nuevaFecha = new Date(fecha);
    let formattedDate = nuevaFecha.toISOString().replace('T', ' ').substring(0, 19);
    return formattedDate;
}
