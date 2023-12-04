import { useContext } from "react";

import Header from "./header";
import Sidebar from "../sidebar/sidebar";
import Context from "@/store/context";
import { Box, Container } from "@mui/material";

function Layout(props) {
  const context = useContext(Context);
  const currentUser = context.currentUser;
  const boardList = context.boardList;
  const isSidebarOpen = context.isSidebarOpen;
  const openSidebar = context.openSidebar;
  const closeSidebar = context.closeSidebar;
  const resetUser = context.resetUser;

  const drawerWidth = 700;

  return (
    <Box
      sx={{ display: "flex-wrap", flexDirection: "column" }}
      className="h-100"
    >
      <Header
        user={currentUser}
        handleDrawerOpen={openSidebar}
        handleLogout={resetUser}
        open={isSidebarOpen}
      />
      <Box sx={{ display: "flex-wrap" }} height="100%">
        <Sidebar
          width={drawerWidth}
          boards={boardList}
          open={isSidebarOpen}
          handleDrawerClose={closeSidebar}
        />
        <main style={{ height: "100vh" }}>{props.children}</main>
      </Box>
      {/* <Notification /> */}
    </Box>
  );
}

export default Layout;
