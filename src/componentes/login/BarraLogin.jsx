import Login from "./Login";
import Logout from "./Logout";

export default function BarraLogin({usuario, setUsuario}) {

    if (usuario.id) {
        return <Logout usuario={usuario} setUsuario={setUsuario} />
    } else {
        return (
            <div>
                <Login usuario={usuario} setUsuario={setUsuario} />
            </div>
        )
    }
}
