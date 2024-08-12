import { useOutletContext } from "react-router-dom";
import FormProdutos from "../componentes/produtos/FormProdutos";
import ListaProdutos from "../componentes/produtos/ListaProdutos";
import { listarProdutos } from "../infra/produtos";
import { useEffect } from "react";
import { useState } from "react";

export default function Produtos() {

  const [fornecedores,setFornecedores, produtos, setProdutos] = useOutletContext();
  const [idEmEdicao,setIdEmEdicao] = useState("");
  const [controle, setControle] = useState(false);

    async function fetchData() {
      const novaListaProdutos = await listarProdutos();
      setProdutos(novaListaProdutos);
    }

    useEffect(() => {
      fetchData();
      
    }, [controle]);

    return (
        <div>
            <h2>Cadastro de Produtos</h2>
            <FormProdutos produtos={produtos} setProdutos={setProdutos} fornecedores={fornecedores} idEmEdicao={idEmEdicao} setIdEmEdicao={setIdEmEdicao} setFornecedores={setFornecedores} controle={controle} setControle={setControle}/>
            <ListaProdutos produtos={produtos} setIdEmEdicao={setIdEmEdicao} />
            
        </div>
    );
}
