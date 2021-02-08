import styled from "styled-components";

const Container = styled.footer`
  border-top: 1px solid ${(props) => props.theme.colors.primary};
`;

const Text = styled.p`
  text-align: center;
  color: ${(props) => props.theme.colors.primary};
  font-size: 0.875rem;
`;

const Footer = () => {
  return (
    <Container>
      <Text>
        &copy; {new Date().getFullYear()} IMET | Wszelkie prawa zastrzeżone
      </Text>
    </Container>
  );
};

export default Footer;
