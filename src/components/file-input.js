import styled from "styled-components";

const Container = styled.div`
  margin: 1rem 0;
`;

const Heading = styled.h3`
  margin: 0;
  font-size: inherit;
  font-weight: inherit;
`;

const Label = styled.label`
  display: block;
  border: 1px solid ${(props) => props.theme.colors.text};
  padding: 0.75rem;
  text-align: center;
  text-transform: uppercase;
  margin: 0.5rem 0;
  width: 100%;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
    font-weight: 600;
    cursor: pointer;
  }

  @media (min-width: 450px) {
    width: 200px;
  }
`;

const Input = styled.input`
  display: none;
`;

const FileCount = styled.div`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Info = styled.span`
  font-size: 0.9rem;
  font-style: italic;
`;

const FileInput = ({
  name,
  label,
  heading,
  info,
  files,
  setFieldValue,
  ...props
}) => {
  return (
    <Container>
      <Heading>{heading}</Heading>
      <Label htmlFor={name} tabIndex={0}>
        {label}
      </Label>
      <Input
        type="file"
        id={name}
        name={name}
        onChange={(event) => setFieldValue(name, event.target.files)}
        {...props}
      />
      <FileCount>
        Załączono <b>{files.length}</b> plików
      </FileCount>
      <Info>{info}</Info>
    </Container>
  );
};

export default FileInput;
