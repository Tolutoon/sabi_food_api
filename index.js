import express from 'express';
import mongoose from 'mongoose';
import Restaurant from './models/restaurant_model.js';
import Recipe from './models/recipie_model.js'
import Pharmacy from './models/pharmacy_model.js';

const app = express();
const PORT = 4008;

app.use(express.json());

mongoose.connect('mongodb+srv://getolopadetolu:UeHo5pdSnYlGJIaw@sabifood.fdqz03j.mongodb.net/NODE-API?retryWrites=true&w=majority&appName=SabiFood')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// POST endpoint to create a new restaurant with recipes
app.post('/api/restaurants', async (req, res) => {
    try {
        const { name, address, imgUrl, recipes } = req.body;

        // Create the restaurant
        const restaurant = new Restaurant({
            name,
            address,
            imgUrl
        });

        // Save the restaurant to get its _id
        await restaurant.save();

        // Create recipes and link to the restaurant
        const recipeIds = await Promise.all(recipes.map(async (recipeData) => {
            const recipe = new Recipe(recipeData);
            await recipe.save();
            return recipe._id;
        }));

        // Update restaurant with recipe IDs
        restaurant.recipes = recipeIds;
        await restaurant.save();

        res.status(201).json(restaurant);
    } catch (error) {
        console.error('Error creating restaurant:', error);
        res.status(500).json({ error: 'Failed to create restaurant' });
    }
});

// POST endpoint to create a new pharmacy
app.post('/api/pharmacy', async (req, res)=> {
    try {
        const pharmacy = await Pharmacy.create(req.body);
        res.status(200).json(pharmacy);
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
});

//Get endpoint to fetch the all pharmacies
app.get('/api/pharmacy', async(req, res) => {
    try {
        const pharmacy = await await Pharmacy.find({});
        res.status(203).json(pharmacy);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


// GET endpoint to fetch all restaurants with populated recipes
app.get('/api/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({}).populate('recipes');
        res.status(200).json(restaurants);
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        res.status(500).json({ error: 'Failed to fetch restaurants' });
    }
});

// GET endpoint to fetch a restaurant by ID with populated recipes
app.get('/api/restaurants/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findById(id).populate('recipes');
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.status(200).json(restaurant);
    } catch (error) {
        console.error('Error fetching restaurant:', error);
        res.status(500).json({ error: 'Failed to fetch restaurant' });
    }
});

// PUT endpoint to update a restaurant with recipes
app.put('/api/restaurants/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, imgUrl, recipes } = req.body;

        // Update the restaurant details
        const restaurant = await Restaurant.findByIdAndUpdate(
            id,
            { name, address, imgUrl },
            { new: true }
        );

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        // Update recipes associated with the restaurant
        if (recipes && recipes.length > 0) {
            const recipeIds = await Promise.all(recipes.map(async (recipeData) => {
                if (recipeData._id) {
                    // Update existing recipe
                    await Recipe.findByIdAndUpdate(recipeData._id, recipeData);
                    return recipeData._id;
                } else {
                    // Create new recipe
                    const newRecipe = new Recipe(recipeData);
                    await newRecipe.save();
                    return newRecipe._id;
                }
            }));
            restaurant.recipes = recipeIds;
        } else {
            restaurant.recipes = [];
        }

        await restaurant.save();

        const updatedRestaurant = await Restaurant.findById(id).populate('recipes');
        res.status(200).json(updatedRestaurant);

    } catch (error) {
        console.error('Error updating restaurant:', error);
        res.status(500).json({ message: 'Failed to update restaurant' });
    }
});

app.get('/', (req, res) => {
    res.send('Hi, Welcome to Sabi Food API DOC');
});

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});
