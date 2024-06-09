import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../firebase/firebaseUtil";
import { Toaster, toast } from "sonner";
import { connect } from "react-redux";
import { setCurrentUser } from "../redux/user/user.actions";
import { useNavigate } from "react-router-dom";

const Authentication = ({ currentUser }) => {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const signInWIthGoogle = () => {
    if (currentUser) {
      return toast.message("User already signed in");
    }
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        toast.message("Signed in as " + user.email);
        setCurrentUser(user);
        sessionStorage.setItem("token", token);
        setTimeout(() => {
          navigate("/");
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error.message, error.code);
        toast.error(error.code);
      });
  };

  const signIn = () => {
    if (!email || !password) {
      return toast.error("All fields are required");
    }
    if (currentUser) {
      return toast.message("User already signed in");
    }
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        clearInputs();
        toast.message("Signed in as " + email);
        setCurrentUser(user);
        setTimeout(() => {
          navigate("/");
          setLoading(false);
        }, 1000);
      })
      .catch((e) => {
        clearInputs();
        setLoading(false);
        console.log(e.message);
        toast.error(e.code);
      });
  };

  const signUp = () => {
    if (!email || !password) {
      return toast.error("All fields are required");
    }
    if (currentUser) {
      return toast.message("User already signed in");
    }
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        clearInputs();
        setCurrentUser(user);
        toast.message("Signed in as " + email);
        setTimeout(() => {
          navigate("/");
          setLoading(false);
        }, 1000);
      })
      .catch((e) => {
        clearInputs();
        setLoading(false);
        console.log(e.message);
        toast.error(e.code);
      });
  };

  return (
    <div className="h-full flex justify-center items-center">
      <Toaster richColors position="top-right" />
      {loading && (
        <div className="absolute bg-white bg-opacity-50 h-[92vh] w-full flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      )}
      <div className="bg-white border-[1px] md:w-[500px] border-[#9e9d9d] p-3 rounded-md">
        {page == 0 ? (
          <div className="">
            <h1 className="text-xl font-bold text-center">Sign In</h1>
            <div className="mt-3">
              <div className="">
                <label className="block">E-mail:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-[1px] w-full p-1 rounded-md border-[#9e9d9d]"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mt-2">
                <label className="block">Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-[1px] w-full p-1 rounded-md border-[#9e9d9d]"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div className="mt-3 flex flex-col">
              <button
                onClick={() => signIn()}
                className="p-2 bg-[#333333] rounded-md text-white font-bold"
              >
                Sign In
              </button>
              <button
                onClick={() => signInWIthGoogle()}
                className="mt-3 flex justify-center items-center gap-3 border-[1px] border-[#333333] p-2 rounded-md"
              >
                <FcGoogle size={24} /> Continue with Google
              </button>
              <button
                onClick={() => setPage(1)}
                className="text-center underline text-sm mt-3"
              >
                Don't have an account?
              </button>
            </div>
          </div>
        ) : (
          <div className="">
            <h1 className="text-xl font-bold text-center">Sign Up</h1>
            <div className="mt-3">
              <div className="">
                <label className="block">E-mail:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-[1px] w-full p-1 rounded-md border-[#9e9d9d]"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mt-2">
                <label className="block">Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-[1px] w-full p-1 rounded-md border-[#9e9d9d]"
                  placeholder="Enter a password"
                />
              </div>
            </div>
            <div className="mt-3 flex flex-col">
              <button
                onClick={() => signUp()}
                className="p-2 bg-[#333333] rounded-md text-white font-bold"
              >
                Sign Up
              </button>
              <button
                onClick={() => signInWIthGoogle()}
                className="mt-3 flex justify-center items-center gap-3 border-[1px] border-[#333333] p-2 rounded-md"
              >
                <FcGoogle size={24} /> Sign Up with Google
              </button>
              <button
                onClick={() => setPage(0)}
                className="text-center underline text-sm mt-3"
              >
                Already have an account?
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
