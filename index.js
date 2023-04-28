import express from "express";
import PizzaService from './src/services/pizzas-services.js';
import Pizza from './src/models/pizza.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json()); // Para poder parsear el body como req.body
app.use(cors());

app.get('/pizza', async (req, res) => {
    const pizza = await PizzaService.getAll();
    res.status(200).send(pizza)
})

app.get('/pizza/:id', async (req, res) => {
    const pizza = await PizzaService.getById(req.params.id);
    res.status(200).send(pizza)
})

app.post('/pizza', (req,res) => {
    console.log("en post, req:", req);
    try{
        await PizzaService.insert(req.body)
        res.status(200).json({ message: 'Pizza creada'});
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Fallo el insert'});
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})