import styled from "styled-components";

import { ReactComponent as PlusIcon } from "../assets/images/svg/plus-icon.svg";

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0.5rem auto;

  &:hover {
    span {
      text-decoration: underline;
    }

    svg {
      fill: ${(props) => props.theme.colors.text};

      line {
        stroke: #ffffff;
      }
    }
  }
`;

const Label = styled.span`
  padding: 0.5rem;
`;

const AddButton = ({ children, handleClick, ...props }) => {
  return (
    <Container
      onClick={handleClick}
      onKeyDown={(event) =>
        (event.key === " " || event.key === "Enter") && handleClick()
      }
      tabIndex={0}
      {...props}
    >
      <PlusIcon />
      <Label>{children}</Label>
    </Container>
  );
};

export default AddButton;
