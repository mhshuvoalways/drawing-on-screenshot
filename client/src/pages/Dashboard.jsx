import Dashboard from "../components/dashboard";
import BgImg from "../assets/bg.svg";

const DashboardPage = () => {
  return (
    <div
      className="bg-center bg-no-repeat bg-fixed text-white min-h-screen"
      style={{ backgroundImage: `url(${BgImg})` }}
    >
      <p className="bg-gray-800 fixed inset-0 opacity-50"></p>
      <div className="relative">
        <div className="p-5 w-full sm:w-96 mx-auto fixed inset-0 flex items-center justify-center">
          <div className="w-full">
            <Dashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
