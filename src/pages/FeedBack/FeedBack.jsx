import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import GlobalCard from "../../components/UI/GlobalCard";

import Dropdown from "../../components/UI/GlobalDropDown";
import { getFeedback as getFeedbackApi } from "../../apis/feedbackApis.js";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../components/UI/Loader";

const FeedBack = () => {
  // const [pagination, setPagination] = useState({});
  const [data, setData] = useState({ feedback: [], pagination: {} });

  const [selectedDate, setSelectedDate] = useState("(정렬)");
  const [selectedCategory, setSelectedCategory] = useState("전체보기");

  const fetchFeedback = useCallback(async () => {
    if (data?.pagination?.nextPage === null) {
      return;
    }

    const page = data?.pagination?.nextPage ? data.pagination.nextPage : 1;
    const response = await getFeedbackApi(page);

    setData((prev) => {
      return {
        feedback: [...prev.feedback, ...response?.interviews],
        pagination: response.pagination,
      };
    });
  }, [data]);

  const dateList = ["최신순", "오래된순"];
  const categoryList = ["Frontend", "Backend"];

  return (
    <Container>
      <div className="dropDown_container">
        <Dropdown
          selected={selectedDate}
          setSelected={setSelectedDate}
          options={dateList}
        />
        <Dropdown
          selected={selectedCategory}
          setSelected={setSelectedCategory}
          options={categoryList}
        />
      </div>
      <InfiniteScroll
        loadMore={fetchFeedback}
        hasMore={data?.pagination?.nextPage !== null}
        loader={<Loader key={0} />}
      >
        <div className="card_wrap">
          {data?.feedback?.map((card) => {
            return <GlobalCard key={card.id} card={card} />;
          })}
        </div>
      </InfiniteScroll>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 0;
  margin-top: 100px;
  & .dropDown_container {
    display: flex;
    justify-content: right;
    left: 0;
    width: 316px;
    margin-left: auto;
  }

  & .card_wrap {
    display: grid;
    position: relative;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    animation: fadeInBottom 1s;
    transform: translateY(0%);

    @keyframes fadeInBottom {
      from {
        opacity: 0;
        transform: translateY(30%);
      }
      to {
        opacity: 1;
      }
    }
    ${({ theme }) => theme.device.tablet} {
      grid-template-columns: repeat(2, 1fr);
    }
    ${({ theme }) => theme.device.mobile} {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

export default FeedBack;
