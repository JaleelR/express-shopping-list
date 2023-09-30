const items = require("./fakeDb");
const ExpressError = require("./ExpressError");
const express = require("express")
 //connects router to app.js
const router = new express.Router()
  

router.get("/", function (req, res) {
    res.json({ items })
});


router.post("/", function (req, res, next) {
    try {
        if (req.body.name === undefined || req.body.price === undefined) {
            throw new ExpressError("name and price must be  added", 400);
        }
        else if (isNaN(req.body.price)) {
            throw new ExpressError("Price must be numbers", 400)
        };
        let added = {
            name: req.body.name,
            price: req.body.price,
        }
        items.push(added);
        return res.status(201).json({ added })
    } catch (e) {
        return next(e)
    }
})


router.get("/:name", function (req, res, next) {
    try {
        let itemFound = items.find(item => item.name === req.params.name)
        if (itemFound === undefined) {
            throw new ExpressError(`Cannot find item ${req.params.name}`, 404)
        }
        return res.status(200).json({ itemFound })
    } catch (e) {
        return next(e)
    }
})

router.patch("/:name", function (req, res, next) {
    try {
        let itemFound = items.find(item => item.name === req.params.name)
        if (itemFound === undefined) {
            throw new ExpressError(`Cannot find item ${ req.params.name }`, 404)
        }
        itemFound.name = req.body.name
        itemFound.price = req.body.price
        if (req.body.name === undefined || req.body.price === undefined) {
            throw new ExpressError("name and price must be  added", 400);
        }
        if (isNaN(req.body.price)) throw new ExpressError("Price must be numbers", 400);
        let updated = {
            name: req.body.name,
            price: req.body.price,
        }
        items.push(updated);
        return res.status(200).json({updated})
    } catch (e) {
        return next(e)
    }
    })

router.delete("/:name", (req, res, next) => {
    let itemFound = items.findIndex(item => item.name === req.params.name)
    if (itemFound === -1) {
       throw new ExpressError("Item not found", 404)}
    items.splice(itemFound, 1)
    res.status(400).json({ message: "Deleted"})
    })





//for routes to conntct
module.exports = router;