const options={
  method:"GET",
}

export async function handler(req, res) {
  {}
   try{ 
      const response=await fetch('https://dummyjson.com/products?limit=9',options)
      const data=await response.json()

      if (!response.ok) {
  return res.status(response.status).json({
    success: false,
    message: data.error || data.message || "Unknown error occurred",
  });
}    

      res.status(200).json({
         success:true,
         message:"Data retreived successfully",
         data
      })
   }
   catch(e){
      console.error(e)
      res.status(500).json({
         message:"Could not fetch items : Internal Server error"
      })
   }
}
