import React, { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import logo from '../img/Mochi.jpeg';

const InfoBar = () => {

    const navigate = useNavigate();
    const [direccionar, setDireccionar] = useState("");

    useEffect(() => {
        if(direccionar){
            navigate("/Personal-Info");
        }
    },[direccionar]);

    return (
        <div className="content-flex-infobar">
            <Link to="/Personal-info" className="InfoBarImg">
                <img className="imgPersonalInfo" onClick={() => setDireccionar(true)} src={logo} alt="" />
            </Link>
        </div>
    );
};
export default InfoBar;