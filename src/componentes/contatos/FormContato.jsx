import { useForm } from "react-hook-form"
import { regexEmail, regexNumerico } from "../../Regex";
import { excluirContato, inserirContato, listarContatos, obterContato, alterarContato } from '../../infra/contatos'
import { useEffect } from "react";
import { alterarFornecedor, listarFornecedores } from "../../infra/fornecedores";

export default function FormContato({ idEmEdicao, setIdEmEdicao , fornecedores, setFornecedores, controle, setControle}) {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue } = useForm();

    useEffect(() => {
        async function fetchData() {
            if (idEmEdicao && !isSubmitted) {
                const contato = await obterContato(idEmEdicao);
                setValue("nome", contato.nome);
                setValue("email", contato.email);
                setValue("fone", contato.fone);
                setValue("fornecedor", contato.fornecedor);
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

    useEffect(() => {
      fetchData2();
    }, [])


    async function submeterDados(dados) {
        let op = document.querySelector("select").value;
        if(idEmEdicao) {
          await alterarContato({...dados, id: idEmEdicao});
          setIdEmEdicao("");
          
        }
        else {
          let id = await inserirContato(dados);
          setIdEmEdicao(id);
          
        }
          
        reset();
      
        
    }

    async function handleExcluir() {
        await excluirContato(idEmEdicao);
        setIdEmEdicao("");
        setControle(!controle);
    }

    return (
      <>
          <div className="containerContato">
              <form onSubmit={handleSubmit(submeterDados)}>
                <div className="containerGrid">
                  <div>
                    <label className="formLabel" htmlFor="nome">Nome</label>&nbsp;
                    <input size={50} {...register("nome", {
                        required: "Nome é obrigatório",
                        validate: {
                            minLength: (value) => value.length >= 5 || "Nome tem que ter pelo menos 5 caracteres",
                            maxLength: (value) => value.length <= 50 || "Nome só pode ter até 50 caracteres",
                        },
                    })} />
                  </div>
                  <div>
                    <label className="formLabel" htmlFor="email">Email</label>&nbsp;
                    <input size={30} {...register("email", {
                      required: "Email é obrigatório",
                      validate: {
                          minLength: (value) => value.length >= 5 || "Email tem que ter pelo menos 5 caracteres",
                          maxLength: (value) => value.length <= 30 || "Email só pode ter até 30 caracteres",
                          matchPattern: (value) => regexEmail.test(value) || "Email inválido",
                      },
                    })} />
                  </div>
                  <div>
                    <label className="formLabel" htmlFor="fone">Telefone</label>&nbsp;
                    <input size={14} {...register("fone", {
                        required: "Telefone é obrigatório",
                        validate: {
                            minLength: (value) => value.length >= 8 || "Telefone tem que ter pelo menos 8 dígitos",
                            matchPattern: (value) => regexNumerico.test(value) || "Telefone tem que ser numérico",
                        },
                    })} />
                  </div>
                  
                  <select {...register("fornecedor", {validate: value => value != '-1' || "Selecione um fornecedor"})}>
                    <option value={-1}>Selecione um fornecedor</option>
                    {fornecedores.map(item => <option value={item.nomeFantasia}>{item.nomeFantasia}</option>)}
                  </select>
                </div>
                  <div className="botoes">
                    <input style={{ margin: "5px", display: "inline-block" }} type="submit" value="Salvar" />
                    <input style={{ margin: "5px", display: "inline-block" }} type="button" value="Excluir" onClick={handleExcluir} />
                  </div>
              </form>
          </div>
          <div className="errorsContainer">
              {errors.nome?.message && (
                  <div>{errors.nome.message}</div>
              )}
              {errors.email?.message && (
                  <div>{errors.email.message}</div>
              )}
              {errors.fone?.message && (
                  <div>{errors.fone.message}</div>
              )}
              {errors.fornecedor?.message && (
                  <div>{errors.fornecedor.message}</div>
              )}
          </div>
      </>
  );
}