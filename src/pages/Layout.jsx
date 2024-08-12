import { Outlet, Link } from "react-router-dom";
import BarraLogin from "../componentes/login/BarraLogin";
import { useState } from "react";

export default function Layout() {

    const [usuario, setUsuario] = useState({ id: "aaa", email: "", senha: ""});
    const [contatos,setContatos] = useState([]);
    const [fornecedores, setFornecedores] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [cotacoes, setCotacoes] = useState([]);

    return (
        <div style={{width: "800px"}}>
            <BarraLogin usuario={usuario} setUsuario={setUsuario} />
            {usuario.id &&
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to={"/"}>Início</Link>
                            </li>
                            <li>
                                <Link to={"/fornecedores"}>Fornecedores</Link>
                            </li>
                            <li>
                                <Link to={"/contatos"}>Contatos</Link>
                            </li>
                            <li>
                                <Link to={"/produtos"}>Produtos</Link>
                            </li>
                            <li>
                                <Link to={"/cotacoes"}>Cotações</Link>
                            </li>
                        </ul>
                    </nav>
                    
                    <Outlet context={[contatos,setContatos,fornecedores,setFornecedores,produtos,setProdutos,cotacoes,setCotacoes]} />
                </div>
            }
        </div>
    )
};
