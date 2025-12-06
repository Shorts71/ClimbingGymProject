import "./products.style.css";
import { useState } from "react";
import ProductCheckBox from "./ProductCheckBox";

export default function SortBar({
  setCategoryOptions,
  setPriceOptions,
  setRatingOptions,
}) {
  const handleCategoryChange = (category) => {
    setCategoryOptions((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceChange = (range) => {
    setPriceOptions((prev) =>
      prev.some(([min, max]) => min === range[0] && max === range[1])
        ? prev.filter(([min, max]) => !(min === range[0] && max === range[1]))
        : [...prev, range]
    );
  };

  const handleRatingChange = (range) => {
    setRatingOptions((prev) =>
      prev.some(([min, max]) => min === range[0] && max === range[1])
        ? prev.filter(([min, max]) => !(min === range[0] && max === range[1]))
        : [...prev, range]
    );
  };

  return (
    <div className="sortbar">
      <h2 className="SortHeader">Price</h2>
      <ProductCheckBox
        name="$50-$100"
        onChange={() => handlePriceChange([50, 100])}
      />
      <ProductCheckBox
        name="$100-$150"
        onChange={() => handlePriceChange([100, 150])}
      />
      <ProductCheckBox
        name="$150-$200"
        onChange={() => handlePriceChange([150, 200])}
      />
      <ProductCheckBox
        name="$200-$250"
        onChange={() => handlePriceChange([200, 250])}
      />
      <h2 className="SortHeader">Rating</h2>
      <ProductCheckBox
        name="0.0-2.0"
        onChange={() => handleRatingChange([0, 2])}
      />
      <ProductCheckBox
        name="2.0-4.0"
        onChange={() => handleRatingChange([2, 4])}
      />
      <ProductCheckBox
        name="4.0-6.0"
        onChange={() => handleRatingChange([4, 6])}
      />
      <ProductCheckBox
        name="6.0-8.0"
        onChange={() => handleRatingChange([6, 8])}
      />
      <ProductCheckBox
        name="8.0-10.0"
        onChange={() => handleRatingChange([8, 10])}
      />
      <h2 className="SortHeader">Category</h2>
      <ProductCheckBox
        name="Climbing Shoes"
        onChange={() => handleCategoryChange("Climbing Shoes")}
      />
      <ProductCheckBox
        name="Harness"
        onChange={() => handleCategoryChange("Harness")}
      />
      <ProductCheckBox
        name="Belay Gear"
        onChange={() => handleCategoryChange("Belay Gear")}
      />
      <ProductCheckBox
        name="Chalk"
        onChange={() => handleCategoryChange("Chalk")}
      />
    </div>
  );
}
