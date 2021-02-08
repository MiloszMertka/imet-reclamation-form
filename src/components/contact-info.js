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
  setFieldValue,
  regulationsAgreement,
  privacyPolicyAgreement,
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
      />
      <Input
        type="text"
        name="name"
        label="Imię i nazwisko"
        value={name}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
      <Input
        type="text"
        name="phoneNumber"
        label="Numer kontaktowy"
        value={phoneNumber}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
      <Checkbox
        name="regulationsAgreement"
        checked={regulationsAgreement}
        setFieldValue={setFieldValue}
      >
        Oświadczam, że akceptuję warunki wystawienia faktury korygującej przy
        zwrocie towaru określone w{" "}
        <a
          href="https://b2b.phuimet.pl/pl/page/regulamin"
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
      >
        Oświadczam, że zapoznałem/am się z{" "}
        <a
          href="https://b2b.phuimet.pl/pl/page/polityka-prywatnosci"
          target="_blank"
          rel="noopener noreferrer"
        >
          Polityką Prywatności i Cookies
        </a>
        .
      </Checkbox>
      <ButtonContainer>
        <Button link="/produkty">Wstecz</Button>
        <Button>Wyślij</Button>
      </ButtonContainer>
    </>
  );
};

export default ContactInfo;
