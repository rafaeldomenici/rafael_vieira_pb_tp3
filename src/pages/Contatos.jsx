import { useOutletContext } from "react-router-dom";
import FormContato from "../componentes/contatos/FormContato";
import ListaContatos from "../componentes/contatos/ListaContatos";
import { listarContatos } from "../infra/contatos";
import { useEffect } from "react";
import { useState } from "react";

export default function Contatos() {

  const [contatos,setContatos,fornecedores,setFornecedores] = useOutletContext();
  const [idEmEdicao,setIdEmEdicao] = useState("");
  const [controle, setControle] = useState(false);

    async function fetchData() {
      const novaListaContatos = await listarContatos();
      setContatos(novaListaContatos);
    }

    useEffect(() => {
      fetchData();
      
    }, [idEmEdicao]);

    return (
        <div>
            <h2>Cadastro de Contatos</h2>
            <FormContato fornecedores={fornecedores} idEmEdicao={idEmEdicao} setIdEmEdicao={setIdEmEdicao} setFornecedores={setFornecedores} controle={controle} setControle={setControle}/>
            <ListaContatos contatos={contatos} setIdEmEdicao={setIdEmEdicao} />
            
        </div>
    );
}
