const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const numeros = Array.from({ length: 700 }, (_, i) => ({
    numero: i + 1,
    nombre: null,
    contacto: null,
    ocupado: false,
}));

// Endpoint para obtener los números disponibles
app.get('/numeros', (req, res) => {
    const disponibles = numeros.map(n => ({
        numero: n.numero,
        ocupado: n.ocupado
    }));
    res.json(disponibles);
});

// Endpoint para registrar un participante
app.post('/participar', (req, res) => {
    const { numero, nombre, contacto } = req.body;
    const num = numeros.find(n => n.numero === numero);
    if (!num || num.ocupado) {
        return res.status(400).json({ message: 'Número no disponible' });
    }
    num.nombre = nombre;
    num.contacto = contacto;
    num.ocupado = true;
    res.json({ message: 'Participación registrada' });
});

// Endpoint para el sorteo
app.post('/sorteo', (req, res) => {
    const ocupados = numeros.filter(n => n.ocupado);
    if (ocupados.length === 0) {
        return res.status(400).json({ message: 'No hay participantes' });
    }
    const ganador = ocupados[Math.floor(Math.random() * ocupados.length)];
    res.json({ ganador });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
