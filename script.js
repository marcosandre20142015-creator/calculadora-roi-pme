// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('roiForm');
    const divResultado = document.getElementById('resultado');

    form.addEventListener('submit', function(event) {
        // Evita que a página recarregue ao enviar o formulário
        event.preventDefault();

        // 1. Captura os valores inseridos nos inputs e converte para números
        const faturamentoAtual = parseFloat(document.getElementById('faturamento').value);
        const ticketMedio = parseFloat(document.getElementById('ticket').value);
        const visitantesMensais = parseFloat(document.getElementById('visitantes').value);

        // 2. Validação simples para garantir que os valores são válidos
        if (ticketMedio <= 0 || visitantesMensais <= 0) {
            alert('Por favor, insira valores maiores que zero.');
            return;
        }

        // 3. Executa a Lógica de Negócio / Cálculo
        const clientesAtuais = faturamentoAtual / ticketMedio;
        
        // Taxa de conversão estimada com uma Landing Page otimizada (3.5%)
        const novaTaxaConversao = 0.035; 
        const novosClientes = visitantesMensais * novaTaxaConversao;
        
        const novoFaturamentoMensal = novosClientes * ticketMedio;
        const faturamentoExtraMensal = novoFaturamentoMensal - faturamentoAtual;
        const faturamentoExtraAnual = faturamentoExtraMensal * 12;

        // 4. Exibe os resultados na tela
        document.getElementById('resClientesAtuais').textContent = Math.round(clientesAtuais);
        document.getElementById('resNovosClientes').textContent = Math.round(novosClientes);
        
        // Formata os valores para o padrão de moeda Brasileira (R$)
        document.getElementById('resExtraMensal').textContent = formatarMoeda(faturamentoExtraMensal);
        document.getElementById('resExtraAnual').textContent = formatarMoeda(faturamentoExtraAnual);

        // Remove a classe 'hidden' para o card de resultado aparecer com animação/estilo
        divResultado.classList.remove('hidden');
    });
});

// Função auxiliar para formatar números em Real brasileiro
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}
// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('roiForm');
    const divResultado = document.getElementById('resultado');
    const btnCopiar = document.getElementById('btnCopiar');

    // Variáveis globais para armazenar os últimos valores calculados e usar no botão de copiar
    let ultimosDados = {};

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // 1. Captura os valores inseridos nos inputs e converte para números
        const faturamentoAtual = parseFloat(document.getElementById('faturamento').value);
        const ticketMedio = parseFloat(document.getElementById('ticket').value);
        const visitantesMensais = parseFloat(document.getElementById('visitantes').value);

        // 2. Validação simples para garantir que os valores são válidos
        if (ticketMedio <= 0 || visitantesMensais <= 0) {
            alert('Por favor, insira valores maiores que zero.');
            return;
        }

        // 3. Executa a Lógica de Negócio / Cálculo
        const clientesAtuais = faturamentoAtual / ticketMedio;
        const novaTaxaConversao = 0.035; 
        const novosClientes = visitantesMensais * novaTaxaConversao;
        
        const novoFaturamentoMensal = novosClientes * ticketMedio;
        const faturamentoExtraMensal = novoFaturamentoMensal - faturamentoAtual;
        const faturamentoExtraAnual = faturamentoExtraMensal * 12;

        // Formata os valores para o padrão de moeda Brasileira (R$)
        const extraMensalFormatado = formatarMoeda(faturamentoExtraMensal);
        const extraAnualFormatado = formatarMoeda(faturamentoExtraAnual);

        // Salva os dados para o botão de copiar
        ultimosDados = {
            extraMensal: extraMensalFormatado,
            extraAnual: extraAnualFormatado,
            novosClientes: Math.round(novosClientes)
        };

        // 4. Exibe os resultados na tela
        document.getElementById('resClientesAtuais').textContent = Math.round(clientesAtuais);
        document.getElementById('resNovosClientes').textContent = ultimosDados.novosClientes;
        document.getElementById('resExtraMensal').textContent = extraMensalFormatado;
        document.getElementById('resExtraAnual').textContent = extraAnualFormatado;

        // Remove a classe 'hidden' para o card de resultado aparecer
        divResultado.classList.remove('hidden');
    });

    // Evento do Botão de Copiar Resumo
    btnCopiar.addEventListener('click', () => {
        if (!ultimosDados.extraMensal) return;

        const textoParaCopiar = `📊 *Projeção de Crescimento Comercial*\n\n` +
            `• Novos Clientes Potenciais/mês: ~${ultimosDados.novosClientes}\n` +
            `• Faturamento Extra Mensal: ${ultimosDados.extraMensal}\n` +
            `• Faturamento Extra Anual: ${ultimosDados.extraAnual}\n\n` +
            `Gerado via Calculadora de ROI de Alta Conversão.`;

        navigator.clipboard.writeText(textoParaCopiar).then(() => {
            const textoOriginal = btnCopiar.textContent;
            btnCopiar.textContent = 'Copiado com sucesso! ✅';
            btnCopiar.style.backgroundColor = 'var(--accent)';
            btnCopiar.style.color = 'var(--bg-color)';

            setTimeout(() => {
                btnCopiar.textContent = textoOriginal;
                btnCopiar.style.backgroundColor = 'transparent';
                btnCopiar.style.color = 'var(--accent)';
            }, 2000);
        }).catch(err => {
            console.error('Erro ao copiar texto: ', err);
            alert('Não foi possível copiar o texto.');
        });
    });
});

// Função auxiliar para formatar números em Real brasileiro
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}