import React from "react";
import Container from "../Container";
import footerItems from "@/utils2/constants/footer";
import FooterItem from "./FooterItem";

const Footer: React.FC = () => {
  return (
    <footer>
      <Container className="py-20 grid grid-cols-2 grid-rows-2 gap-y-10">
        {footerItems.map((footerItem, index) => {
          return <FooterItem key={index} {...footerItem} />;
        })}
      </Container>
    </footer>
  );
};

export default Footer;
