import { useSelector } from "react-redux";
import Header from "./Header";
import Main from "./Main";

const Home = ({ userLoggedIn }) => {
  const user = useSelector((state) => state?.user?.userInfo);
  console.log("Home user: ", user);
  return (
    <div>
      <Header userLoggedIn={userLoggedIn} />
      <Main />
    </div>
  );
};

export default Home;
