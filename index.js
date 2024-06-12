const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const port = 5000;

const app =express()
app.use(cors({origin:true}))


app.use(express.json())

app.get("/", (req,res)=>{
    res.status(200).json({
        message:"success"
    })
})


app.post("/payment/create", async (req,res)=>{
    const total = req.query.total
    

    if(total > 0){
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "usd"
        })
        // console.log(paymentIntent);
        res.status(201).json({
            clientSecret:paymentIntent.client_secret
        })
    }else{
        res.status(403).json({
            message:"total must be greater than 0"
        })
    }
})
// app.post("/payment/create", async (req, res) => {
//     try {
//       const { total, currency = "usd" } = req.body;
  
//       if (total <= 0) {
//         return res.status(403).json({
//           message: "Total must be greater than 0",
//         });
//       }
  
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: total * 100, // Stripe requires the amount in the smallest currency unit
//         currency,
//       });
  
//       res.status(201).json({ clientSecret: paymentIntent.client_secret });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Failed to create payment intent" });
//     }
//   });

app.listen(port, (err)=>{
    if(err) throw err
    console.log(`Amazon server Running on Port:${port}`);
})
