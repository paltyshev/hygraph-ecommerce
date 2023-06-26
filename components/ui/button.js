function Button({ children, ...props }) {
  return (
    <button
      className="w-full h-12 bg-amber-400 rounded-lg font-medium flex items-center justify-center text-gray-900"
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
