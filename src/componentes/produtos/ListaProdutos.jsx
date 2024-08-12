import DataTable from 'react-data-table-component';
import '../../App.css'

export default function ListaProdutos({ produtos = [], setIdEmEdicao }) {
  
    const colunas = [
        {
            name: 'Nome do produto',
            selector: row => row.nomeProduto,
            sortable: true,
        },
        {
            name: 'Descricao',
            selector: row => row.descricao,
        },
        {
            name: 'Fornecedores',
            selector: row => row.fornecedores +" ",
        }
        
    ];

    const opcoes = { rowsPerPageText: 'Linhas por página:', rangeSeparatorText: 'de' };

    function handleChange({ selectedRows }) {
        const id = selectedRows[0]?.id;
        console.log(id);
        if(id) {
            setIdEmEdicao(id);
        } else {
            setIdEmEdicao("");
        }
    }

  
    return (
        <DataTable
            
            columns={colunas}
            data={produtos}
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
            onSelectedRowsChange={handleChange}
        />
    );
}