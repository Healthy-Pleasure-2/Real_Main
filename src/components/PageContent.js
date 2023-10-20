import AppRoutes from "./AppRoutes";

function PageContent({ isLoggedIn }) {
  return (
    <div id="PageContent">
      <AppRoutes isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default PageContent;
