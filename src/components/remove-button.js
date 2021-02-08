import styled from "styled-components";

import { ReactComponent as CrossIcon } from "../assets/images/svg/cross-icon.svg";

const Container = styled.div`
  cursor: pointer;
`;

const Cross = styled(CrossIcon)`
  width: 1.5rem;
  height: 1.5rem;
  stroke: #b72c30;
  fill: #b72c30;
`;

const RemoveButton = ({ handleClick, ...props }) => {
  return (
    <Container
      onClick={handleClick}
      onKeyDown={(event) =>
        (event.key === " " || event.key === "Enter") && handleClick()
      }
      tabIndex={0}
      {...props}
    >
      <Cross />
    </Container>
  );
};

export default RemoveButton;
