import React, {useState} from "react";
import people from "../img/login-people.png";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getPreguntaSeguridad } from "../components/preguntaSeguridad.js";
const RecuperacionContrasena2 = () => {


    const { currentIn } = useContext(AuthContext);

    const [inputs, setInputs] = useState({
        idusuario: currentIn?.idusuario,
        respuestapregusuario: "",
    });

    const [err, setError] = useState(null);

    const navigate = useNavigate();

    const { auth_recov2 } = useContext(AuthContext);


    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputs.respuestapregusuario) {
            setError("Por favor, completa todos los campos");
        } else {
            try {
                //await axios.post("/auth/login", inputs);
                await auth_recov2(inputs);
                navigate("/Recuperacion-Contrasena3");
            } catch (err) {
                setError(err.response.data);
                console.log(err.response.data);
            }
        }
    };

    return (
        <div className="register">
        <div className="register__bg">
            <h1>Recuperación de contraseña</h1>
            <form>
                <p className="register__bg__text">{getPreguntaSeguridad(currentIn?.identificadorpregusuario)}</p>
                <input type="text" placeholder="Respuesta" name="respuestapregusuario" onChange={handleChange}/>
              
                <button type="submit"onClick={handleSubmit}>Confirmar datos</button>
                {err && <p className="register__bg__error">{err}</p>}
            </form>
        </div>
        <div className="register__img">
            <img src={people} alt="imagen diseño" className="register_img_img" />
        </div>
    </div>
    );
};
export default RecuperacionContrasena2;
