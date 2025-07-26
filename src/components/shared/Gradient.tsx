type Props = {
  children: React.ReactNode;
};

const Gradient = ({ children }: Props) => {
  return (
    <div className="gradient">
      <div className="gradient-t">{children}</div>
    </div>
  );
};

export default Gradient;
