import express from 'express';
import mongoose from 'mongoose';
import Restaurant from './models/restaurant_model.js'

const app = express();

app.use(express.json());

const PORT = 4008;

mongoose.connect('mongodb+srv://getolopadetolu:UeHo5pdSnYlGJIaw@sabifood.fdqz03j.mongodb.net/NODE-API?retryWrites=true&w=majority&appName=SabiFood').then(() => console.log('Connected'));

app.get('/', (req, res)=> {

    res.send('Hi Tolutoon');
    console.log(`App is running on ${PORT}`);
});


app.post('/api/restaurants', async (req, res) => {
    try {
       const restaurant = await Restaurant.create(req.body);
       res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.listen(PORT);