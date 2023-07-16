import FooterItemProps from "@/utils/types/FooterItem";
import {AiOutlineFacebook, AiOutlineInstagram, AiOutlinePhone } from "react-icons/ai"
import {CiLocationOn} from "react-icons/ci";

const footerItems: FooterItemProps[] = [
  {
    icon: <AiOutlineInstagram />,
    profile: "@essentia.au",
    href: '/',
  },
  {
    icon: <AiOutlineFacebook />,
    profile: "@essentia.au",
    href: '/'
    
  },
  {
    icon: <AiOutlinePhone />,
    profile: "+61 456 1234",
    href: '/'
  },
  {
    icon: <CiLocationOn />,
    profile: "120 A'Beckett Street",
    href: '/'
  }
]

export default footerItems;