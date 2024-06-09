import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "../redux/user/user.actions";
import { toast } from "sonner";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseUtil";
import { CgProfile } from "react-icons/cg";
import { PiCaretDownBold } from "react-icons/pi";
import { useState } from "react";

const Navbar = ({ currentUser }) => {
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const signOutt = () => {
    toast.loading("Signing Out");
    setTimeout(() => {
      signOut(auth).then(() => {
        toast.dismiss();
      });
    }, 1000);
    setCurrentUser(null);

    navigate("/");
  };

  return (
    <nav className="bg-[#333333] h-[8vh] flex items-center">
      <div className="container px-4 lg:px-10 lg:py-20 flex items-center justify-between text-white">
        <div className="">
          <Link to={"/"}>
            <h1 className="font-extrabold text-xl">Screenr</h1>
          </Link>
        </div>
        <div className="">
          {currentUser ? (
            <div className="">
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex justify-center items-center"
              >
                <CgProfile size={30} />
                <PiCaretDownBold size={20} />
              </button>
              {dropdown && (
                <div className="absolute top-16 bg-white text-sm text-black p-2 rounded-md -translate-x-[50%]">
                  <ul className="flex flex-col gap-2">
                    <li className="">
                      <a href="mailto:random.search.corp@gmail.com">Support</a>
                    </li>
                    <li className="cursor-pointer">Billing</li>
                    <li
                      className="cursor-pointer"
                      onClick={() => {
                        setDropdown(false);
                        signOutt();
                      }}
                    >
                      Sign Out
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to={"/signIn"}>
              <button className="p-2 transition-all hover:scale-105  bg-white text-black font-boldd rounded-lg">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    currentUser: user.currentUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
