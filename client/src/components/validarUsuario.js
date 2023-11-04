export const validarUsuario = (usuario) => {
    // Expresión regular que verifica los requisitos
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    // Verificar si la contraseña cumple con los requisitos
    return regex.test(usuario);
}