import joblib
import pandas as pd
from fastapi import FastAPI,Request
from fastapi.middleware.cors import CORSMiddleware
import json
import ast

origins = [
    "http://localhost:5173",   
    "https://ecommerce-frontend-nu-orpin.vercel.app"
]

model=joblib.load("Recommendation.pkl")
df_final=pd.read_csv("Feature_matrix.csv")
df=pd.read_csv("Products.csv")

df['images'] = df['images'].apply(lambda x: ast.literal_eval(x) if pd.notna(x) else [])



app=FastAPI()


app.add_middleware(CORSMiddleware,allow_origins=origins,allow_methods=["*"],
    allow_headers=["*"],  )

@app.get("/recommend-products")
def recommend_products(product_id:int,num_recommendations:int):
    product_index=product_id-1
    distances, indices = model.kneighbors(df_final.iloc[product_index:product_index+1])
    top_similar_products = df.iloc[indices[0]].iloc[1:num_recommendations+1]
    top_similar_products['brand'] = top_similar_products['brand'].fillna("")
    return top_similar_products.to_dict(orient="records")

@app.get("/health")
def health():
    return {"status":"ok","message":"Alive"}