import styled from "styled-components";
import { Link } from "react-router-dom";

const ButtonLink = styled.a`
  display: block;
  color: inherit;
  text-decoration: none;
  border: 1px solid ${(props) => props.theme.colors.text};
  padding: 0.75rem;
  text-align: center;
  text-transform: uppercase;
  margin: 0.5rem 0;
  width: 100%;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
    font-weight: 600;
  }

  @media (min-width: 450px) {
    width: 200px;
  }
`;

const Submit = styled(ButtonLink)`
  background-color: transparent;
  font-size: inherit;
  cursor: pointer;
`;

const Button = ({ link, children }) => {
  return link ? (
    <ButtonLink as={Link} to={link}>
      {children}
    </ButtonLink>
  ) : (
    <Submit as="button" type="submit">
      {children}
    </Submit>
  );
};

export default Button;
