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

app.get('/products', async (req, res) => {
        const sortstate=req.query.sortstate 
        const page=parseInt(req.query.page)||1
        const skip = (page-1)*limit


  try {
    const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`, options);
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
