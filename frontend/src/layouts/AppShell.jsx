import { Outlet, useLocation } from "react-router-dom";
import SideNav from "../components/Nav/SideNav.jsx";
import TopStatusBar from "../components/UI/TopStatusBar.jsx";
import s from "./AppShell.module.css";

export default function AppShell() {
  const handleLogout = () => {
    window.location.href = "/login";
  };

  const location = useLocation();
  const hideStatus = location.pathname.includes("/app/profile"); // hide on profile page

  return (
    <div className={s.grid}>
      <SideNav onLogout={handleLogout} />
      <main className={s.content}>
        {!hideStatus && <TopStatusBar />} {/* ✅ visible everywhere except profile */}
        <Outlet />
      </main>
    </div>
  );
}