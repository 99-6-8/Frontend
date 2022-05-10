import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store/configStore";
import theme from "./styles/theme";
import App from "./App";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import FeedBack from "./pages/FeedBack";
import FeedBackDetail from "./pages/FeedBackDetail";
import Interview from "./pages/Interview";
import InterviewTopic from "./pages/InterviewTopic";
import InterviewRecording from "./pages/InterviewRecording";
import KakaoRedirect from "./pages/KakaoRedirect";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/" element={<App />}>
              <Route path="feedback" element={<FeedBack />} />
              <Route path="feedback/:cardId" element={<FeedBackDetail />} />
              <Route path="interview" element={<Interview />}>
                <Route path="" element={<InterviewTopic />} />
                <Route path="recording" element={<InterviewRecording />} />
              </Route>
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/user/kakao/callback" element={<KakaoRedirect />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
