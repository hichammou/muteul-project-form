import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <>
      <div className="main">
        <div className="gradient" />
      </div>
      <main className="app relative">
        <Header />
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
