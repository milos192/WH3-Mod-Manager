import React, { RefObject } from "react";
import { useAppSelector } from "../hooks";
import Sidebar from "./Sidebar";
import ModRows from "./ModRows";
import Categories from "./Categories";
import ModTagPicker from "./ModTagPicker";

type MainProps = {
  scrollElement: RefObject<HTMLDivElement>;
};
const Main = (props: MainProps) => {
  const currentTab = useAppSelector((state) => state.app.currentTab);
  return (
    <div className="pl-[58px]">
      {(currentTab == "categories" && <Categories></Categories>) || (
        <div className="flex grid-cols-12 text-white max-w-[100rem] mx-auto">
          <div className="col-span-10 flex-1">
            <ModRows scrollElement={props.scrollElement} />
          </div>
          <div className="m-3 col-span-2 relative">
            <Sidebar />
          </div>
          <ModTagPicker></ModTagPicker>
        </div>
      )}
    </div>
  );
};

export default Main;
