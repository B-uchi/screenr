const Navbar = () => {
  return (
    <nav className="bg-[#333333] h-[8vh] flex items-center">
      <div className="container px-4 lg:px-10 lg:py-20 flex items-center justify-between text-white">
        <div className="">
          <h1 className="font-extrabold text-xl">Screenr</h1>
        </div>
        <div className="">
            <button className="p-2 transition-all hover:scale-105  bg-white text-black font-boldd rounded-lg">Sign In</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
