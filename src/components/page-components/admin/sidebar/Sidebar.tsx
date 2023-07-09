import { SlGraph } from "react-icons/sl";
import SidebarItem from "./SidebarItem";

type SidebarData = {
  title: string;
  logo?: React.ReactNode;
};

const sidebarDatas: SidebarData[] = [
  {
    title: "Products",
  },
  {
    logo: <SlGraph />,
    title: "Statistics",
  },
  {
    title: "Orders",
  },
  {
    title: "Settings",
  },
];


const Sidebar = () => {
  return (
    <div className="h-full w-full border-r flex flex-col p-10">
      <div className="flex flex-col gap-y-7">
        {sidebarDatas.map((data, index) => (
          <SidebarItem key={index} {...data} />
        ))}
      </div>
    </div>
  );
};


export default Sidebar;
export type {SidebarData};