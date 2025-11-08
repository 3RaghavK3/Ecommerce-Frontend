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
  alphaasc:{ sortBy: "title", order: "asc" },
  alphadesc:{ sortBy: "title", order: "desc" }
};

app.get('/products/getinfo', async (req, res) => {
  try {
    const url = `https://dummyjson.com/products/${req.query.id}`;
    const response = await fetch(url, options);
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
      total: data.total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Could not fetch items: Internal Server Error",
    });
  }
});


app.get('/products', async (req, res) => {
        const sortkey=req.query.sortstate;
        const page=parseInt(req.query.page);         
        const skip=(page-1)*limit
  try {
      let url=`https://dummyjson.com/products?limit=${limit}&skip=${skip}&sortBy=${sortMappings[sortkey].sortBy}&order=${sortMappings[sortkey].order}`;
      const response = await fetch(url, options);
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
      data:data.products,
      total:data.total   
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Could not fetch items: Internal Server Error",
    });
  }
});


app.get('/searchq', async (req, res) => {
        const sortkey=req.query.sortstate;
        const page=parseInt(req.query.page);
        const seachquery=req.query.inputvalue        
        const skip=(page-1)*limit
  try {
      let url=`https://dummyjson.com/products/search?q=${seachquery}&limit=${limit}&skip=${skip}&sortBy=${sortMappings[sortkey].sortBy}&order=${sortMappings[sortkey].order}`;
      const response = await fetch(url);
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
      data:data.products,
      total:data.total   
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Could not fetch items: Internal Server Error",
    });
  }
});


app.get('/filters',async(req,res)=>{
    try{
        const url='https://dummyjson.com/products/category-list'
        const response=await fetch(url);
        const data=await response.json()
        
        if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: data.error || data.message || "Unknown error occurred",
      });
    }


     res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data
    });
    


    }
    catch(e){
        console.error(e)
        res.status(500).json({
           sucess:false,
           message:"Could not fetch filters: Internal server error"
        })
    }
})

app.get("/filter/category",async(req,res)=>{
        const page=parseInt(req.query.page);  
        const sortkey=req.query.sortstate;
        const skip=(page-1)*limit
        const category=req.query.category.toLowerCase();
  try{  
        const url=`https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}&sortBy=${sortMappings[sortkey].sortBy}&order=${sortMappings[sortkey].order}`
        const response=await fetch(url);
        const data=await response.json()
        
        if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: data.error || data.message || "Unknown error occurred",
      });
    }



     res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data:data.products,
      total:data.total   
    });
    


    }
    catch(e){
        console.error(e)
        res.status(500).json({
           sucess:false,
           message:"Could not fetch filters by category: Internal server error"
        })
    }
})




app.get("/filter/categories",async(req,res)=>{
        const category=req.query.category.toLowerCase();
  try{  
        const url=`https://dummyjson.com/products/category/${category}`
        const response=await fetch(url);
        const data=await response.json()
        
        if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: data.error || data.message || "Unknown error occurred",
      });
    }



     res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data:data.products,
      total:data.total   
    });
    


    }
    catch(e){
        console.error(e)
        res.status(500).json({
           sucess:false,
           message:"Could not fetch filters by category: Internal server error"
        })
    }
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
