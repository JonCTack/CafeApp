const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cors = require('cors')

const bcrypt = require('bcrypt')
const passport = require('passport')
const session = require('express-session')
const initPassport = require('./config/passport-config')

const User = require('./models/user')
const Category = require('./models/category')
const Item = require('./models/item')
const Order =require('./models/order')

require('dotenv').config()
require('./config/database')


const app = express();
const port = 5000;

app.use(cors({
    origin: "*"
}));
app.use(logger('dev'))
app.use(express.json());

initPassport(
    passport,
    async email => {
        let user = User.findOne({email: email});
        return user;
    },
    async id => {
        let user = User.findById(id);
        return user;
    }
);
app.use(session({
    
    secure: true,
    secret: process.env.SESSEC,
    resave: true,
    saveUninitialized: true,
    cookie: { originalMaxAge: 3600000 }
}))
app.use(express.static(path.join(__dirname, 'build')));

//routes

app.get('/get_categories', async (req, res) => {
    let arrayOfCategories = await Category.find()
    res.json(arrayOfCategories)
});
app.get('/get_items', async (req, res) => {
    let arrayOfItems = await Item.find().populate('category')
    res.json(arrayOfItems)
});

app.get('/session-info', (req,res) => {
    res.json({
        session: req.session
    })
})

app.get('/get_cart', async (req,res) => {
    let cart = await Order.getCart(req.session.passport.user._doc._id)
    console.log(cart)
    res.json(cart)
})

app.post('/users/signup', async (req, res) => {

    let hashPass = await bcrypt.hash(req.body.password, 10)

    let userFromCollect = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: hashPass
    })
    console.log(userFromCollect)
    res.json('singed up')
});

app.put('/add_to_cart/:itemID/:newQty', async (req,res) => {
    let { itemID, newQty } = req.params;
    let cart = await Order.getCart(req.session.passport.user._doc._id);
    cart.orderItems.find(orderItem => orderItem._id.equals(itemId))

})

app.put('/users/login', async (req, res, next) => {

    passport.authenticate("local", (err, user, message) => {
        console.log("authenticating")
        if(err) throw err;
        if(!user){
            console.log("login failed")
            res.json({
                message: "login failed",
                user: false
            })
        } else {
            console.log("successfully authenticated");
            let noPasswordUser = {...user};
            delete noPasswordUser.password
            req.logIn(noPasswordUser, err => {
                if(err) throw err
                res.json({
                    message: "successfully authenticated",
                    
                })
            })
        }
    })(req, res, next);
});

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });



app.listen(port, () => {
    console.log(`Server is Listening on ${port}`);
});


