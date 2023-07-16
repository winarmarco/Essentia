import FooterItemProps from "@/utils/types/FooterItem"
import Link from "next/link";

const FooterItem: React.FC<FooterItemProps> = ({icon, profile, href}) => {
  return <Link href={href} className='flex flex-row items-center'>
    <span className='text-2xl'>{icon}</span>
    <span className='ml-2'>{profile}</span>
  </Link>
}

export default FooterItem;