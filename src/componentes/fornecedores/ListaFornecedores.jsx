import DataTable from 'react-data-table-component';

export default function ListaFornecedores({ fornecedores = [], setIdEmEdicao }) {
    const colunas = [
        {
            name: 'Nome de Fantasia',
            selector: row => row.nomeFantasia,
            sortable: true,
        },
        {
            name: 'Razão Social',
            selector: row => row.razaoSocial,
        },
        {
            name: 'CNPJ',
            selector: row => row.cnpj,
        },
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
            data={fornecedores}
            pagination
            paginationPerPage={5}
            dense
            responsive
            striped
            paginationComponentOptions={opcoes}
            noDataComponent="Cadastro Vazio"
            
            selectableRows
            selectableRowsHighlight
            selectableRowsSingle
            onSelectedRowsChange={handleChange}
        />
    );
}