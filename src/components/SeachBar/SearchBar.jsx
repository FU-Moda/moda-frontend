import { useState } from "react";
import { products } from "../../utils/products";

const SearchBar = ({ setFilterList }) => {
  const [searchWord, setSearchWord] = useState(null);

  const handleChange = (input) => {
    setSearchWord(input.target.value);
    setFilterList(
      products.filter((item) =>
        item.productName?.toLowerCase().includes(searchWord?.toLowerCase())
      )
    );
  };

  return (
    <div className="relative flex items-center max-w-lg mx-auto bg-gray-200 rounded-full py-2 px-4">
      <input
        type="text"
        placeholder="Lọc..."
        onChange={handleChange}
        className="w-full bg-transparent outline-none text-gray-700"
      />
      <ion-icon
        name="search-outline"
        className="text-gray-500 text-xl cursor-pointer"
      ></ion-icon>
    </div>
  );
};

export default SearchBar;
