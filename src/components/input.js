import styled from "styled-components";

const Container = styled.div`
  margin: 1rem 0;
`;

const TextInput = styled.input`
  display: block;
  border: 1px solid ${(props) => props.theme.colors.primary};
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
`;

const Label = styled.label``;

const Input = ({ name, value, label, handleChange, handleBlur, ...props }) => {
  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <TextInput
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />
    </Container>
  );
};

export default Input;
