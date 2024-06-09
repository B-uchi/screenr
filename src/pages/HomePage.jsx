import { useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { IoMdClose } from "react-icons/io";
import { setCurrentUser } from "../redux/user/user.actions";
import { MdOutlineAccountCircle } from "react-icons/md";

const Homepage = ({ currentUser }) => {
  const [jobDescription, setJobDescription] = useState("");
  const [uploadModal, setUploadModal] = useState(false);
  const [JDModal, setJDModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [changeJDButtonText, setChangeJDButtonText] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accountIconModal, setAccountIconModal] = useState(false);
  const fileInputRef = useRef(null);

  console.log(selectedFiles);

  const handleFileChange = (event) => {
    const newFiles = event.target.files;

    if (selectedFiles.length + newFiles.length > 10) {
      alert("You can only upload a maximum of 10 files.");
      return;
    }

    const validFiles = Array.from(newFiles).filter(
      (file) => file.type === "application/pdf"
    );

    setSelectedFiles([...selectedFiles, ...validFiles]);
  };

  const handleButtonClick = () => {
    setSelectedFiles([]);
    fileInputRef.current.click();
    setChangeJDButtonText(true);
    console.log("Uploading files:", selectedFiles);
  };

  const analyzeCV = () => {
    if (jobDescription.length > 50) {
      if (currentUser) {
        toast.error("Backend not connected yet");
      } else {
        toast.message("User must be signed in to analyze CV's");
        signInWithGoogle();
      }
    } else {
      toast.error("Job description too short");
      setJobDescription("");
    }
  };

  const signInWithGoogle = () => {
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
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message, error.code);
        toast.error(error.code);
      });
  };

  return (
    <main className="flex justify-center">
      {loading && (
        <div className="absolute h-full bg-white bg-opacity-40 w-full flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      )}
      <Toaster richColors position="top-right" />
      <div className="text-white flex flex-col lg:w-[50%] w-full mt-[50px]">
        <div className="mb-[60px] relative flex justify-end justify-self-end">
          {currentUser ? (
            <button
              onClick={() => {
                setAccountIconModal(!accountIconModal);
              }}
              className="mr-10 rounded-full bg-white text-black p-1"
            >
              <div className="p-1">
                <small className="block">Account</small>
                <small>Icon</small>
              </div>
            </button>
          ) : (
            <button
              onClick={() => signInWithGoogle()}
              className="p-2  bg-white rounded-full text-black mr-10"
            >
              <div className="">
                <small className="block">Google</small>
                <small>Sign In</small>
              </div>
            </button>
          )}
          {accountIconModal && (
            <div className="absolute bg-[#000300] border-[1px] border-[#5F5000] p-2 bottom-0 translate-y-[110%] right-10">
              <ul>
                <li>
                  <div className="flex items-center gap-3">
                    <img
                      src={currentUser.photoURL}
                      className="w-8 rounded-full"
                      alt=""
                    />
                    <small className="text-[15px]">
                      {currentUser.displayName}
                    </small>
                  </div>
                </li>
                <li className="mt-1">
                  <a href="mailto:random.search.corp@gmail.com">
                    <small className="text-[15px]">Support Request</small>
                  </a>
                </li>
                <li className="mt-1">
                  <a href="#">
                    <small className="text-[15px]">Billing</small>
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="flex flex-row justify-evenly">
          <div className="flex justify-center items-center">
            <div className="flex flex-col">
              <h1 className="font-extrabold text-xl">Evaluate a CV of</h1>
              <h1 className="font-extrabold text-xl">a candidate with AI</h1>
            </div>
          </div>
          <div className="flex flex-col gap-10 font-semibold">
            <button
              onClick={() => {
                setJDModal(true);
              }}
              className="h-[59px] w-[158px] bg-[#3a3a3a]"
            >
              {!changeJDButtonText
                ? "Paste your job description"
                : "Job description pasted"}
            </button>
            <button
              onClick={() => handleButtonClick()}
              className="h-[59px] w-[158px] bg-[#3a3a3a]"
            >
              {selectedFiles.length > 0
                ? selectedFiles.length + " CV uploaded"
                : "Upload some CV"}
            </button>
            <input
              type="file"
              accept=".pdf"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <button
              onClick={() => analyzeCV()}
              className="h-[42px] w-[158px] bg-[#144d00]"
            >
              <div className="flex flex-col">
                <p>Analyze</p>
                <small>(10 tokens)</small>
              </div>
            </button>
          </div>
        </div>
      </div>
      {uploadModal && (
        <div className="absolute flex flex-col justify-center items-center bg-slate-600 bg-opacity-70 w-full h-[92vh]">
          <div className="text-center relative bg-white p-5 rounded-md">
            <button
              onClick={() => {
                setUploadModal(false);
              }}
              className="absolute right-3 text-red-600"
            >
              <IoMdClose />
            </button>{" "}
            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileChange}
            />
            <p>(Max: 10)</p>
            <button
              onClick={() => {
                handleUpload();
                setUploadModal(false);
              }}
              className="mt-2 bg-[#333333] text-white p-2 rounded-md"
            >
              Continue
            </button>
          </div>
        </div>
      )}
      {JDModal && (
        <div className="absolute md:p-0 p-2 flex flex-col justify-center items-center bg-white w-full h-full">
          <div className="">
            <textarea
              style={{ resize: "none" }}
              className="p-2 w-full border-[1px] border-[#e1e1e1]"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={15}
              cols={60}
              placeholder="Insert your job description here. You don't need to worry about the layout or structure. 
Just include the essence of the job, tasks, deliverables, requirements, qualifications, skills, etc."
            ></textarea>
            <div className="flex justify-center gap-5 mt-3 text-white font-semibold">
              <button
                onClick={() => {
                  setChangeJDButtonText(true);
                  setJDModal(false);
                }}
                className="h-[56px] w-[174px] bg-[#000000]"
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  setJDModal(false);
                  setJobDescription("");
                  setChangeJDButtonText(false);
                }}
                className="h-[56px] w-[174px] bg-[#3a3a3a]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
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
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
