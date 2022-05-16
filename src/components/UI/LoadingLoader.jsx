import styled from "styled-components";
import PacmanLoader from "react-spinners/PacmanLoader";
import theme from "../../styles/theme";

const LoadingLoader = ({ text, noti }) => {
  return (
    <LoaderLayout>
      <div className="loader">
        <PacmanLoader speedMultiplier={2} color={theme.colors.main} />
      </div>
      <div className="text">
        <p>{text}</p>
        <p className="noti">{noti}</p>
      </div>
    </LoaderLayout>
  );
};

const LoaderLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 100%;

  .loader {
    padding: 0 40px 20px 0px;
  }
  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    gap: 10px;
  }

  .noti {
    color: ${({ theme }) => theme.colors.grey40};
  }
`;
export default LoadingLoader;