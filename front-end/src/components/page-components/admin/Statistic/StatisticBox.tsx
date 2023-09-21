type StatisticBoxProps = {
  title: string;
  children?: React.ReactNode;
  className?: string | "";
  titleClass?: string | "";
  contentClass?: string | "";
};

const StatisticBox: React.FC<StatisticBoxProps> = (props) => {
  return (
    <div
      className={`flex flex-col border border-gray-400 p-4 w-full ${props.className}`}
    >
      <span className={`${props.titleClass}`}>{props.title}</span>
      <span className={`text-2xl font-bold h-full ${props.contentClass}`}>
        {props.children}
      </span>
    </div>
  );
};

export default StatisticBox;
