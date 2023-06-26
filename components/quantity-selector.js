import { useState } from 'react';

const QuantitySelector = ({ onChange, defaultValue = 1 }) => {
  const [quantity, setQuantity] = useState(defaultValue);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
    onChange(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onChange(quantity - 1);
    }
  };

  return (
    <div className="flex items-center">
      <button
        className="h-12 bg-gainsboro border-2 border-amber-400 border-r-0 text-gray-700 font-bold py-2 px-4 rounded-l-lg"
        onClick={handleDecrease}
      >
        -
      </button>
      <input
        id="quantity"
        name="quantity"
        className="h-12 appearance-none  bg-gainsboro border-l-0 border-r-0 border-2 border-amber-400 py-2 px-4 rounded-none w-10 text-center"
        value={quantity}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          setQuantity(value || 1);
          onChange(value || 1);
        }}
      />
      <button
        className="h-12 border-2 border-amber-400 border-l-0 text-gray-700 font-bold py-2 px-4 rounded-r-lg"
        onClick={handleIncrease}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
