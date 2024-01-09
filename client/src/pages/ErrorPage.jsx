import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { Layout } from "antd";
const { Content } = Layout;
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const userInfo = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/`);
  };
  return (
    <Layout style={{ height: "100vh" }}>
      <Header userInfo={userInfo} />
      <Content
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="flex flex-col items-center align-top space-y-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#5048e5"
            className="w-20 h-20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>

          <p className="text-3xl font-bold text-center">
            Oops, something went wrong!
          </p>

          <button
            className="flex w-1/2 text-base bg-chuwa-blue hover:bg-gray-300 text-white justify-center items-center py-2 rounded-md transition-colors duration-300 focus:outline-none focus:shadow-outline"
            onClick={handleClick}
          >
            Go home
          </button>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
}
