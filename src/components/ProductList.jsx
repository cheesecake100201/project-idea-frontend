import React from "react";

const ProductList = ({ output }) => {
  return (
    <div className="mt-8 max-w-xl mx-auto max-h-screen bg-white rounded-lg shadow-md overflow-auto scrollbar">
      <div className="px-6 py-4">
        <h2 className="font-mono text-gray-800 text-2xl font-semibold mb-4">
          Products List
        </h2>
        <hr className="mb-4" />
        <ul>
          {output.map((product, index) => (
            <li key={index} className="mb-4">
              <div className="bg-gray-100 p-4 rounded-md">
                <p className="text-lg font-mono text-gray-800">{product}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
