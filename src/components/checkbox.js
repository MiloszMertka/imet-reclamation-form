import styled from "styled-components";

import { ReactComponent as CheckmarkIcon } from "../assets/images/svg/checkmark-icon.svg";

const Container = styled.div`
  margin: 1rem 0;
  display: flex;
  align-items: flex-start;
  position: relative;
`;

const HiddenControl = styled.input`
  visibility: hidden;
  pointer-events: none;
`;

const VisibleControl = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border: 1px solid ${(props) => props.theme.colors.primary};
  position: absolute;
  top: 0.25rem;
  background-color: ${(props) =>
    props.checked ? props.theme.colors.primary : "transparent"};
  cursor: pointer;
`;

const Checkmark = styled(CheckmarkIcon)`
  fill: ${(props) => (props.checked ? "#ffffff" : "transparent")};
  pointer-events: none;
  position: absolute;
  top: calc(-50% + 2px);
  left: calc(-50% + 2px);
`;

const Label = styled.label`
  margin-left: 0.75rem;
`;

const Checkbox = ({ name, children, checked, setFieldValue, ...props }) => {
  return (
    <Container>
      <HiddenControl
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        disabled={true}
        {...props}
      />
      <VisibleControl
        onClick={() => setFieldValue(name, !checked)}
        onKeyDown={(event) =>
          (event.key === " " || event.key === "Enter") &&
          setFieldValue(name, !checked)
        }
        tabIndex={0}
        checked={checked}
      >
        <Checkmark checked={checked} />
      </VisibleControl>
      <Label htmlFor={name}>{children}</Label>
    </Container>
  );
};

export default Checkbox;
