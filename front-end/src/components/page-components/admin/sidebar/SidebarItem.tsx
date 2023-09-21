import Link from "next/link";
import { ISidebarItem } from "./Sidebar";

const SidebarItem: React.FC<ISidebarItem> = (props) => {

  return (
    <Link href={props.href} className="w-full flex flex-col justify-between">
      <div className="flex flex-row items-center gap-x-2 w-full">
        <span className="text-2xl">{props.logo}</span>
        <span>{props.title}</span>
      </div>
    </Link>
  );
};


export default SidebarItem;