async function consultarCEP(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) throw new Error("CEP não encontrado.");
        const dados = await response.json();

        if (dados.erro) throw new Error("CEP inválido.");
        return dados; 
    } catch (error) {
        console.error("Erro ao consultar CEP:", error);
        alert("CEP inválido ou não encontrado.");
    }
}

function calcularFrete(cep) {
    const taxaFixa = 10;
    const distancia = parseInt(cep.substring(0, 2)) * 0.5; 
    const valorFrete = taxaFixa + distancia;
    return valorFrete.toFixed(2);
}

function exibirFrete(endereco, frete) {
    const resultadoFrete = document.querySelector(".resultado-frete");
    resultadoFrete.innerHTML = `
        <p><strong>Endereço:</strong> ${endereco.localidade} - ${endereco.uf}</p>
        <p class="valorFrete"><strong>Frete:</strong> R$ ${frete}</p>
    `;
}

export {consultarCEP, calcularFrete, exibirFrete};