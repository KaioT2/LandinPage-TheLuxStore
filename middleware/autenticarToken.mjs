import jwt from 'jsonwebtoken';

function autenticarToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; 
    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    try {
        const payload = jwt.verify(token, SECRET_KEY);
        req.idCliente = payload.idCliente;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido' });
    }
}

export default autenticarToken;
