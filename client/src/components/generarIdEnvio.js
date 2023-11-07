let codigosGenerados = new Set();

export const generarIdEnvio = () => {
    let id = '';
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeros = '0123456789';

    do {
        id = '';
        for (let i = 0; i < 4; i++) {
            id += letras.charAt(Math.floor(Math.random() * letras.length));
        }

        for (let i = 0; i < 4; i++) {
            id += numeros.charAt(Math.floor(Math.random() * numeros.length));
        }
    } while (codigosGenerados.has(id));

    codigosGenerados.add(id);
    return id;
}