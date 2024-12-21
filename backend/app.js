const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const cloudinary = require("cloudinary");
const morgan = require("morgan");

const inforouter = require("./routes/infoRouter.js");
const userrouter = require("./routes/userRouter.js");
const categoryrouter = require("./routes/categoryRouter.js");
const attributerouter = require("./routes/attributeRouter.js");
const productrouter = require("./routes/productRouter.js");
const cartrouter = require("./routes/cartRouter.js");
const bannerrouter = require("./routes/bannerRouter.js");
const variantrouter = require("./routes/variantRouter.js");
const wishlistrouter = require("./routes/wishlistRouter.js");
const carousellistrouter = require("./routes/carousellistRouter.js");
const brandrouter = require("./routes/brandRouter.js");
const addressrouter = require("./routes/addressRouter.js");
const orderrouter = require("./routes/orderRouter.js");

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://ecom-mern-project-admin.onrender.com",
    "https://ecom-mern-project-client.onrender.com",
  ], // List allowed origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions));
app.use(morgan("combined"));

const connectdb = require("./db/connection.js");
require("./Models/contactus");
require("./Models/category");
require("./Models/attribute");
require("./Models/product");
require("./Models/product_variant");
require("./Models/usertable");
require("./Models/wishlist");
require("./Models/brand");
require("./Models/address");
require("./Models/order");

const port = process.env.PORT || 8000;
const database = process.env.MONGO_URI || "";
mongoose.set("strictQuery", false);
connectdb(database);

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// API routes
app.use("/api", inforouter);
app.use("/api/user", userrouter);
app.use("/api/product", productrouter);
app.use("/api/category", categoryrouter);
app.use("/api/attribute", attributerouter);
app.use("/api/banner", bannerrouter);
app.use("/api/cart", cartrouter);
app.use("/api/wishlist", wishlistrouter);
app.use("/api/variant", variantrouter);
app.use("/api/list", carousellistrouter);
app.use("/api/brand", brandrouter);
app.use("/api/address", addressrouter);
app.use("/api/order", orderrouter);

// Redirect all unknown routes to index.html (for React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
