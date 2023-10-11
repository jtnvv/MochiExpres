import React from "react";
import people from "../img/login-people.png";
const RecuperacionContrasena1 = () => {
    return (
        <div className="register">
        <div className="register__bg">
            <h1>Recuperación de contraseña</h1>
            <form>
                <p className="register__bg__text">Inserta tu usuario</p>
                <input type="text" placeholder="Usuario" />
                <p className="register__bg__error">Esto es un error</p>
                <p className="register__bg__text">Inserta tu numero de identidad</p>
                <input type="number" placeholder="Numero de identidad" />
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
export default RecuperacionContrasena1;
