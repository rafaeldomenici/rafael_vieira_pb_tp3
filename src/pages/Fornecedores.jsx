import { useOutletContext } from "react-router-dom";
import FormFornecedores from "../componentes/fornecedores/FormFornecedores";
import ListaContatos from "../componentes/contatos/ListaContatos";
import { listarFornecedores } from "../infra/fornecedores";
import { useEffect } from "react";
import { useState } from "react";
import ListaFornecedores from "../componentes/fornecedores/ListaFornecedores";

export default function Fornecedores() {

  const [fornecedores,setFornecedores] = useOutletContext();
  const [idEmEdicao,setIdEmEdicao] = useState("");
  const [controle, setControle] = useState(false);

    async function fetchData() {
      const novaListaFornecedores = await listarFornecedores();
      setFornecedores(novaListaFornecedores);
    }

    useEffect(() => {
      fetchData();
    }, [controle]);

    return (
        <div>
            <h2>Cadastro de Fornecedores</h2>
            <FormFornecedores idEmEdicao={idEmEdicao} setIdEmEdicao={setIdEmEdicao} setControle={setControle} controle={controle}/>
            <ListaFornecedores fornecedores={fornecedores} setIdEmEdicao={setIdEmEdicao} />
            
        </div>
    );
}