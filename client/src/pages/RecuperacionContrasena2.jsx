import React from "react";
import people from "../img/login-people.png";
const RecuperacionContrasena2 = () => {
    return (
        <div className="register">
        <div className="register__bg">
            <h1>Recuperación de contraseña</h1>
            <form>
                <p className="register__bg__text">aki iria el texto de la pregunta</p>
                <input type="text" placeholder="Respuesta" />
                <p className="register__bg__error">Esto es un error</p>
                <button type="submit">Confirmar datos</button>
                <p className="register__bg__error">Esto es un error</p>
            </form>
        </div>
        <div className="register__img">
            <img src={people} alt="imagen diseño" className="register_img_img" />
        </div>
    </div>
    );
};
export default RecuperacionContrasena2;
