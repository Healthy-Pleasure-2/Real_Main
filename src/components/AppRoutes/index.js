import { Route, Routes } from "react-router-dom";
import Main from "../../Pages/Main";
import Todo from "../../Pages/Todo";
import Community from "../../Pages/Community";
import GroupCreate from "../../Pages/GroupCreate";
import GroupPage from "../../Pages/GroupPage";
import Ask from "../../Pages/Ask";
import Mypage from "../../Pages/Mypage";
import Signup from "../../Pages/Signup";
import IdPw from "../../Pages/Id_pw";

function AppRoutes({ isLoggedIn }) {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/todo" element={<Todo />}></Route>
<<<<<<< HEAD
      <Route path="/community" element={<Community />}></Route>
      <Route path="/groupCreate" element={<GroupCreate />}></Route>
      <Route path="/groupPage/:groupID" element={<GroupPage />}></Route>
=======
      <Route
        path="/community"
        element={<Community isLoggedIn={isLoggedIn} />}
      ></Route>
      <Route path="/groupCreate" element={<GroupCreate />}></Route>
      <Route
        path="/groupPage/:groupID"
        element={<GroupPage isLoggedIn={isLoggedIn} />}
      ></Route>
>>>>>>> aeb559a2c24027bd715f52ba69dedf488b4efa09
      <Route path="/ask" element={<Ask />}></Route>
      <Route path="/mypage" element={<Mypage />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/idPw" element={<IdPw />}></Route>
    </Routes>
  );
}

export default AppRoutes;
