import styled from "styled-components";

import { ReactComponent as Logo } from "../assets/images/svg/logo.svg";

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};
`;

const StyledLogo = styled(Logo)`
  max-height: 40px;
`;

const Header = () => {
  return (
    <Container>
      <a href="https://phuimet.pl" target="_blank" rel="noopener noreferrer">
        <StyledLogo />
      </a>
    </Container>
  );
};

export default Header;
