import React from "react";
import people from "../img/login-people.png";
const RecuperacionContrasena3 = () => {
    return (
        <div className="register">
        <div className="register__bg">
            <h1>Recuperación de contraseña</h1>
            <form>
                <p className="register__bg__text">Por favor ingrese su nueva contraseña</p>
                <input type="text"/>
                <p className="register__bg__error">Esto es un error</p>
                <p className="register__bg__text">Confirme su nueva contraseña</p>
                <input type="number"/>
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
export default RecuperacionContrasena3;