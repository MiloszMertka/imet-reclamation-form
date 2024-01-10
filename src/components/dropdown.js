import styled from "styled-components";

import selectArrow from "../assets/images/svg/select-arrow.svg";
import { ErrorMessage, useField } from "formik";

const Container = styled.div`
  margin: 1rem 0;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 20%;
    right: 1.5rem;
    background-image: url(${selectArrow});
    background-repeat: no-repeat;
    background-size: cover;
    width: 12px;
    height: 12px;
    pointer-events: none;
  }
`;

const Label = styled.label``;

const Select = styled.select`
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
  appearance: none;
`;

const Error = styled.span`
  color: ${(props) => props.theme.colors.error};
  font-size: 0.875rem;
`;

const Dropdown = ({ options, name, label, ...props }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <Select
        id={name}
        {...field}
        error={meta.error}
        touched={meta.touched}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <Error>
        <ErrorMessage name={name} />
      </Error>
    </Container>
  );
};

export default Dropdown;
