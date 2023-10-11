import React from "react";
import people from "../img/login-people.png";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
const RecuperacionContrasena1 = () => {
  /*  const [inputs, setInputs] = useState({
        idusuario: "",
        numeroidentidad: "",
    });
    //const [err, setError] = useState(null);

    const navigate = useNavigate();

  //  const { RecuperacionContrasena1 } = useContext(AuthContext); //como va esto¿¿¿ aaaa

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputs.idusuario || !inputs.numeroidentidad) {
            setError("Por favor, completa todos los campos");
        } else {
            try {
                
            } catch (err) {
                setError(err.response.data);
            }
        }
    };*/

    return (
        <div className="register">
        <div className="register__bg">
            <h1>Recuperación de contraseña</h1>
            <form>
                <p className="register__bg__text">Inserta tu usuario</p>
                <input required type="text" placeholder="Usuario" name="idusuario" />
                <p className="register__bg__error">Esto es un error</p>
                <p className="register__bg__text">Inserta tu numero de identidad</p>
                <input required type="number" placeholder="Numero de identidad" name="numeroidentidad" />
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
}
export default RecuperacionContrasena1;
