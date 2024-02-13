import Navbar from "../components/Navbar";
// import Signing from "./Signing";
// import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import AccountSelection from "../components/AccountSelection";

const Account = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mx-0 my-0 mt-3">
        <div className=" w-4/5 ">
          <AccountSelection />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Account;
