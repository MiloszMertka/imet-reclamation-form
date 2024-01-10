import styled from "styled-components";

import Input from "./input";
import Checkbox from "./checkbox";
import Button from "./button";
import { useFormikContext } from "formik";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2.5rem 0;

  @media (min-width: 450px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const ContactInfo = () => {
  const { isSubmitting } = useFormikContext();

  return (
    <>
      <Input name="email" label="Adres e-mail" />
      <Input name="name" label="Imię i nazwisko" />
      <Input name="phoneNumber" label="Numer kontaktowy" />
      <Checkbox name="regulationsAgreement">
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
      <Checkbox name="privacyPolicyAgreement">
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
