import "./App.css";

import PageContent from "./components/PageContent";
import SideMenu from "./components/SideMenu";
import SideContent from "./components/SideCotent";

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1"
/>;

function App() {
  return (
    <div className="App">
      <div className="wrap">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
        <SideContent></SideContent>
      </div>
    </div>
  );
}
export default App;
