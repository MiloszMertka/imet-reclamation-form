import styled from "styled-components";

import { ReactComponent as CheckmarkIcon } from "../assets/images/svg/checkmark-icon.svg";
import { ErrorMessage, useField, useFormikContext } from "formik";

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

const Checkbox = ({ name, children, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta, helpers] = useField(name);

  return (
    <Container>
      <HiddenControl
        type="checkbox"
        id={`${name}_hidden`}
        name={name}
        checked={field.value}
        disabled={true}
        {...props}
      />
      <VisibleControl
        id={name}
        onClick={() => setFieldValue(name, !field.value)}
        onKeyDown={(event) =>
          (event.key === " " || event.key === "Enter") &&
          setFieldValue(name, !field.value)
        }
        tabIndex={0}
        checked={field.value}
        onBlur={field.onBlur}
        error={meta.error}
        touched={meta.touched}
      >
        <Checkmark checked={field.value} />
      </VisibleControl>
      <TextContainer>
        <Label
          htmlFor={`${name}_hidden`}
          error={meta.error}
          touched={meta.touched}
        >
          {children}
        </Label>
        <Error>
          <ErrorMessage name={name} />
        </Error>
      </TextContainer>
    </Container>
  );
};

export default Checkbox;
