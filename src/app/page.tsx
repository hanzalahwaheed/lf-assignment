import axios from "axios";
import ProductBrowser from "@/components/product/product-browser";

const fetchProducts = async () => {
  const response = await axios.get("https://dummyjson.com/products?limit=100");
  if (!response.data) {
    throw new Error(`HTTP error. Status: ${response.status}`);
  }
  return response.data.products;
};

const Home = async () => {
  const products = await fetchProducts();
  return <ProductBrowser products={products} />;
};

export default Home;
