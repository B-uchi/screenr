import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

const Homepage = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [uploadModal, setUploadModal] = useState(false);
  return (
    <main className="h-full flex items-center justify-center">
      <div className="flex lg:flex-row flex-col justify-between items-center lg:w-[65%] lg:gap-0 gap-5">
        <div className="lg:w-[1/3] lg:text-left text-center">
          <h1 className="font-extrabold text-5xl text-[#212121]">Screenr.</h1>
          <p className="lg:text-[17px] text-sm">
            Evaluate candidates CV's/Resumes easily with AI.
          </p>
        </div>
        <div className="flex flex-col lg:flex-grow lg:items-end w-[90%] lg:w-fit">
          <div className="">
            <div className="">
              <label className="block text-[#212121] lg:text-lg text-sm">Job Description:</label>
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
                className="transition-all flex items-center gap-2 justify-center hover:scale-105 rounded-lg bg-[#313131] text-white p-3 w-[300px]"
              >
                <IoCloudUploadOutline size={25} /> Upload Some CV
              </button>
              <button className="transition-all hover:scale-105 rounded-lg bg-[#313131]  text-white p-3 w-[250px]">
                Analyze
              </button>
            </div>
          </div>
        </div>
      </div>
      {uploadModal && (
        <div className="absolute flex flex-col justify-center items-center bg-slate-600 bg-opacity-70 w-full h-[94vh]">
          <div className="text-center bg-white p-5 rounded-md">
            {" "}
            <input
              type="file"
              accept=".pdf"
              multiple
              // onChange={handleFileChange}
            />
            <p>(Max: 10)</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Homepage;
