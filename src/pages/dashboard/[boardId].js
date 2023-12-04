import { Fragment, useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

import Dashboard from "@/components/dashboard";
import fetcher from "@/utils/fetcher";

function DashboardPage() {
  const router = useRouter();
  const { boardId } = router.query;
  const [board, setBoard] = useState(null);
  const [isLoading, setLoading] = useState(true);
  console.log(boardId);
  const { data, error } = useSWR(`/api/board/${boardId}`, fetcher);

  useEffect(() => {
    if (data) {
      console.log(JSON.stringify(data));
      setBoard(data.board);
      setLoading(false);
    }
  }, [data]);

  if (error) {
    return <div>Failed</div>;
  }

  const loadingPage = <div>Loading...</div>;

  return isLoading ? loadingPage : <Dashboard data={board}></Dashboard>;
}

export default DashboardPage;
