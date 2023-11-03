import AppRoutes from "./AppRoutes";

function PageContent({ isLoggedIn, sessiondata }) {
  return (
    <div id="PageContent">
      <AppRoutes isLoggedIn={isLoggedIn} sessiondata={sessiondata} />
    </div>
  );
}

export default PageContent;
