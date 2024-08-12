import { useForm } from "react-hook-form"
import { regexEmail, regexNumerico } from "../../Regex";
import { alterarFornecedor, excluirFornecedor, inserirFornecedor, listarFornecedores, obterFornecedor  } from "../../infra/fornecedores";
import { useEffect } from "react";
import '../../App.css'

export default function FormFornecedores({ idEmEdicao, setIdEmEdicao ,setControle , controle}) {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue } = useForm();

    useEffect(() => {
        async function fetchData() {
            if (idEmEdicao && !isSubmitted) {
                const fornecedor = await obterFornecedor(idEmEdicao);
                setValue("nomeFantasia", fornecedor.nomeFantasia);
                setValue("razaoSocial", fornecedor.razaoSocial);
                setValue("cnpj", fornecedor.cnpj);
            } else {
                reset();
            }
        }

        fetchData();
    }, [idEmEdicao]);

    async function submeterDados(dados) {
        
        if(idEmEdicao) {
          await alterarFornecedor({...dados, id: idEmEdicao});
          setIdEmEdicao("");
          setControle(!controle);
          reset();
        }
        else {
          let id = await inserirFornecedor(dados);
          setIdEmEdicao(id);
          setControle(!controle);
          reset();
        }
    }

    async function handleExcluir() {
         await excluirFornecedor(idEmEdicao);
         setIdEmEdicao("");
         setControle(!controle);
        
        
    }

    return (
        <>
            <div className="containerFornecedores">
                <form onSubmit={handleSubmit(submeterDados)}>
                    <label className="formLabel" htmlFor="nomeFantasia">Nome de Fantasia</label>&nbsp;
                    <input size={50} {...register("nomeFantasia", {
                        required: "Nome de fantasia é obrigatório",
                        validate: {
                            minLength: (value) => value.length >= 5 || "Nome tem que ter pelo menos 5 caracteres",
                            maxLength: (value) => value.length <= 50 || "Nome só pode ter até 50 caracteres",
                        },
                    })} />
                    <br />
                    <label className="formLabel" htmlFor="razaoSocial">Razão Social</label>&nbsp;
                    <input size={30} {...register("razaoSocial", {
                        required: "Razão Social é obrigatória",
                        validate: {
                            minLength: (value) => value.length >= 5 || "Razão Social tem que ter pelo menos 5 caracteres",
                            maxLength: (value) => value.length <= 30 || "Razão Social só pode ter até 30 caracteres",
                            
                        },
                    })} />
                    <br />
                    <label className="formLabel" htmlFor="cnpj">CNPJ</label>&nbsp;
                    <input size={14} {...register("cnpj", {
                        required: "CNPJ é obrigatório",
                        validate: {
                            checkLength : (value) => value.length == 14 || "CNPJ deve ter 14 dígitos",
                            matchPattern: (value) => regexNumerico.test(value) || "CNPJ tem que ser numérico"
                        
                        }  
                   
                    })} />
                    <br />
                    <input style={{ margin: "5px", display: "inline-block" }} type="submit" value="Salvar" />
                    <input style={{ margin: "5px", display: "inline-block" }} type="button" value="Excluir" onClick={handleExcluir} />
                </form>
            </div>
            <div className="errorsContainer">
                {errors.nomeFantasia?.message && (
                    <div>{errors.nomeFantasia.message}</div>
                )}
                {errors.razaoSocial?.message && (
                    <div>{errors.razaoSocial.message}</div>
                )}
                {errors.cnpj?.message && (
                    <div>{errors.cnpj.message}</div>
                )}
            </div>
        </>
    );
}