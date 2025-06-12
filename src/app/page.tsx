"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState<string>("");

  const fetchData = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      console.log(response);
      const data = response.data;
      console.log(data);
      setData(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error fetching data:", error);
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
