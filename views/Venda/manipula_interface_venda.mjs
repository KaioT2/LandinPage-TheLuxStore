import { getLista, altera } from "./acessa_dados_venda.mjs";

async function desenhaTabela() {
    const tbody = document.getElementById('tbody1');
    tbody.innerHTML = '';
    const dados = await getLista();

    const dataInicio = document.getElementById("dataInicio").value;
    const dataFim = document.getElementById("dataFim").value;

    const dataInicioObj = dataInicio ? new Date(dataInicio) : null;
    const dataFimObj = dataFim ? new Date(dataFim) : null;

    const dadosFiltrados = dados.filter(item => {
        const dataItem = new Date(item.dataVenda);
        const dataItemDiaMesAno = new Date(dataItem.getFullYear(), dataItem.getMonth(), dataItem.getDate());
        let incluir = true;

        if (dataInicioObj) {
            const dataInicioDiaMesAno = new Date(dataInicioObj.getFullYear(), dataInicioObj.getMonth(), dataInicioObj.getDate());
            incluir = incluir && dataItemDiaMesAno >= dataInicioDiaMesAno;
        }
        if (dataFimObj) {
            const dataFimDiaMesAno = new Date(dataFimObj.getFullYear(), dataFimObj.getMonth(), dataFimObj.getDate());
            incluir = incluir && dataItemDiaMesAno <= dataFimDiaMesAno;
        }
        return incluir;
    });

    dadosFiltrados.sort((a, b) => new Date(b.dataVenda) - new Date(a.dataVenda));

    let totalConcluidas = 0;
    let totalCanceladas = 0;
    let totalReembolsadas = 0;

    for (let i = 0; i < dadosFiltrados.length; i++) {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
        const td5 = document.createElement('td');
        const btReembolso = document.createElement("button");

        btReembolso.innerText = 'Reembolsar';
        btReembolso.setAttribute('data-id', dados[i].id);
        btReembolso.setAttribute('class', "intra-button");
        btReembolso.addEventListener('click', async () => {
            const paymentIntentId = dadosFiltrados[i].paymentIntent;
            try {
                const obj = {
                    "id": dadosFiltrados[i].id,
                    "total": dadosFiltrados[i].total,
                    "dataVenda": dadosFiltrados[i].dataVenda,
                    "idCliente": dadosFiltrados[i].Cliente.id,
                    "paymentIntent": "reembolsada"
                };
                await altera(obj);

                const response = await fetch('/refund', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ paymentIntentId })
                });
                const result = await response.json();
                if (result.success) {
                    alert('Reembolso realizado com sucesso!');
                    desenhaTabela(); 
                } else {
                    alert('Erro ao realizar o reembolso: ' + result.message);
                }
            } catch (error) {
                console.error('Erro ao realizar o reembolso:', error);
                alert('Erro ao realizar o reembolso.');
            }
        });

        td1.innerText = dadosFiltrados[i].Cliente.nome;
        td2.innerText = "R$"+parseFloat(dadosFiltrados[i].total).toFixed(2);
        td3.innerText = new Date(dadosFiltrados[i].dataVenda).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        td4.innerText = dadosFiltrados[i].paymentIntent;

        if (!dadosFiltrados[i].paymentIntent.includes("cancelada") && !dadosFiltrados[i].paymentIntent.includes("reembolsada")) {
            td5.append(btReembolso);
        }

        if (dadosFiltrados[i].paymentIntent.includes("cancelada")) {
            td4.style.color = "red";
            totalCanceladas += parseFloat(dadosFiltrados[i].total);
        } else if (dadosFiltrados[i].paymentIntent === "reembolsada") {
            td4.style.color = "orange";
            totalReembolsadas += parseFloat(dadosFiltrados[i].total);
        } else {
            td4.style.color = "green";
            totalConcluidas += parseFloat(dadosFiltrados[i].total);
        }

        tr.append(td1, td2, td3, td4, td5);
        tbody.append(tr);
    }

    const concluidas = document.getElementById("concluidas");
    const canceladas = document.getElementById("canceladas");
    const reembolsadas = document.getElementById("reembolsadas");

    concluidas.innerText = "Total Concluídas: R$" + totalConcluidas.toFixed(2);
    canceladas.innerText = "Total Canceladas: R$" + totalCanceladas.toFixed(2);
    reembolsadas.innerText = "Total Reembolsadas: R$" + totalReembolsadas.toFixed(2);
}

let graficoAtual = null;

async function criaGrafico() {
    desenhaTabela();
    const dataInicio = document.getElementById("dataInicio").value;
    const dataFim = document.getElementById("dataFim").value;

    const dataInicioObj = dataInicio ? new Date(dataInicio) : null;
    const dataFimObj = dataFim ? new Date(dataFim) : null;

    const dados = await getLista();

    const dadosFiltrados = dados.filter(item => {
        const dataItem = new Date(item.dataVenda);
        const dataItemDiaMesAno = new Date(dataItem.getFullYear(), dataItem.getMonth(), dataItem.getDate());
        let incluir = true;

        if (dataInicioObj) {
            const dataInicioDiaMesAno = new Date(dataInicioObj.getFullYear(), dataInicioObj.getMonth(), dataInicioObj.getDate());
            incluir = incluir && dataItemDiaMesAno >= dataInicioDiaMesAno;
        }
        if (dataFimObj) {
            const dataFimDiaMesAno = new Date(dataFimObj.getFullYear(), dataFimObj.getMonth(), dataFimObj.getDate());
            incluir = incluir && dataItemDiaMesAno <= dataFimDiaMesAno;
        }
        return incluir;
    });

    dadosFiltrados.sort((a, b) => new Date(a.dataVenda) - new Date(b.dataVenda));

    const ctx = document.getElementById('grafico1').getContext('2d');

    if (graficoAtual) {
        graficoAtual.destroy();
    }

    const dadosPorDia = dadosFiltrados.reduce((acumulador, item) => {
        const dataVenda = new Date(item.dataVenda); 
        const data = new Date(dataVenda.getFullYear(), dataVenda.getMonth(), dataVenda.getDate()).toLocaleDateString();
        if (!acumulador[data]) {
            acumulador[data] = { vendasConcluidas: 0, vendasCanceladasReembolsadas: 0 };
        }
        if (item.paymentIntent === "reembolsada" || item.paymentIntent === "cancelada") {
            acumulador[data].vendasCanceladasReembolsadas += parseFloat(item.total);
        } else {
            acumulador[data].vendasConcluidas += parseFloat(item.total);
        }
        return acumulador;
    }, {});

    const labels = Object.keys(dadosPorDia).sort((a, b) => new Date(a) - new Date(b));
    const vendasConcluidasData = labels.map(label => dadosPorDia[label].vendasConcluidas);
    const vendasCanceladasReembolsadasData = labels.map(label => dadosPorDia[label].vendasCanceladasReembolsadas);

    graficoAtual = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Vendas Concluídas",
                    data: vendasConcluidasData,
                    borderColor: "rgb(2, 86, 150)",
                    backgroundColor: "rgba(2, 86, 150, 0.35)",
                    tension: 0.2,
                    fill: true
                },
                {
                    label: "Vendas Canceladas/Reembolsadas",
                    data: vendasCanceladasReembolsadasData,
                    borderColor: "rgb(54, 165, 244)",
                    backgroundColor: "rgba(54, 165, 244, 0.35)",
                    tension: 0.2,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Data'
                    }
                },
                y: {
                    suggestedMin: null,
                    suggestedMax: null,
                    title: {
                        display: true,
                        text: 'Valores'
                    }
                }
            }
        }
    });
}

const limparFiltros = () => {
    const dataInicio = document.getElementById("dataInicio");
    const dataFim = document.getElementById("dataFim");
    if (dataInicio) dataInicio.value = "";
    if (dataFim) dataFim.value = "";

    desenhaTabela();
    criaGrafico();
};

const btnLimparFiltros = document.getElementById('btnLimparFiltros');
if (btnLimparFiltros) {
    btnLimparFiltros.addEventListener('click', limparFiltros);
}

const btnFiltro = document.getElementById('btnFiltro');
if (btnFiltro) {
    btnFiltro.addEventListener('click', criaGrafico);
}

window.addEventListener('load', criaGrafico);