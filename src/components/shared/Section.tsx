import Container from "./Container";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Section = ({ children, className }: Props) => {
  return (
    <section className={`py-10 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
};

export default Section;
