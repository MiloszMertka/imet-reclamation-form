import styled from "styled-components";

import Input from "./input";
import Button from "./button";
import { useFormikContext } from "formik";
import { useCallback, useMemo } from "react";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 2.5rem 0;
`;

const CompanyData = () => {
  const { errors, touched, setFieldTouched } = useFormikContext();

  const buttonDisabled = useMemo(
    () =>
      errors.companyNIP ||
      errors.companyName ||
      !touched.companyNIP ||
      !touched.companyName,
    [
      errors.companyNIP,
      errors.companyName,
      touched.companyNIP,
      touched.companyName,
    ]
  );

  const handleNavigationFailure = useCallback(() => {
    setFieldTouched("companyNIP");
    setFieldTouched("companyName");
  }, [setFieldTouched]);

  return (
    <>
      <Input name="companyNIP" label="NIP firmy" />
      <Input name="companyName" label="Nazwa firmy" />
      <ButtonContainer>
        <Button
          link="/produkty"
          disabled={buttonDisabled}
          onFailure={handleNavigationFailure}
        >
          Dalej
        </Button>
      </ButtonContainer>
    </>
  );
};

export default CompanyData;
