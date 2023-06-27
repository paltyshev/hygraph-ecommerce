function AccentButton({ children, ...props }) {
  return (
    <button
      className="w-full h-12 bg-teal-500 rounded-lg font-medium flex items-center justify-center text-white"
      {...props}
    >
      {children}
    </button>
  );
}

export default AccentButton;
