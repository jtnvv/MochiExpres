import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ModuloEnvio from "./ModuloEnvio";
const Envios = () => {
    
    const [datos, setDatos] = useState({
        id: "",
        nombre: "",
        fechaEnvioRealizado: "",
        fechaEnvioEntregado: "",
        repartidor: "",
        tarifa: ""
      });
      const [redirigir, setRedirigir] = useState(false);
    
      const actualizarDatos = (id, nombre, fechaEnvioRealizado, fechaEnvioEntregado, tarifa) => {
        setDatos({
          id,
          nombre,
          fechaEnvioRealizado,
          fechaEnvioEntregado,
          tarifa
        });
        setRedirigir(true);
      };
    
      useEffect(() => {
        if (redirigir) {
          const url = `/EnviosInfo?id=${datos.id}&nombre=${datos.nombre}&fechaEnvioRealizado=${datos.fechaEnvioRealizado}&fechaEnvioEntregado=${datos.fechaEnvioEntregado}&repartidor=${datos.repartidor}&tarifa=${datos.tarifa}`;
          window.location.href = url;
        }
      }, [redirigir, datos]);
    return (
        <div className="content-flex">
            <Sidebar/>
            <div className="divContent">
                <div className="ItemsContainerEnvio">
                    <div className="BarraRepartidor">
                        <div className="containerButtonsRepartidor">
                            <h3 className="styleH3Clientes">Envíos</h3>
                        </div>
                        <div className="containerBusquedaRepartidor">
                            <input type="text" className="BusquedaRepartidor" placeholder="Buscar Envío"/>
                            <div className="InfoBarImg">
                                <img className="imgPersonalInfo"  src="https://i.imgur.com/T9X0JHm.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="ModuloEnvioBarra" onClick={() => actualizarDatos("170703","Andersson","17/06/03","17/07/03","17000.0")}>
                        <ModuloEnvio  id={"170703"} nombre={"Andersson"} fechaEnvioRealizado={"17/06/03"} 
                            fechaEnvioEntregado={"17/07/03"} repartidor={"Ivana"} tarifa={"17000.0"} />    
                    </div>
                        
                    <div className="ModuloEnvioBarra" onClick={() => actualizarDatos("240404","Ivana","24/04/04","24/05/04","19000.90")}>
                        <ModuloEnvio id={"240404"} nombre={"Ivana"} fechaEnvioRealizado={"24/04/04"} 
                        fechaEnvioEntregado={"24/05/04"} repartidor={"Kelly"} tarifa={"19000.90"} />    
                    </div>
                        
                    <div className="ModuloEnvioBarra" onClick={() => actualizarDatos("190900","Hernan","19/04/77","19/07/77","47000.54")}>
                        <ModuloEnvio  id={"190900"} nombre={"Hernan"} fechaEnvioRealizado={"19/04/77"} 
                        fechaEnvioEntregado={"19/07/77"} repartidor={"Catalina"} tarifa={"47000.54"} />    
                    </div>
                    
                </div>
            </div>
        </div>
    );
};
export default Envios;