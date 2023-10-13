import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../../Pages/Main";
import Todo from "../../Pages/Todo";
import Community from "../../Pages/Community";
import GroupCreate from "../../Pages/GroupCreate";
import GroupPage from "../../Pages/GroupPage";
// import Ask from "../../Pages/Ask";
// import Mypage from "../../Pages/Mypage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/todo" element={<Todo />}></Route>
      {/*  페이지 확인용으로 임시 위치 */}
      <Route path="/community" element={<GroupPage />}></Route>
      <Route path="/ask" element={<GroupCreate />}></Route>
      <Route path="/mypage" element={<Community />}></Route>
    </Routes>
  );
}

export default AppRoutes;
