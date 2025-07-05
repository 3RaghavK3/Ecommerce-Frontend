const sortOptionsList = [
  {
    id: "Default",
    label: "Default",
    parameter: "",
    order: "",
  },
  {
    id: "PriceL",
    label: "Price: Low to High",
    parameter: "price",
    order: "asc",
  },
  {
    id: "PriceH",
    label: "Price: High to Low",
    parameter: "price",
    order: "desc",
  },
  {
    id: "Rating",
    label: "Rating: High to Low",
    parameter: "rating",
    order: "desc",
  },
  {
    id: "Discount",
    label: "Discount: High to Low",
    parameter: "discountPercentage",
    order: "desc",
  },
  {
    id: "Alpha",
    label: "Alphabetical (A-Z)",
    parameter: "title",
    order: "asc",
  },
];

export default sortOptionsList;
