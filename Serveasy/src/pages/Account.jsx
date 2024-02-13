import Navbar from "../components/Navbar";
<<<<<<< HEAD
=======
import Signing from "./Signing";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import AccountSelection from "../components/AccountSelection";
>>>>>>> 78dd7d24dff3c35140cd93c4947b8f74dd7a8105

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
