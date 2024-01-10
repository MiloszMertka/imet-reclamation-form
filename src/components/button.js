import styled from "styled-components";
import { Link } from "react-router-dom";
import { useCallback } from "react";

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
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

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
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

const Button = ({ link, onFailure, children, disabled, ...props }) => {
  const handleButtonLinkClick = useCallback(
    (event) => {
      if (disabled) {
        event.preventDefault();
        onFailure();
      }
    },
    [disabled, onFailure]
  );

  return link ? (
    <ButtonLink
      as={Link}
      to={link}
      disabled={disabled}
      onClick={(event) => handleButtonLinkClick(event)}
      {...props}
    >
      {children}
    </ButtonLink>
  ) : (
    <Submit as="button" type="submit" disabled={disabled} {...props}>
      {children}
    </Submit>
  );
};

export default Button;
