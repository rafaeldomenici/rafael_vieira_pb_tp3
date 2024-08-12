import { useForm } from "react-hook-form"
import { regexEmail, regexNumerico } from "../../Regex";
import { listarProdutos, obterProduto, excluirProduto , inserirProduto, alterarProduto} from "../../infra/produtos";
import { listarFornecedores } from "../../infra/fornecedores";
import { useEffect } from "react";

export default function FormProdutos({ idEmEdicao, setIdEmEdicao , fornecedores, setFornecedores, controle, setControle, produtos, setProdutos}) {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue } = useForm();

    useEffect(() => {
        async function fetchData() {
            let select1 = document.querySelector("select");
            if (idEmEdicao && !isSubmitted) {
                select1.querySelectorAll("option")[0].innerText = "Adicionar fornecedor";
                
                const produto = await obterProduto(idEmEdicao);
                setValue("nomeProduto", produto.nomeProduto);
                setValue("descricao", produto.descricao);
                setValue("fornecedor", -1);
                
            } else {
              select1.querySelectorAll("option")[0].innerText = "Selecione um fornecedor";
                reset();
            }
        }

        fetchData();
    }, [idEmEdicao]);

    async function fetchData2() {
      const novaListaFornecedores = await listarFornecedores();
      setFornecedores(novaListaFornecedores);
    }



    useEffect(() => {
      
      fetchData2();
    }, [])


    async function submeterDados(dados) {

      setProdutos(await listarProdutos());
          
      let obj = {};
      for(let prod of produtos) {
          if(dados.nomeProduto === prod.nomeProduto) {
            obj = prod;
            break;
          }
      }
    if(obj.nomeProduto) {
      console.log(obj);
      if(!obj.fornecedores.includes(dados.fornecedor) && dados.fornecedor != -1) {
        obj.fornecedores.push(dados.fornecedor);
      }
      obj.descricao = dados.descricao;
      await alterarProduto(obj);
      setControle(!controle);
      setIdEmEdicao("");
      reset();
    }
    else {
      dados.fornecedores = [];
      if(dados.fornecedor != -1) {
        dados.fornecedores.push(dados.fornecedor);
      }
      let id = await inserirProduto(dados);
      setControle(!controle);
      setIdEmEdicao(id);
      reset();
    }
        
        
    }

    async function handleExcluir() {
         await excluirProduto(idEmEdicao);
         setControle(!controle);
         setIdEmEdicao("");
        
        
    }

    return (
        <>
            <div className="containerProdutos">
                <form onSubmit={handleSubmit(submeterDados)}>
                    <label className="formLabel" htmlFor="nomeProduto">Nome do Produto</label>&nbsp;
                    <input size={50} {...register("nomeProduto", {
                        required: "Nome do produto é obrigatório",
                        validate: {
                            minLength: (value) => value.length >= 5 || "Nome tem que ter pelo menos 5 caracteres",
                            maxLength: (value) => value.length <= 50 || "Nome só pode ter até 50 caracteres",
                        },
                    })} />
                    <br />
                    <label className="formLabel" htmlFor="descricao">Descrição</label>&nbsp;
                    <input size={30} {...register("descricao", {
                        required: "Descrição do produto é obrigatória",
                        validate: {
                            minLength: (value) => value.length >= 5 || "Descrição tem que ter pelo menos 5 caracteres",
                            maxLength: (value) => value.length <= 30 || "Descrição só pode ter até 30 caracteres",
                            
                        },
                    })} />
                    <br />
                    <label></label>
                    <select {...register("fornecedor")}>
                      <option value={-1}>Selecione um fornecedor</option>
                      {fornecedores.map(item => <option value={item.nomeFantasia}>{item.nomeFantasia}</option>)}
                    </select>
                    <br />
                    <input style={{ margin: "5px", display: "inline-block" }} type="submit" value="Salvar" />
                    <input style={{ margin: "5px", display: "inline-block" }} type="button" value="Excluir" onClick={handleExcluir} />
                </form>
            </div>
            <div className="errorsContainer">
                {errors.nomeProduto?.message && (
                    <div>{errors.nomeProduto.message}</div>
                )}
                {errors.descricao?.message && (
                    <div>{errors.descricao.message}</div>
                )}
                
            </div>
        </>
    );
}