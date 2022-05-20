import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import bannerBackground from "../../assets/banner.png";
import bannerLogo from "../../assets/bannerLogo.svg";

const DUMMY_CONTENTS = [
  {
    badge: "윌비 소개",
    title: "화상면접 연습 플랫폼 “Willbe”를 소개합니다.",
    content:
      "화상면접을 준비하면서 어려움을 겪고 계신가요? \n \n 윌비와 함께 하면 신입개발자도 면접준비 걱정 끝! \n \n  윌비와 함께 준비하세요😄",
  },
  {
    badge: "Event",
    title: "윌비의 주간 면접왕에 도전해보세요❤️‍🔥",
    content:
      "2주간의 테스트 기간동안 주간 면접왕이 되신분들에게는 상품을 드립니다💝 \n \n 괜찮아요😉 면접왕에 들지 않아도, 소정의 상품을 지급할 예정이오니, 여러분의 면접 기술을 뽐내고 상품도 받아가세요🎉",
  },
];

const Banner = () => {
  const slider = useRef(null);

  const nextBtn = () => {
    slider.current.slickNext();
  };

  const prevBtn = () => {
    slider.current.slickPrev();
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToScroll: 1,
    slidesToShow: 1,
    fade: true,
    centerMode: false,
    centerPadding: "10px",
  };

  return (
    <BannerContainer>
      <div className="contentsWrapper">
        <img alt="bannerLogo" src={bannerLogo} />
        <StyledSlider ref={slider} {...settings}>
          {DUMMY_CONTENTS.map((ele, idx) => {
            const totalCount = DUMMY_CONTENTS.length;

            return (
              <div className="card" key={idx}>
                <div className="contents">
                  <p className="badge">{ele.badge}</p>
                  <h2 className="title">{ele.title}</h2>
                  <p className="content">{ele.content}</p>
                </div>
                <div className="btnWrapper">
                  <button onClick={prevBtn}>
                    <HiChevronLeft size="16px" />
                  </button>
                  <span>
                    <span style={{ color: "black", fontSize: "16px" }}>{`${
                      idx + 1
                    }`}</span>
                    <span style={{ color: "rgba(0,0,0,0.3)" }}> / </span>
                    <span style={{ fontSize: "16px" }}>{`${totalCount}`}</span>
                  </span>
                  <button onClick={nextBtn}>
                    <HiChevronRight size="16px" />
                  </button>
                </div>
              </div>
            );
          })}
        </StyledSlider>
      </div>
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  background-color: ${({ theme }) => theme.colors.mainHover};
  /* background-position: center;
  background-image: url(${bannerBackground});
  background-size: cover;
  background-repeat: no-repeat; */
  color: ${({ theme }) => theme.colors.black};
  box-shadow: 0 2px 5px rgba(130, 130, 130, 0.1);

  .contentsWrapper {
    display: flex;
    justify-content: end;
    align-items: center;
    max-width: 1200px;
    width: 100%;
    position: relative;
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSize["20"]};
    word-break: break-all;
  }

  p {
    font-size: ${({ theme }) => theme.fontSize["16"]};
    white-space: pre-line;
  }

  img {
    position: absolute;
    left: 0px;
    max-width: 500px;
    width: 100%;
  }

  .slick-slider {
    max-width: 400px;
    width: 100%;
    ${({ theme }) => theme.device.tablet} {
      padding: 0px 1rem;
    }
  }
`;

const StyledSlider = styled(Slider)`
  .slick-list {
  }

  .slick-slide {
    display: flex !important;
    justify-content: flex-end;
  }

  .slick-arrow {
    display: none !important;
  }

  .slick-slide div {
    text-align: start;
    max-width: 400px;
    width: 100%;
    height: 300px;
  }

  .slick-slide div .card {
    display: flex !important;
    flex-direction: column;
    align-items: flex-start;
    padding: 25px;
    border-radius: 4px;
    border-start-start-radius: 30px;
    background-color: rgba(255, 255, 255, 1);
  }

  .badge {
    width: max-content;
    border: 1px solid rgba(0, 0, 0, 0.2);
    font-size: 14px;
    color: rgba(0, 0, 0, 0.7);
    border-radius: 20px;
    padding: 5px 12px;
    margin-bottom: 12px;
  }

  .title {
    margin-bottom: 20px;
    font-weight: bold;
  }

  .content {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.7);
  }

  .btnWrapper {
    display: flex;
    align-items: center !important;
    height: max-content !important;
    font-size: ${({ theme }) => theme.fontSize["14"]};
    gap: 5px;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: white;
    border: 1px solid white;
     */
    /* background-color: rgba(255, 255, 255, 0.4); */
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    padding: 3px;
  }
`;

export default Banner;
