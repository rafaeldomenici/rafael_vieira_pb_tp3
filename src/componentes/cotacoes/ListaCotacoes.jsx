import DataTable from 'react-data-table-component';
import '../../App.css'

export default function ListaCotacoes({ cotacoes = [], setIdEmEdicao }) {
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
            data={cotacoes}
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