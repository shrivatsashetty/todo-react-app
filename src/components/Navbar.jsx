/* eslint-disable react/react-in-jsx-scope */
function Navbar() {
  return (
    <>
      <nav
        className="bg-purple-800
            text-white 
            flex 
            justify-around 
            font-semibold
            p-2.5
            
            /* Mobile Styles */
            max-sm:flex-col      /* Stacks items vertically */
            max-sm:items-center  /* Centers items horizontally */
            max-sm:gap-3         /* Adds space between Logo and List */
            max-sm:font-medium
            max-sm:text-sm
            "
      >
        <span className="text-lg font-bold">iTasks</span>

        <ul className="list-none flex gap-5
            /* Mobile Styles */
            max-sm:flex-col 
            max-sm:items-center /* Centers the links in the stack */
            max-sm:gap-2        /* Reduces gap between links on mobile */
            ">
          <li className="font-light hover:font-bold transition-[font-weight] duration-300 ease-in-out">
            <a href="#">Home</a>
          </li>
          <li className="font-light hover:font-bold transition-[font-weight] duration-300 ease-in-out">
            <a href="#">YourTasks</a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;