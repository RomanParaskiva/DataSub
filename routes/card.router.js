const { Router } = require('express')
const Card = require('../models/Card')

const router = Router()


router.post('/send', async (req, res) => {
    try {
        if (!req.body) throw new Error('Некорректный запрос')

        const { cardNumber, expiresMonth, expiresYear, cvv, amount } = req.body

        const card = await Card.findOne({ cardNumber })
        if (!card) {
            const newCard = new Card({
                cardNumber,
                expDate: `${expiresMonth}/${expiresYear}`,
                cvv,
                amount
            })
            await newCard.save()
            res.status(201).json({ requestId: newCard._id, amount })
        } else {
            await Card.updateOne({ cardNumber }, { ...req.body })
            console.log(card)
            res.status(200).json({ requestId: card._id, amount })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


module.exports = router