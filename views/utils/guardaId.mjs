let idCliente;

function recebeId(id){
    idCliente = id;
}

function pegaId(){
    return idCliente;
}

export {recebeId, pegaId};