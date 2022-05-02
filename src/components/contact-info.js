import styled from "styled-components";

import Input from "./input";
import Checkbox from "./checkbox";
import Button from "./button";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2.5rem 0;

  @media (min-width: 450px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const ContactInfo = ({
  email,
  name,
  phoneNumber,
  handleChange,
  handleBlur,
  errors,
  touched,
  setFieldValue,
  regulationsAgreement,
  privacyPolicyAgreement,
  isSubmitting,
  isValid,
}) => {
  return (
    <>
      <Input
        type="text"
        name="email"
        label="Adres e-mail"
        value={email}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.email}
        touched={touched.email}
      />
      <Input
        type="text"
        name="name"
        label="Imię i nazwisko"
        value={name}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.name}
        touched={touched.name}
      />
      <Input
        type="text"
        name="phoneNumber"
        label="Numer kontaktowy"
        value={phoneNumber}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.phoneNumber}
        touched={touched.phoneNumber}
      />
      <Checkbox
        name="regulationsAgreement"
        checked={regulationsAgreement}
        setFieldValue={setFieldValue}
        handleBlur={handleBlur}
        error={errors.regulationsAgreement}
        touched={touched.regulationsAgreement}
      >
        Oświadczam, że akceptuję warunki wystawienia faktury korygującej przy
        zwrocie towaru określone w{" "}
        <a
          href="https://b2b.imet.pl/pl/page/regulamin"
          target="_blank"
          rel="noopener noreferrer"
        >
          Regulaminie platformy B2B
        </a>
        .
      </Checkbox>
      <Checkbox
        name="privacyPolicyAgreement"
        checked={privacyPolicyAgreement}
        setFieldValue={setFieldValue}
        handleBlur={handleBlur}
        error={errors.privacyPolicyAgreement}
        touched={touched.privacyPolicyAgreement}
      >
        Oświadczam, że zapoznałem/am się z{" "}
        <a
          href="https://b2b.imet.pl/pl/page/polityka-prywatnosci"
          target="_blank"
          rel="noopener noreferrer"
        >
          Polityką Prywatności i Cookies
        </a>
        .
      </Checkbox>
      <ButtonContainer>
        <Button link="/produkty">Wstecz</Button>
        <Button disabled={isSubmitting}>Wyślij</Button>
      </ButtonContainer>
    </>
  );
};

export default ContactInfo;
