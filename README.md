# Shopera

This is a fully functional e-commerce frontend mockup that allows users to browse products, filter and sort the catalog, add items to a persistent cart, track search history, and simulate the checkout process. The website also provides personalized product recommendations using a content-based ML engine. The UI is fully responsive for laptop, tablet, and mobile screens, built using the *shadcn/ui component library.

> ⚠️ **Note:** This project is set up with **TypeScript** (via shadcn/ui templates) and includes TypeScript warnings currently. TypeScript features will be fully utilized in future updates.


## Live Demo
https://ecommerce-frontend-nu-orpin.vercel.app


## Features

- Dynamic product catalog with filtering by category, price, discount, rating, and alphabetical sorting
- Search for products with keyword matching (tracks up to 3 recent searches)
- Content-based product recommendations (similar products based on attributes)
- Persistent cart and order data using localStorage
- Full shopping flow with add-to-cart, cart management, and simulated checkout
- Responsive UI across mobile, tablet, and desktop screens, built with **shadcn/ui** component library for modern and consistent UI
 

## Tech Stack

**Client:** React, TailwindCSS, shadcn/ui, Lucide-React  
**Server:** Node.js, Express.js (API via DummyJSON)  
**ML Server/ Recommendations:** scikit-learn, pandas, joblib,FastAPI, Uvicorn 
## Installation
```
git clone https://github.com/3RaghavK3/Ecommerce-Frontend.git
cd Ecommerce-Frontend

# Install client
cd client
npm install

# Install server
cd ../server
npm install
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

Client (`client/.env`)
```
RESULTS_PER_PAGE=9
VITE_RESULTS_PER_PAGE=9
VITE_API_URL=your_backend_api_url
VITE_ML_URL=your_ml_server_api_url
```




## Run Locally


```
# Start backend
cd server
npm start

# Start ML backend
cd server
uvicorn Engine:app --reload

# Start frontend (in a separate terminal)
cd client
npm run dev
```

# Project Structure
```
ECOMMERCE-FRONTEND/
├── client/
│   ├── node_modules/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── .env
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vercel.json
│   └── vite.config.ts
│
├── server/
│   ├── __pycache__/
│   ├── node_modules/
│   ├── Engine.py
│   ├── Feature_matrix.csv
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   ├── Products.csv
│   ├── Recommendation.pkl
│   └── requirements.txt
│
├── .gitignore
└── README.md
```

## API Reference
### Get All Products (Paginated)
```http
GET /products?page=${page}&sortstate=${sortKey}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | `number` | **Required**. Page number for pagination |
| `sortstate` | `string` | **Required**. Sort key (default, priceLowToHigh, priceHighToLow, etc.) |

Returns paginated product list with sorting.

**Default:** 9 products per page

---

### Get Product Details
```http
GET /products/getinfo?id=${id}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `number` | **Required**. Product ID |

Returns detailed information for a specific product.

---

### Search Products
```http
GET /searchq?inputvalue=${query}&page=${page}&sortstate=${sortKey}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `inputvalue` | `string` | **Required**. Search query |
| `page` | `number` | **Required**. Page number |
| `sortstate` | `string` | **Required**. Sort key |

Returns search results with pagination and sorting.

---

### Get Category List
```http
GET /filters
```

Returns list of all available product categories.

---

### Filter by Category (Paginated)
```http
GET /filter/category?category=${category}&page=${page}&sortstate=${sortKey}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | **Required**. Category name |
| `page` | `number` | **Required**. Page number |
| `sortstate` | `string` | **Required**. Sort key |

Returns filtered products by category with pagination and sorting.

---

### Get All Products in Category
```http
GET /filter/categories?category=${category}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | `string` | **Required**. Category name |

Returns all products in a specific category (no pagination).

---

### Health Check
```http
GET /health
```

Returns server health status.

## Sort Options

The API supports the following sort states:

| Sort Key | Sort By | Order |
|----------|---------|-------|
| `default` | ID | Ascending |
| `priceLowToHigh` | Price | Ascending |
| `priceHighToLow` | Price | Descending |
| `ratingHighToLow` | Rating | Descending |
| `discountHighToLow` | Discount | Descending |
| `alphaasc` | Title | Ascending |
| `alphadesc` | Title | Descending |

## Recommendation System

The project includes a Python-based recommendation engine that uses:
- `Engine.py` - Main recommendation logic
- `Feature_matrix.csv` - Feature vectors for products
- `Products.csv` - Product dataset
- `Recommendation.pkl` - Pre-trained recommendation model
## Screenshots

**Landing Page Banner (Mobile)**  
![Banner – Mobile](https://github.com/user-attachments/assets/416e46d5-fccd-4ecd-bb65-0e1936f4166a)

**Product Detail (iPad)**  
![Product Detail – iPad](https://github.com/user-attachments/assets/be6b2889-c120-4621-8883-e23603b1cd88)

**Filter by Category (Mobile)**  
![Filter – Mobile](https://github.com/user-attachments/assets/621aa5d1-a5ec-4b5a-9a3b-56ebe2482bbc)

**Shipping Page (Laptop)**  
![Shipping – Laptop](https://github.com/user-attachments/assets/be562653-e83e-4441-8adf-14d3e812f241)

## Future Improvements / Known Issues

- Improve overall UI/UX for a more seamless user experience( especially Checkout and Past Orders).
- Split checkout flow into visually distinct steps: Shipping → Payment → Confirmation.
- Fix minor non-responsive elements across certain screen sizes.
- Introduce user-based collaborative recommendation system by tracking user history stored in localStorage( currently it is limited to content-based)