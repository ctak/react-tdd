import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import NewsItem from "./NewsItem";
import usePromise from "../lib/usePromise";
import { AxiosError } from "../../node_modules/axios/index";

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
  /*
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // async 를 사용하는 함수 따로 선언
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = category === 'all' ? '' : `&category=${category}`;
        // let newsUrl = 'https://newsapi.org/v2/top-headlines?country=kr&apiKey=abfba8f2d88e46b7916e5c5685c9bd34';
        // if (category !== 'all') {
        //   newsUrl += `&category=${category}`
        // }
        // const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=abfba8f2d88e46b7916e5c5685c9bd34`);
        // const response = await axios.get(newsUrl);
        setArticles(response.data.articles);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };

    fetchData();
  }, [category]);
  */
  const [loading, response, error] = usePromise(() => {
    const query = category === 'all' ? '' : `&category=${category}`;
    return axios.get(`https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=abfba8f2d88e46b7916e5c5685c9bd34`);
  }, [category]);

  if (error) {
    return <NewsListBlock>에러 발생!</NewsListBlock>;
  }
  // 대기 중일 때
  // useEffect 문이 없다면 여기로 들어올 수가 없군. 여기서 ajax 를 돌릴 때 나와야 하기에.
  if (loading) {
    return <NewsListBlock>대기 중...</NewsListBlock>;
  }

  // 아직 articles 값이 설정되지 않았을 때
  if (!response) {
    return null;
  }

  const { articles } = response.data;

  return (
    <NewsListBlock>
      {articles.map(article => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

// const sampleArticle = {
//   title: '제목',
//   description: '내용',
//   url: 'https://google.com',
//   urlToImage: 'https://via.placeholder.com/160',
// };

// const NewsList= () => {
//   return (
//     <NewsListBlock>
//       <NewsItem article={sampleArticle} />
//       <NewsItem article={sampleArticle} />
//       <NewsItem article={sampleArticle} />
//       <NewsItem article={sampleArticle} />
//       <NewsItem article={sampleArticle} />
//       <NewsItem article={sampleArticle} />
//     </NewsListBlock>
//   );
// };

export default NewsList;
