import React, { useState, useEffect } from "react";
import useDebounce from "./Debounce";
import ProductList from "./ProductList";
const InputIdea = () => {
  const [input, setInput] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [products, setProducts] = useState([]);
  const debouncedInput = useDebounce(input, 1500);

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedInput) {
        try {
          const response = await fetch("https://projectidea-fskx.onrender.com/categoryImage", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idea: debouncedInput,
            }),
          });
          const data = await response.json();
          setImageurl(data.image);
        } catch (error) {
          console.error(error);
        }
      } else {
        setImageurl("");
      }
    };

    fetchData();
  }, [debouncedInput]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const resetImage = () => {
    if (!input) {
      setImageurl("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://projectidea-fskx.onrender.com/productList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: input,
        }),
      });
      const data = await response.json();
      let productList = await data.response.split("\n");
      console.log(productList);
      setProducts(productList);
    } catch (error) {
      console.error(error);
    }
    console.log("Form submitted!");
  };

  return (
    <div className="flex flex-col items-center justify-start mt-4 h-screen">
      <h1 className="font-mono text-3xl mb-4">Product Idea</h1>
      <form onSubmit={handleSubmit} className="w-full relative">
        <input
          type="text"
          placeholder="Enter text here..."
          className="border border-gray-300 rounded p-2 font-mono w-full h-16 text-lg relative pl-4 pr-4 overflow-scroll"
          onChange={handleChange}
          onBlur={resetImage}
          value={input}
          style={{
            paddingRight: "4rem",
            wordWrap: "break-word",
          }}
        />
        {imageurl && (
          <img
            src={imageurl}
            className="absolute right-4 bottom-1/2 transform -translate-y-1/2 rounded-full size-12"
            alt="Product Image"
            style={{ width: "2rem", height: "2rem" }}
          />
        )}
        <button
          type="submit"
          className="font-mono mt-2 bg-blue-500 text-white rounded p-2 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        >
          Submit
        </button>
      </form>
      {products.length > 0 && (
        <>
          <ProductList output={products} />
        </>
      )}
    </div>
  );
};

export default InputIdea;
