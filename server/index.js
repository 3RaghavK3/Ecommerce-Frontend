import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const limit = parseInt(process.env.RESULTS_PER_PAGE) || 9;


app.use(cors());
const options = {
  method: "GET",
};

const sortMappings = {
  default: { sortBy: "id", order: "asc" },
  priceLowToHigh: { sortBy: "price", order: "asc" },
  priceHighToLow: { sortBy: "price", order: "desc" },
  ratingHighToLow: { sortBy: "rating", order: "desc" },
  discountHighToLow: { sortBy: "discountPercentage", order: "desc" },
};



app.get('/products', async (req, res) => {
        const sortkey=req.query.sortstate;
        console.log(sortkey);
        const page=parseInt(req.query.page);
        const skip=(page-1)*limit
  try {
    const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}&sortBy=${sortMappings[sortkey].sortBy}&order=${sortMappings[sortkey].order}`, options);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: data.error || data.message || "Unknown error occurred",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Could not fetch items: Internal Server Error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
