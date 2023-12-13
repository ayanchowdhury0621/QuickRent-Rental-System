const express = require("express");
const redis = require("redis");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5001;
const redis_port = process.env.REDIS_PORT || 6379;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Fix this
const client = redis.createClient(redis_port);
client.on('error', err => console.log('Redis Client Error', err));
client.connect();


app.get("/api/tempCart/:userId", (req, res) => {
  console.log("In temp request");
  const response = [
    {
      prodID: "lap1",
      prod: {
        category: "Study",
        quantity: 2,
        location: {
          lat: "49.17954284056799",
          lon: "8.986800110919631"
        },
        name: "Laptop 101",
        price: "33",
        tags: ["computer", "tech", "study"],
      },
    },
    {
      prodID: "lap2",
      prod: {
        category: "Study",
        quantity: 2,
        location: {
          lat: "49.17954284056799",
          lon: "8.986800110919631"
        },
        name: "Laptop 102",
        price: "33",
        tags: ["computer", "tech", "study"],
      },
    },
    {
      prodID: "lap3",
      prod: {
        category: "Study",
        quantity: 2,
        location: {
          lat: "49.17954284056799",
          lon: "8.986800110919631"
        },
        name: "Laptop 103",
        price: "33",
        tags: ["computer", "tech", "study"],
      },
    },
  ]

  res.json(response);
})


app.get("/api/getCart/:userId", async (req, res) => {
  const userId = req.params.userId;
  console.log("getCart:", userId);

  // Check if the user's cart exists in Redis

  try {
    const response = await client.GET(userId);
    console.log("Fetched success", response);
    res.json(response);
  } catch (error) {
    console.log("Fetcing redis error", error);
    res.json({ message: "Fetching Error" })
  }
});

const storeCartInRedis = async (userId, cartData) => {
  const cartString = JSON.stringify(cartData);
  console.log("storeCart:", userId, cartData);
  const type = await client.type(userId);
  console.log("Type:", type);

  // Store the cart data in Redis with the userId as the key.
  try {
    await client.set(userId, cartString, 'EX', 5, () => {
      console.log("success");
    });
    return { message: "success" };
  }
  catch (error) {
    console.log("Some error in store func", error);
    return { message: "Failure in storing" };
  }
};

app.post("/api/updateCart/:userId", (req, res) => {
  const userId = req.params.userId;
  const cartData = req.body;
  console.log("updCart", userId, req.body);
  const response = storeCartInRedis(userId, cartData);
  res.json({ message: 'Cart data updated and stored in Redis' });

})

app.listen(port, () => {
  console.log("Listening on port:", port);
})