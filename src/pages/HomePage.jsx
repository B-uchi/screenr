import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { IoMdClose } from "react-icons/io";

const Homepage = ({ currentUser }) => {
  const [jobDescription, setJobDescription] = useState("");
  const [uploadModal, setUploadModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [changeButtonText, setChangeButtonText] = useState(false);
  const navigate = useNavigate();

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

  const handleUpload = () => {
    setChangeButtonText(true);
    console.log("Uploading files:", selectedFiles);
  };

  const analyzeCV = () => {
    if (jobDescription.length > 50) {
      if (currentUser) {
        toast.error("Backend not connected yet");
      } else {
        navigate("/signIn");
        toast.message("User must be signed in to analyze CV's");
      }
    } else {
      toast.error("Job description too short");
      setJobDescription('')
    }
  };

  return (
    <main className="h-full flex items-center justify-center">
      <Toaster richColors position="top-right" />
      <div className="flex lg:flex-row flex-col justify-between items-center lg:w-[65%] lg:gap-0 gap-5">
        <div className="lg:w-[1/3] lg:text-left text-center">
          <h1 className="font-extrabold text-5xl text-[#212121]">
            CV Analysis.
          </h1>
          <p className="lg:text-[17px] text-sm mt-2">
            Evaluate candidates CV's/Resumes easily with AI.
          </p>
        </div>
        <div className="flex flex-col lg:flex-grow lg:items-end w-[90%] lg:w-fit">
          <div className="">
            <div className="">
              <label className="block text-[#212121] lg:text-lg text-sm">
                Job Description:
              </label>
              <textarea
                style={{ resize: "none" }}
                className="border-[1px] max-w-full border-[#9e9d9d] rounded-md p-2"
                placeholder="Paste your job description here"
                cols={25}
                rows={6}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mt-3 w-full flex flex-col items-center gap-3.5">
              <button
                onClick={() => setUploadModal(true)}
                className="transition-all hover:scale-105 rounded-lg bg-[#313131] text-white p-3 w-[300px]"
              >
                {changeButtonText ? (
                  <div className="flex items-center gap-2 justify-center">
                    <IoCloudUploadOutline size={25} /> {selectedFiles.length} CV
                    uploaded
                  </div>
                ) : (
                  <div className="flex items-center gap-2 justify-center">
                    <IoCloudUploadOutline size={25} /> Upload Some CV
                  </div>
                )}
              </button>
              <button
                onClick={() => analyzeCV()}
                className="transition-all hover:scale-105 rounded-lg bg-[#313131]  text-white p-3 w-[250px]"
              >
                Analyze
              </button>
            </div>
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
    </main>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    currentUser: user.currentUser,
  };
};

export default connect(mapStateToProps)(Homepage);
