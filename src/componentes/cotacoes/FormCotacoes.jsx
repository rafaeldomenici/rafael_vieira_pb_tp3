import { useForm } from "react-hook-form"
import { regexEmail, regexNumerico } from "../../Regex";
import { listarProdutos, obterProduto, excluirProduto , inserirProduto, alterarProduto} from "../../infra/produtos";
import { listarFornecedores } from "../../infra/fornecedores";
import { obterCotacao, inserirCotacao, excluirCotacao, alterarCotacao } from "../../infra/cotacoes";
import { useEffect } from "react";
import { useState } from "react";

export default function FormCotacoes({ idEmEdicao, setIdEmEdicao , fornecedores, setFornecedores, controle, setControle, produtos, setProdutos,cotacoes,setCotacoes}) {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue } = useForm();
    const [fornecedoresProduto, setFornecedoresProduto] = useState([]);

    function handleChange(event) {
        
        let index = event.target.value;
        if(index != -1) {
          setFornecedoresProduto(produtos[index].fornecedores);
        }
        else {
          setFornecedoresProduto([]);
        }
    }

    useEffect(() => {
        async function fetchData() {
            if (idEmEdicao && !isSubmitted) {
                
                const cotacao = await obterCotacao(idEmEdicao);
                let opcao = document.querySelectorAll("select")[0].querySelectorAll("option");
                let opcao2 = document.querySelectorAll("select")[1].querySelectorAll("option");
                let index = 0;
                let index2 = 0;
                for(let op = 0; op < opcao.length; op++) {
                  if(opcao[op].textContent == cotacao.produto) {
                    index = op;
                  }
                }
                index--;
                for(let op = 0; op < opcao2.length; op++) {
                  if(opcao2[op].textContent == cotacao.fornecedor) {
                    index2 = op;
                  }
                }
                index2--;

                  setFornecedoresProduto(produtos[index].fornecedores);
                
                setValue("produto", index);
                setValue("fornecedor", index2);
                setValue("data", cotacao.data);
                setValue("valor", cotacao.valor);
                setControle(!controle);
                

            } else {
                reset();
            }
        }

        fetchData();
    }, [idEmEdicao]);

    async function fetchData2() {
      const novaListaFornecedores = await listarFornecedores();
      setFornecedores(novaListaFornecedores);
    }

    async function fetchData3() {
      const novaListaProdutos = await listarProdutos();
      setProdutos(novaListaProdutos);
    }



    useEffect(() => {
      fetchData2();
      fetchData3();
    }, [])


    async function submeterDados(dados) {
          dados.produto = produtos[dados.produto].nomeProduto;
          dados.fornecedor = fornecedoresProduto[dados.fornecedor];

          if(idEmEdicao) {
            await alterarCotacao({...dados, id: idEmEdicao});
            setIdEmEdicao("");
            setControle(!controle);
            reset();
          }
          else {
            let id = await inserirCotacao(dados);
            setIdEmEdicao(id);
            setControle(!controle);
            reset();
          }
        
    }

    async function handleExcluir() {
         await excluirCotacao(idEmEdicao);
         setControle(!controle);
         setIdEmEdicao("");
        
        
    }

    return (
      <>
          <div className="containerContato">
              <form onSubmit={handleSubmit(submeterDados)}>
                <div className="containerGrid"> 
                  
                  <select  {...register("produto", {onChange: (e) => handleChange(e),validate: value => value != '-1' || "Selecione um produto"})}>
                    <option value={-1}>Selecione um produto</option>
                    {produtos.map((item,index) => <option value={index}>{item.nomeProduto}</option>)}
                  </select>
                  <select {...register("fornecedor", {validate: value => value != '-1' || "Selecione um fornecedor"})}>
                    <option value={-1}>Selecione um fornecedor deste produto</option>
                    {fornecedoresProduto.map((item,index) => <option value={index}>{item}</option>)}
                  </select>
                  <div>
                    <label className="formLabel" htmlFor="data">Data</label>&nbsp;
                    <input type="date" size={50} {...register("data", {
                      required: "Data é obrigatória",
                      validate: 
                          (value) => value.length == 10 || "Data deve ter 10 caracteres"
                      
                    })} />
                  </div>
                  <div>
                    <label className="formLabel" htmlFor="valor">Valor</label>&nbsp;
                    <input size={50} {...register("valor", {
                      required: "Valor é obrigatório",
                      validate: {
                          minLength: (value) => value.length >= 2 || "Valor tem que ter pelo menos 2 caracteres",
                          maxLength: (value) => value.length <= 50 || "Valor só pode ter até 50 caracteres",
                      },
                    })} />
                  </div>
                </div>
                  <div className="botoes">
                    <input style={{ margin: "5px", display: "inline-block" }} type="submit" value="Salvar" />
                    <input style={{ margin: "5px", display: "inline-block" }} type="button" value="Excluir" onClick={handleExcluir} />
                  </div>
              </form>
          </div>
          <div className="errorsContainer">
              {errors.produto?.message && (
                  <div>{errors.produto.message}</div>
              )}
              {errors.fornecedor?.message && (
                  <div>{errors.fornecedor.message}</div>
              )}
              {errors.data?.message && (
                  <div>{errors.data.message}</div>
              )}
              {errors.valor?.message && (
                  <div>{errors.valor.message}</div>
              )}
          </div>
      </>
  );
}