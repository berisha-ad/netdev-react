type Props = {
  children: React.ReactNode;
};

const BorderBox = ({ children }: Props) => {
  return (
    <div className="custom-border custom-shadow rounded-2xl white-big-shadow p-8 max-sm:p-4 bg-white">
      {children}
    </div>
  );
};

export default BorderBox;
