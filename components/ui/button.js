function Button({ children, ...props }) {
  return (
    <button
      // className="bg-indigo-600 hover:bg-gray-700 px-4 py-3 rounded-lg text-white text-sm font-bold tracking-widest uppercase focus:outline-none"
      className="w-full h-12 bg-yellow-400 rounded-lg font-medium flex items-center justify-center text-gray-900"
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
