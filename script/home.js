document.addEventListener('DOMContentLoaded', () => {
    const valorInput = document.getElementById('valor');
    const bancoSelect = document.getElementById('banco');
    const parcelasSelect = document.getElementById('parcelas');
    const simulacaoForm = document.getElementById('simulacaoForm');

    const taxas = {
        'Caixa': 1.0487,
        'Santander': 1.0567,
        'Bradesco': 1.0532,
        'Itaú': 1.0519,
        'Nubank': 1.0595,
        'Inter': 1.0602
    };

    function formatarCampo() {
        let valor = valorInput.value;

        valor = valor.replace(/\D/g, '');

        if (valor.length > 2) {
            valor = valor.replace(/(\d{2})$/, ',$1');
        }

        if (valor.length > 6) {
            valor = valor.replace(/(\d)(?=(\d{3})+\,)/g, '$1.');
        }

        valorInput.value = valor;
    }

    valorInput.addEventListener('input', formatarCampo);

    simulacaoForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        let valor = valorInput.value.replace(/\./g, '').replace(',', '.'); 
        const banco = bancoSelect.value;
        const parcelas = parseInt(parcelasSelect.value);

        // Validação dos campos
        if (!valor || isNaN(parseFloat(valor)) || parseFloat(valor) <= 0) {
            alert('Por favor, digite um valor válido para o financiamento.');
            return;
        }
        if (!banco) {
            alert('Por favor, selecione um banco.');
            return;
        }
        if (isNaN(parcelas)) {
            alert('Por favor, selecione a quantidade de meses.');
            return;
        }

        valor = parseFloat(valor);

        const taxaJuros = taxas[banco]; 

        if (!taxaJuros) {
            alert('Erro: Taxa de juros não encontrada para o banco selecionado.');
            return;
        }


        const taxaMensal = taxaJuros - 1;



        let valorParcela = 0;
        let valorTotal = 0;

        if (taxaMensal === 0) { 
            valorParcela = valor / parcelas;
            valorTotal = valor;
        } else {
            const fator = Math.pow((1 + taxaMensal), parcelas);
            valorParcela = valor * (taxaMensal * fator) / (fator - 1);
            valorTotal = valorParcela * parcelas;
        }

        sessionStorage.setItem('valorParcela', valorParcela.toFixed(2));
        sessionStorage.setItem('valorTotal', valorTotal.toFixed(2));
        sessionStorage.setItem('prazoMeses', parcelas);

        window.location.href = 'finance.html';
    });
});