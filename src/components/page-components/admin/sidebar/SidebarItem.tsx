import { SidebarData } from "./Sidebar";

const SidebarItem: React.FC<SidebarData> = (props) => {

  return (
    <div className="w-full flex flex-col justify-between">
      <div className="flex flex-row items-center gap-x-2 w-full">
        <span className="text-2xl">{props.logo}</span>
        <span>{props.title}</span>
      </div>
    </div>
  );
};


export default SidebarItem;