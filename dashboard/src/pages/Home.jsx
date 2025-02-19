import Overview from "../components/Statictics/Overview";
import TopProduct from "../components/Statictics/TopProduct";
import TopUser from "../components/Statictics/TopUser";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 ">
      <div className="bg-white shadow-lg rounded-md p-5">
        <Overview />
        <div className="grid grid-cols-2 space-x-5">
          <TopProduct />
          <TopUser />
        </div>
      </div>
    </div>
  );
}
