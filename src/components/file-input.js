import styled from "styled-components";

const Container = styled.div`
  margin: 1rem 0;
`;

const Label = styled.label``;

const Input = styled.input`
  display: block;
  font-size: 1rem;
  padding: 0.5rem 1rem 0.5rem 0;
  margin-top: 0.5rem;
`;

const FileInput = ({ name, label, setFieldValue, ...props }) => {
  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <Input
        type="file"
        id={name}
        name={name}
        onChange={(event) => setFieldValue(name, event.target.files[0])}
        {...props}
      />
    </Container>
  );
};

export default FileInput;
