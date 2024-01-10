import styled from "styled-components";
import { ErrorMessage, useField } from "formik";

const Container = styled.div`
  margin: 1rem 0;
`;

const TextInput = styled.input`
  display: block;
  border: 1px solid
    ${(props) =>
      props.error && props.touched
        ? props.theme.colors.error
        : props.theme.colors.primary};
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
`;

const Label = styled.label``;

const Error = styled.span`
  color: ${(props) => props.theme.colors.error};
  font-size: 0.875rem;
`;

const Input = ({ name, label, ...props }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <TextInput
        id={name}
        {...field}
        error={meta.error}
        touched={meta.touched}
        {...props}
      />
      <Error>
        <ErrorMessage name={name} />
      </Error>
    </Container>
  );
};

export default Input;
