import styled from "styled-components";

const Container = styled.div`
  margin: 1rem 0;
`;

const TextInput = styled.textarea`
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
  resize: vertical;
  font-family: inherit;
`;

const Label = styled.label``;

const Error = styled.span`
  color: ${(props) => props.theme.colors.error};
  font-size: 0.875rem;
`;

const Textarea = ({
  name,
  label,
  value,
  handleChange,
  handleBlur,
  error,
  touched,
  ...props
}) => {
  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <TextInput
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error}
        touched={touched}
        {...props}
      />
      {error && touched && <Error>{error}</Error>}
    </Container>
  );
};

export default Textarea;
