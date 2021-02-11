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
  border: 1px solid
    ${(props) =>
      props.error && props.touched
        ? props.theme.colors.error
        : props.theme.colors.primary};
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

const TextContainer = styled.div`
  margin-left: 0.75rem;
`;

const Label = styled.label`
  color: ${(props) =>
    props.error && props.touched
      ? props.theme.colors.error
      : props.theme.colors.text};
`;

const Error = styled.div`
  color: ${(props) => props.theme.colors.error};
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const Checkbox = ({
  name,
  children,
  checked,
  setFieldValue,
  handleBlur,
  error,
  touched,
  ...props
}) => {
  return (
    <Container>
      <HiddenControl
        type="checkbox"
        id={`${name}_hidden`}
        name={name}
        checked={checked}
        disabled={true}
        {...props}
      />
      <VisibleControl
        id={name}
        onClick={() => setFieldValue(name, !checked)}
        onKeyDown={(event) =>
          (event.key === " " || event.key === "Enter") &&
          setFieldValue(name, !checked)
        }
        tabIndex={0}
        checked={checked}
        onBlur={handleBlur}
        error={error}
        touched={touched}
      >
        <Checkmark checked={checked} />
      </VisibleControl>
      <TextContainer>
        <Label htmlFor={`${name}_hidden`} error={error} touched={touched}>
          {children}
        </Label>
        {error && touched && <Error>{error}</Error>}
      </TextContainer>
    </Container>
  );
};

export default Checkbox;
