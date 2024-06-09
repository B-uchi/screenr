import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <p>Oops, we cant find that page.</p>
      <p>Let's go back to <span className="underline text-blue-700"><Link to="/">Homepage</Link></span></p>
    </div>
  );
};

export default NotFound;
