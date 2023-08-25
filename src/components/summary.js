import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  padding: 2rem 0;
`;

const Text = styled.p`
  text-align: center;
`;

const Summary = () => {
  const history = useHistory();

  return (
    <Container>
      <Text>
        Dziękujemy za kontakt. Twoje zgłoszenie zostało przekazane do
        odpowiedniego działu, a na Twój adres e-mail zostało wysłane
        potwierdzenie złożonego zgłoszenia.
      </Text>
      <Text>
        Do przesyłki prosimy załączyć numer reklamacji/zwrotu:{" "}
        <strong>{history.location.state.reclamationCode}</strong>
      </Text>
    </Container>
  );
};

export default Summary;
