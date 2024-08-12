export default function Login({ usuario, setUsuario }) {

    const handleChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setUsuario((objetoAtual) => {
            return { ...objetoAtual, [fieldName]: fieldValue }
        });
    };

    return (
        <div className="container">
            <h3>Login</h3>
            <form>
                <label htmlFor="usuario">Email:</label>
                <br />
                <input type="text" name="email" value={usuario.email} onChange={handleChange} />
                <br />
                <label htmlFor="senha">Senha:</label>
                <br />
                <input type="password" name="senha" value={usuario.senha} onChange={handleChange} />
                <br /><br />
                <input type="button" value="Login" />
            </form>
        </div>
    )
}
