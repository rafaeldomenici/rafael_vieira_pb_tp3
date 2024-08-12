export default function Logout({usuario, setUsuario}) {

    return (
        <form>
            Login: <b>{usuario.email}</b>
            <input type="button" value="Logout" />
        </form>
    )
}
