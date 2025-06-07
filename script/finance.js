document.addEventListener('DOMContentLoaded', () => {
    const valorParcelaElement = document.getElementById('valorParcela');
    const valorTotalElement = document.getElementById('valorTotal');
    const prazoMesesElement = document.getElementById('prazoMeses');
    const btnVoltar = document.getElementById('btnVoltar');

    const valorParcela = sessionStorage.getItem('valorParcela');
    const valorTotal = sessionStorage.getItem('valorTotal');
    const prazoMeses = sessionStorage.getItem('prazoMeses');

    if (valorParcela && valorTotal && prazoMeses) {
       valorParcelaElement.innerHTML = `R$&nbsp;${parseFloat(valorParcela).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    valorTotalElement.innerHTML = `R$&nbsp;${parseFloat(valorTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        prazoMesesElement.textContent = prazoMeses;
    } else {
        valorParcelaElement.textContent = 'R$ 0,00';
        valorTotalElement.textContent = 'R$ 0,00';
        prazoMesesElement.textContent = '0';
        alert('Não há dados de simulação. Por favor, volte ao simulador.');
    }

    btnVoltar.addEventListener('click', () => {
        window.location.href = '../index.html';
    });
});