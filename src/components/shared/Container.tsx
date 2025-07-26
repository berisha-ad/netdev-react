type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="max-w-7xl mx-auto px-8 h-full">{children}</div>;
};

export default Container;
