import { useOutletContext } from "react-router-dom";
import FormCotacoes from "../componentes/cotacoes/FormCotacoes";
import ListaCotacoes from "../componentes/cotacoes/ListaCotacoes";
import ListaProdutos from "../componentes/produtos/ListaProdutos";
import { listarCotacoes } from "../infra/cotacoes";
import { useEffect } from "react";
import { useState } from "react";
import '../App.css'
import ListaCotacoesProduto from "../componentes/cotacoes/ListaCotacoesProduto";

export default function Cotacoes() {

  const [fornecedores,setFornecedores, produtos, setProdutos,cotacoes,setCotacoes] = useOutletContext();
  const [idEmEdicao,setIdEmEdicao] = useState("");
  const [controle, setControle] = useState(false);
  const [menuCotacoes, setMenuCotacoes] = useState(0);

    async function fetchData() {
      const novaListaCotacoes = await listarCotacoes();
      setCotacoes(novaListaCotacoes);
    }

    useEffect(() => {
      fetchData();
      
    }, [controle]);

    if(menuCotacoes == 0) {
      return (
        <div className="containerMenu">
          <span className="itemMenu" onClick={() => setMenuCotacoes(1)}>Cadastrar Cotação</span>
          <span className="itemMenu" onClick={() => setMenuCotacoes(2)}>Consultar Cotações por Produto</span>
        </div>
      )
    }
    else if(menuCotacoes == 1) {

      return (
          <div>
              <p onClick={() => setMenuCotacoes(0)}>Voltar</p>
              <h2 style={{marginBottom: "0px"}}>Cadastro de Cotacoes</h2>
              <FormCotacoes produtos={produtos} setProdutos={setProdutos} fornecedores={fornecedores} idEmEdicao={idEmEdicao} setIdEmEdicao={setIdEmEdicao} setFornecedores={setFornecedores} controle={controle} setControle={setControle} cotacoes={cotacoes} setCotacoes={setCotacoes}/>
              <ListaCotacoes cotacoes={cotacoes} setIdEmEdicao={setIdEmEdicao} />
          </div>
      );
    }
    else if(menuCotacoes == 2) {
      return (
        <div>
          <ListaCotacoesProduto produtos={produtos} cotacoes={cotacoes} setCotacoes={setCotacoes} setMenuCotacoes={setMenuCotacoes}/>
        </div>
      )
    }
  }
