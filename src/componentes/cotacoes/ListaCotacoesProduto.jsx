import DataTable from 'react-data-table-component';
import '../../App.css'
import { useEffect } from 'react';
import { listarProdutos } from '../../infra/produtos';
import { useState } from 'react';
import { listarCotacoes } from '../../infra/cotacoes';

export default function ListaCotacoesProduto({ cotacoes = [], produtos = [] , setCotacoes, setMenuCotacoes}) {

  const [cotacoesProduto, setCotacoesProduto] = useState([]);
  const [nomesProdutos, setNomesProdutos] = useState([]);

  async function fetchData() {
    const novaListaCotacoes = await listarCotacoes();
    setCotacoes(novaListaCotacoes);
  }



  useEffect(() => {
    fetchData();
    let lista = cotacoes.map(item => item.produto);
    
    let i = 0;
    let listaFiltrada = lista.filter(item => {
      
      if(lista.indexOf(item,1+i) != -1) {
        i++;
        return false;
      }
      i++;
      return true;
  });
    setNomesProdutos(listaFiltrada);
  }, [])

  function handleChange(event) {
    let nome = event.target.value;
    let lista = cotacoes.filter(item => item.produto === nome);
    setCotacoesProduto(lista);
  }

    const colunas = [
        {
            name: 'Produto',
            selector: row => row.produto,
            sortable: true,
        },
        {
            name: 'Fornecedor',
            selector: row => row.fornecedor,
        },
        {
            name: 'Data da cotação',
            selector: row => row.data,
        },
        {
          name: 'Valor',
          selector: row => row.valor,
        }
    ];

    const opcoes = { rowsPerPageText: 'Linhas por página:', rangeSeparatorText: 'de' };


  
    return (
      <div>
        <p onClick={() => setMenuCotacoes(0)}>Voltar</p>
        <h1>Consultar Cotações por Produto</h1>
        <select onChange={handleChange}>
          <option value={-1}>Selecione um produto</option>
          {nomesProdutos.map(item => 
            <option value={item}>{item}</option>
          )}
        </select>
        <DataTable
            
            columns={colunas}
            data={cotacoesProduto}
            pagination
            paginationPerPage={5}
            dense
            responsive
            striped
            paginationComponentOptions={opcoes}
            noDataComponent="Cadastro Vazio"
            defaultSortFieldId={1}
            selectableRows
            selectableRowsHighlight
            selectableRowsSingle
            
        />
      </div>
    );
}