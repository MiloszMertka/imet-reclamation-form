import styled from "styled-components";

import ReclamationForm from "./components/reclamation-form";
import Header from "./components/header";
import Footer from "./components/footer";

const Container = styled.main`
  padding: 0 1rem;
  max-width: 800px;
  margin: auto;
  overflow-x: hidden;
`;

const App = () => {
  return (
    <>
      <Header />
      <Container>
        <ReclamationForm />
        <Footer />
      </Container>
    </>
  );
};

export default App;
