const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const budgetModel = require('./models/budgetModel');
const router = express.Router();
const UserSchema = require('./models/userModel');
const users=require('./routes/users');
const auth=require('./routes/auth');
const bcrypt = require('bcrypt');
const budget = require('./routes/budget');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var url = 'mongodb+srv://thrilok:thrilok@cluster0.tl6st.mongodb.net/PersonalBudget?retryWrites=true&w=majority';
app.use('',express.static('public'));
app.use(express.json());
app.use('/users', users);    
app.use('/auth', auth); 
app.use('/budget',budget);
 
//module.exports = router;
app.use(express.json());

mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));


app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers','Content-type,Authorization');
    next();
})


app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});


