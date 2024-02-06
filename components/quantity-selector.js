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
        className="h-12 border-2 border-primary border-r-0 text-primary font-bold py-2 px-4 rounded-l-lg bg-background"
        onClick={handleDecrease}
      >
        -
      </button>
      <input
        id="quantity"
        name="quantity"
        className="h-12 border-l-0 border-r-0 border-2 border-primary py-2 px-4 rounded-none w-10 text-center bg-background"
        value={quantity}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          setQuantity(value || 1);
          onChange(value || 1);
        }}
      />
      <button
        className="h-12 border-2 border-primary border-l-0 text-primary font-bold py-2 px-4 rounded-r-lg bg-background"
        onClick={handleIncrease}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
