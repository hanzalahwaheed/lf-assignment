"use client";
import axios from "axios";

const fetchProducts = async () => {
  try {
    const response = await axios.get(
      "https://dummyjson.com/products?limit=100"
    );
    if (!response.data)
      throw new Error(`HTTP error. Status: ${response.status}`);
    const products = response.data.products;
    return products;
  } catch (e) {
    console.error(e);
  } finally {
  }
};

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <pre>{data}</pre>
    </div>
  );
};

export default Home;
