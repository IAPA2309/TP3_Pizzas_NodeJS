import express from "express";
import PizzaService from './src/services/pizzas-services.js';
import Pizza from './src/models/pizza.js';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json()); // Para poder parsear el body como req.body
app.use(
  express.static(path.join(__dirname, "public"), { type: "text/javascript" })
);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/pizza', async (req, res) => {
    const pizza = await PizzaService.getAll();
    res.status(200).send(pizza)
})

app.get('/pizza/:id', async (req, res) => {
    const pizza = await PizzaService.getById(req.params.id);
    res.status(200).send(pizza)
})


app.post('/pizza', async (req,res) => {
    console.log("en post, req:", req);
    try{
        // Paso el json a un objeto Pizza
        const pizza = new Pizza()
        pizza.nombre = req.body.nombre;
        pizza.libreGluten = req.body.libreGluten;
        pizza.importe = req.body.importe;
        pizza.descripcion = req.body.descripcion;
        await PizzaService.insert(pizza)
        res.status(200).json({ message: 'Pizza creada'});
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Fallo el insert'});
    }
})

app.put('/pizza/:id', async (req, res) => {
    console.log('En put, req:', req);
    try{
        const pizza = new Pizza();
        pizza.id = req.body.id;
        pizza.nombre = req.body.nombre;
        pizza.libreGluten = req.body.libreGluten;
        pizza.importe = req.body.importe;
        pizza.descripcion = req.body.descripcion;
        await PizzaService.update(pizza)
        res.status(200).json({ message: 'Pizza actualizada' });
    }catch(error){
        console.log(error);
        res.status(200).json({ message: 'Fallo el update' });
    }
})

app.delete('/pizza/:id', async (req, res) => {
    console.log('En delete, req:', req);
    try{
        await PizzaService.deleteById(req.params.id)
        res.status(200).json({ message: 'Pizza borrada' });
    }catch(error){
        console.log(error);
        res.status(200).json({ message: 'Fallo el delete' });
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})