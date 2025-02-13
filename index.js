import axios from "axios";
import express from "express";

const app = express();
const PORT = 5050;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { username: "Anastassiya" });
});

app.get("/products", async (req, res) => {
  try {
    const { data } = await axios.get("https://fakestoreapi.com/products/");
    res.render("products", { data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
      res.render("product", { product: data }); 
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
