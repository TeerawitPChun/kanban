import { Fragment, useState, useEffect, useContext } from "react";
import useSWR from "swr";

import Dashboard from "@/components/dashboard";
import fetcher from "@/utils/fetcher";
import Context from "@/store/context";

function DashboardPage() {
  const [isLoading, setLoading] = useState(true);
  const { data, error } = useSWR("api/board", fetcher);
  const context = useContext(Context);
  const user = context.currentUser || { name: "PLACEHOLDER USER" };

  useEffect(() => {
    if (data) {
      context.setBoardList(data.boards)
      setLoading(false);
    }
  }, [data]);

  if (error) {
    return <div>Failed</div>;
  }

  const loadingPage = <div>Loading...</div>;

  return <div>{isLoading ? loadingPage : <div>Hello, {user.name}!</div>}</div>;
}

export default DashboardPage;
