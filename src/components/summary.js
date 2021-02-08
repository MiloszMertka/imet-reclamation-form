import styled from "styled-components";

const Container = styled.div`
  padding: 2rem 0;
`;

const Text = styled.p`
  text-align: center;
`;

const Summary = () => {
  return (
    <Container>
      <Text>
        Dziękujemy za kontakt. Twoje zgłoszenie zostało przekazane do
        odpowiedniego działu, a na Twój adres e-mail zostało wysłane
        potwierdzenie złożonego zgłoszenia.
      </Text>
    </Container>
  );
};

export default Summary;
