import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { StatsProvider } from "../context/UserStatsContext.jsx";
import RightStats from "../components/RightStats/RightStats.jsx";
import SideNav from "../components/Nav/SideNav.jsx";
import styles from "./AppShell.module.css";

export default function AppShell() {
  const { pathname } = useLocation();
  const hideRight = pathname.startsWith("/app/profile");

  return (
    <StatsProvider>
      <div className={`${styles.shell} ${hideRight ? styles.noRight : ""}`}>
        <aside className={styles.left}>
          <SideNav />
        </aside>
        <main className={styles.content}>
          <Outlet />
        </main>
        {!hideRight && (
          <div className={styles.right}>
            <RightStats />
          </div>
        )}
      </div>
    </StatsProvider>
  );
}
