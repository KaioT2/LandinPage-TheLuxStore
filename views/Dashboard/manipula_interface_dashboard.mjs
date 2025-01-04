import { getListaFuncionario } from "../Funcionario/acessa_dados_funcionario.mjs";
import { getLista } from "../Venda/acessa_dados_venda.mjs";

const centerTextPlugin = {
    id: 'centerText',
    beforeDraw(chart) {
        const { width } = chart;
        const { height } = chart;
        const { ctx } = chart;
        const value = chart.data.datasets[0].data[0];

        ctx.restore();
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#333';

        const text = `${value}%`;
        const x = width / 2;
        const y = height / 2;
        ctx.fillText(text, x, y);
        ctx.save();
    },
};

Chart.register(centerTextPlugin);

function createChart(canvasId, value, color) {
    const ctx = document.getElementById(canvasId).getContext('2d');

    return new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Progresso', 'Faltante'],
            datasets: [{
                label: 'Progresso',
                data: [value, 100 - value],
                backgroundColor: [color, '#f0f0f0'],
                borderWidth: 0,
            }]
        },
        options: {
            responsive: true,
            cutout: '70%',
            plugins: {
                tooltip: { enabled: false },
                legend: { display: false },
            },
        },
    });
}

async function calculaFolhaPag() {
    let folhaPag = 0;
    const dados = await getListaFuncionario();
    dados.forEach(item => {
        folhaPag += parseFloat(item.salario);
    });

    return folhaPag;
}

async function calculoLucro() {
    const dados = await getLista();

    let folhaPag = await calculaFolhaPag();
    let lucroBruto = 0;
    let despesasTotais = 0;

    dados.forEach(item => {
        lucroBruto += parseFloat(item.total);
    });

    const custoMt = (Math.random() * (0.10 - 0.05) + 0.05) * lucroBruto;
    const custoMte = (Math.random() * (0.20 - 0.1) + 0.1) * lucroBruto;

    despesasTotais = custoMt + custoMte + folhaPag;

    const lucroLiquido = lucroBruto - despesasTotais;

    const indiceBruto = document.getElementById("indiceBruto");
    const indiceLiquido = document.getElementById("indiceLiquido");
    const indiceDespesa = document.getElementById("indiceDespesa");

    indiceBruto.innerText = "R$ " + lucroBruto.toFixed(2);
    indiceLiquido.innerText = "R$ " + lucroLiquido.toFixed(2);
    indiceDespesa.innerText = "R$ " + despesasTotais.toFixed(2);

    const containerDespesa = document.querySelector(".despesa");

    containerDespesa.addEventListener('mouseenter', () => {
        const card = document.getElementById('cardDespesa');
        document.getElementById('custoMt').innerText = "Custo Manutenção: R$ " + custoMt.toFixed(2);
        document.getElementById('custoMte').innerText = "Custo Matéria Prima: R$ " + custoMte.toFixed(2);
        document.getElementById('folhaPag').innerText = "Folha de Pagamento: R$ " + folhaPag.toFixed(2);
        card.classList.remove('oculto');
        card.classList.add('visivel');
    });

    containerDespesa.addEventListener('mouseleave', () => {
        const card = document.getElementById('cardDespesa');
        card.classList.remove('visivel');
        card.classList.add('oculto');
    });

    return { lucroBruto, lucroLiquido, despesasTotais };
}

async function initDashboard() {
    const { lucroBruto, lucroLiquido, despesasTotais } = await calculoLucro();

    const backendData = [
        { canvasId: 'doughnutChart1', value: 100, color: '#ff592f' },
        {
            canvasId: 'doughnutChart2',
            value: Math.min(100, Math.max(0, parseFloat(((lucroLiquido / lucroBruto) * 100).toFixed(1)))),
            color: '#4caf50'
        },
        {
            canvasId: 'doughnutChart3',
            value: Math.min(100, Math.max(0, parseFloat(((despesasTotais / lucroBruto) * 100).toFixed(1)))),
            color: '#2196f3'
        },
    ];

    backendData.forEach(({ canvasId, value, color }) => {
        createChart(canvasId, value, color);
    });
}

window.addEventListener('load', initDashboard);

export { calculaFolhaPag };