const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://thrilok:thrilok@cluster0.tl6st.mongodb.net/PersonalBudget?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useCreateIndex : true
});