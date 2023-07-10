type CustomerProfileItemProps = {
  title: string;
  content: React.ReactNode;
};

const CustomerProfileItem: React.FC<CustomerProfileItemProps> = ({
  title,
  content,
}) => {
  return (
    <div className="grid grid-cols-2 items-center">
      <span className="font-medium">{title}</span>
      <div>{content}</div>
    </div>
  );
};

export default CustomerProfileItem;
