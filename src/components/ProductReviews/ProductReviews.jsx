import { useState } from "react";

const ProductReviews = ({ selectedProduct }) => {
  const [listSelected, setListSelected] = useState("desc");

  return (
    <section className="py-8">
      <div className="container mx-auto">
        <ul className="flex items-center gap-4 mb-6">
          <li
            className={`font-semibold cursor-pointer ${
              listSelected === "desc" ? "text-black" : "text-gray-400"
            }`}
            onClick={() => setListSelected("desc")}
          >
            Description
          </li>
          <li
            className={`font-semibold cursor-pointer ${
              listSelected === "rev" ? "text-black" : "text-gray-400"
            }`}
            onClick={() => setListSelected("rev")}
          >
            Reviews ({selectedProduct?.reviews.length})
          </li>
        </ul>
        {listSelected === "desc" ? (
          <p>{selectedProduct?.description}</p>
        ) : (
          <div className="flex flex-col gap-4">
            {selectedProduct?.reviews.map((rate) => (
              <div key={rate.rating} className="flex flex-col gap-1">
                <span>Jhon Doe</span>
                <span className="text-yellow-300 font-semibold">
                  {rate.rating} (rating)
                </span>
                <p>{rate.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductReviews;