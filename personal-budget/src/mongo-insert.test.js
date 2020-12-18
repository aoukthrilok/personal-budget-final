const mongoose = require('mongoose');
const budgetModel = require('../models/budgetModel');
const UserModel = require('../models/userModel');
const userData = { email: 'TekLoon', password:'password',displayName:'njkrdg' };
let user_id='';
describe('User Model Test', () => {

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create & save user successfully', async () => {
        const validUser = new UserModel(userData);
        const savedUser = await validUser.save();
        user_id=savedUser._id;
        expect(savedUser._id).toBeDefined();
        expect(savedUser.email).toBe(userData.email);
    });

    it('save budget successfully', async () => {
        budgetData={budgetName:'College',month:'06',year:'2018',budget:'2500',userId:user_id};
        const budget=new budgetModel(budgetData);
        const savedBudget = await budget.save();
        expect(savedBudget._id).toBeDefined();
        expect(savedBudget.budgetName).toBe(budgetData.budgetName);
        
    });

})