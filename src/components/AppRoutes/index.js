import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../../Pages/Main";
import Todo from "../../Pages/Todo";
import Community from "../../Pages/Community";
import GroupCreate from "../../Pages/GroupCreate";
import GroupPage from "../../Pages/GroupPage";
import Ask from "../../Pages/Ask";
// import Mypage from "../../Pages/Mypage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/todo" element={<Todo />}></Route>
      <Route path="/community" element={<Community />}></Route>
      <Route path="/GroupCreate" element={<GroupCreate />}></Route>
      <Route path="/GroupPage" element={<GroupPage />}></Route>
      <Route path="/Ask" element={<Ask />}></Route>
    </Routes>
  );
}

export default AppRoutes;
