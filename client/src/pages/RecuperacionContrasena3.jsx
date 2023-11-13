import React, { useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import people from "../img/login-people.png";
import { compararContrasena } from "../components/compararContrasena.js";
const RecuperacionContrasena3 = () => {

    const { currentIn } = useContext(AuthContext);
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const [inputs, setInputs] = useState({
        idusuario: currentIn?.idusuario,
        tipousuario: currentIn?.tipousuario,
        contrasenausuario: currentIn?.contrasenausuario,
        nuevacontrasenausuario: "",
    });

    const [contrasena1, setContrasena1] = useState({
        contrasena1: "",
    });
    const [contrasena2, setContrasena2] = useState({
        contrasena2: "",
    });

    useEffect(() => {
        if (contrasena1.contrasena1 && contrasena2.contrasena2) {
            if (compararContrasena(contrasena1.contrasena1, contrasena2.contrasena2)) {
                setInputs((prev) => ({ ...prev, nuevacontrasenausuario: contrasena1.contrasena1 }))
                setError(null);
            } else {
                setError("Las contraseñas no coinciden");
            }
        }
    }, [contrasena1, contrasena2]);

    const handleContrasena1Change = (event) => {
        const value = event.target.value;
        setContrasena1({ contrasena1: value });

    };

    const handleContrasena2Change = (event) => {
        const value = event.target.value;
        setContrasena2({ contrasena2: value });

    }

    const [err, setError] = useState(null);

    const navigate = useNavigate();

    const { auth_recov3 } = useContext(AuthContext);


    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (compararContrasena(contrasena1, contrasena2)) {
        //     setInputs((prev) => ({ ...prev, nuevacontrasenausuario: contrasena1 }))
        // }else{
        //     setError("Las contraseñas no coinciden");
        // }

        if (!inputs.nuevacontrasenausuario) {
            setError("Por favor, completa todos los campos");
        } 
        else {
            try {
                //await axios.post("/auth/login", inputs);
                await auth_recov3(inputs);
                setShouldNavigate(true);
            } catch (err) {
                setError(err.response.data);
                console.log(err.response.data);
            }
        }
    };

    useEffect(() => {
        if (shouldNavigate) {
            navigate("/Login");
        }
    }, [shouldNavigate]);

    return (
        <div className="register">
            <div className="register__bg">
                <h1>Recuperación de contraseña</h1>
                <form>
                    <p className="register__bg__text">Por favor ingrese su nueva contraseña</p>
                    <input type="text" placeholder="Nueva contraseña" name="contrasena1" onChange={handleContrasena1Change} />
                   
                    <p className="register__bg__text">Confirme su nueva contraseña</p>
                    <input type="text" placeholder="Nueva contraseña" name="contrasena2" onChange={handleContrasena2Change} />
                   
                    <button type="submit" onClick={handleSubmit}>Confirmar datos</button>
                    {err && <p className="register__bg__error">{err}</p>}
                </form>
            </div>
            <div className="register__img">
                <img src={people} alt="imagen diseño" className="register_img_img" />
            </div>
        </div>
    );
};
export default RecuperacionContrasena3;
