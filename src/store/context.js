import { createContext, useState, useEffect } from "react";

const Context = createContext({
  notification: null, // { title, message, status }
  showNotification: function (notificationData) {},
  hideNotification: function () {},
  user: null,
  setUser: function (userData) {},
  resetUser: function () {},
  boardList: [],
  setBoardList: function (boardListData) {},
  resetBoardList: function () {},
  isSidebarOpen: true,
  openSidebar: function () {},
  closeSidebar: function () {},
});

export function ContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState();
  const [currentUser, setCurrentUser] = useState({ name: "steve" });
  const [boardList, setBoardList] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState();

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  function showNotificationHandler(notificationData) {
    setActiveNotification(notificationData);
  }
  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  function setUserHandler(userData) {
    setCurrentUser(userData);
  }
  function resetUserHandler() {
    setCurrentUser(null);
  }

  function setBoardListHandler(boardListData) {
    setBoardList(boardListData);
  }
  function resetBoardListHandler() {
    setBoardList([]);
  }

  function openSidebarHandler() {
    setIsSidebarOpen(true);
  }
  function closeSidebarHandler() {
    setIsSidebarOpen(false);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
    user: currentUser,
    setUser: setUserHandler,
    resetUser: resetUserHandler,
    boardList: boardList,
    setBoardList: setBoardListHandler,
    resetBoardList: resetBoardListHandler,
    isSidebarOpen: isSidebarOpen,
    openSidebar: openSidebarHandler,
    closeSidebar: closeSidebarHandler,
  };

  return <Context.Provider value={context}>{props.children}</Context.Provider>;
}

export default Context;
