import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../../Pages/Main";
import Todo from "../../Pages/Todo";
import Community from "../../Pages/Community";
import GroupCreate from "../../Pages/GroupCreate";
import GroupPage from "../../Pages/GroupPage";
// import Ask from "../../Pages/Ask";
import Mypage from "../../Pages/Mypage";
import Singup from "../../Pages/Singup";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/todo" element={<Todo />}></Route>
      <Route path="/community" element={<Community />}></Route>
      <Route path="/GroupCreate" element={<GroupCreate />}></Route>
      <Route path="/GroupPage/:groupID" element={<GroupPage />}></Route>
      <Route path="/Mypage" element={<Mypage />}></Route>
      <Route path="/Singup" element={<Singup />}></Route>
    </Routes>
  );
}

export default AppRoutes;
