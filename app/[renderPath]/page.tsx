"use client";
import styles from "./page.module.css";
import { useModal } from "@/context/modals/modalProvider";
import { useEffect, useState } from "react";
import { useListData } from "@/context/listData/listDataProvider";
import { useParams } from "next/navigation";
import { routes, RouteTypes } from "../navigation/route";
import CardRenderer from "./renderItems/cardRenderer/cardRendered";
import NotFound from "./renderItems/notFound/notFound";
import { ListItem } from "@/context/listData/list.model";
import Loader from "@/components/load/load";

export interface BlogEntry {
  active: boolean;
  category: string;
  created_at: string; // ISO 8601 date string, consider using `Date` if you'll parse this to a Date object
  created_by: string; // UUID format
  des: string;
  keywords: string;
  thumbnail: string;
  title: string;
  updated_at: string; // ISO 8601 date string, consider using `Date` if you'll parse this to a Date object
}

const RenderItem: React.FC<{ item: RouteTypes; data?: ListItem[] }> = ({
  item,
  data,
}) => {
  switch (item.renderType) {
    case "cards":
      return (
        <CardRenderer
          data={data}
          switchEndPoint={item.switchEndPoint}
          deleteEndPoint={item.deleteEndPoint}
        />
      );
    default:
      return <NotFound />;
  }
};

const RenderDashboardElements = () => {
  const params = useParams();
  const type =
    typeof params.renderPath === "string"
      ? params.renderPath
      : params.renderPath[0];
  const routerObj: RouteTypes = routes.filter(
    (i: RouteTypes) => i.link?.split("/")[1] === type
  )[0];
  const { fetchList, getItemsByType, items, setSelectedRouterObj } =
    useListData();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ListItem[]>();

  const fetchData = async () => {
    setLoading(true);
    if (routerObj.fetchEndPoint) {
      await fetchList(routerObj.fetchEndPoint, type);
      setLoading(false);
    }
  };

  useEffect(() => {
    setSelectedRouterObj(routerObj);
  }, [routerObj]);

  useEffect(() => {
    const data = getItemsByType(type);
    setData(data);
    if (data.length == 0) {
      fetchData();
    }
  }, [type, items]);

  return (
    <div className={styles.wrapper}>
      {loading && <Loader />}
      {!loading && <RenderItem item={routerObj} data={data} />}
    </div>
  );
};

export default RenderDashboardElements;
