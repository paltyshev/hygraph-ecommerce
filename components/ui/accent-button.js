function AccentButton({ children, ...props }) {
  return (
    <button
      className="w-full h-12 text-black bg-accent-100 dark:accent-accent-dark-500 rounded-lg shadow-lg shadow-accent-100/50 font-medium flex items-center justify-center"
      {...props}
    >
      {children}
    </button>
  );
}

export default AccentButton;
