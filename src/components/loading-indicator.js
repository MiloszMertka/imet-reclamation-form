import styled, { useTheme } from "styled-components";
import BeatLoader from "react-spinners/BeatLoader";

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(80, 80, 80, 0.3);
  align-items: center;
  justify-content: center;
  z-index: 1;
  display: ${(props) => (props.isLoading ? "flex" : "none")};
`;

const LoadingIndicator = ({ isLoading }) => {
  const theme = useTheme();

  return (
    <Container isLoading={isLoading}>
      <BeatLoader
        loading={isLoading}
        color={theme.colors.text}
        size={25}
        margin={5}
      />
    </Container>
  );
};

export default LoadingIndicator;
