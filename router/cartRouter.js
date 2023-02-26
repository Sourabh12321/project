
const express = require("express");
const { cartModel } = require("../models/cart");
const cartRouter = express.Router();


cartRouter.get("/:id", async (req, res) => {
    const uid = req.params.id;
    console.log(uid);
    try {
        const data = await cartModel.find({ userId: uid });
        console.log(data)
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

cartRouter.post('/create', async (req, res) => {
    try {
        const cartproduct = new cartModel({ ...req.body, quantity: 1 });
        await cartproduct.save();
        res.send("Product has been added to the Cart");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

cartRouter.delete('/:id', async (req, res) => {
    try {
        await cartModel.findByIdAndDelete({ _id: req.params.id });
        res.send("Product removed from the cart");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

module.exports = { cartRouter }
