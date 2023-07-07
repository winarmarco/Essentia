import React from "react";

type SectionProps = {children?: React.ReactNode; className?: string};

const Section: React.FC<SectionProps> = ({children, className}) => {
  return <section className={className}>
    {children}
  </section>;
};

export default Section;
