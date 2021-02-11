import styled from "styled-components";

import Input from "./input";
import Button from "./button";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 2.5rem 0;
`;

const CompanyData = ({
  nip,
  name,
  handleChange,
  handleBlur,
  errors,
  touched,
}) => {
  return (
    <>
      <Input
        type="text"
        name="companyNIP"
        label="NIP firmy"
        value={nip}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.companyNIP}
        touched={touched.companyNIP}
      />
      <Input
        type="text"
        name="companyName"
        label="Nazwa firmy"
        value={name}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.companyName}
        touched={touched.companyName}
      />
      <ButtonContainer>
        <Button link="/produkty">Dalej</Button>
      </ButtonContainer>
    </>
  );
};

export default CompanyData;
