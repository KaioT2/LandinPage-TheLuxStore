import express from 'express';
import rotas_produtos from './rotas/rotas_produtos.mjs';

const app = express();

app.use(express.json());

app.use('/produtos', rotas_produtos);

app.use(express.static('views'));

app.listen(80, 'localhost', function(){
    console.log('Na escuta');
});
