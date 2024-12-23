import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios'; // Importing axios

import Newsitem from './Newsitem';
import Spinner from './Spinner';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // useEffect for the initial data fetch
  useEffect(() => {
    document.title = props.category;
    console.log('Fetching initial data for category:', props.category);
    updateNews(); // Call the function to fetch data when component mounts or category changes
  }, [props.category]); // Dependency array ensures it runs on category change

  // Fetching news data
  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e63a14f89cfb46f0b51ce498f7f41e6b&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    console.log('Fetching data from URL:', url);

    try {
      const response = await axios.get(url); // Using axios to fetch data
      props.setProgress(30);
      const parsedData = response.data;
      console.log('Fetched data:', parsedData); // Log the full response for debugging
      props.setProgress(70);
      setArticles(parsedData.articles); // Set fetched articles
      setTotalResults(parsedData.totalResults); // Set total results count
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }

    props.setProgress(100);
  };

  // useEffect to handle page change and fetch more data when scrolling
  useEffect(() => {
    if (page > 1) {
      console.log('Fetching more data for page:', page);
      fetchMoreData(); // Fetch more data if page is greater than 1
    }
  }, [page]); // Dependency array ensures it runs when `page` changes

  // Fetch more data when user scrolls
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d6ef653bb22c433e9ef19e9516433e77&page=${page}&pageSize=${props.pageSize}`;
    console.log('Fetching more data from URL:', url); // Log the URL for debugging
    try {
      const response = await axios.get(url); // Using axios to fetch more data
      const parsedData = response.data;
      console.log('Fetched more data:', parsedData); // Log the data received from the API
      setArticles((prevArticles) => [...prevArticles, ...parsedData.articles]); // Append new articles to the existing list
      setTotalResults(parsedData.totalResults); // Update the total results count
      setLoading(false);
    } catch (error) {
      console.error('Error fetching more data:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container my-6">
      <div className="Heading">
        <h2>India Times - Top Headlines</h2>
      </div>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length} // Length of current articles list
        next={() => setPage(page + 1)} // Increment page when user scrolls
        hasMore={articles.length !== totalResults} // Load more data if articles count is less than total results
        loader={<Spinner />}
      >
        <div className="row">
          {!loading &&
            articles.map((element) => (
              <div className="col-lg-4" key={element.url}>
                <Newsitem
                  title={element.title ? element.title.slice(0, 44) : ''}
                  description={element.description ? element.description.slice(0, 88) : ''}
                  imageUrl={element.urlToImage}
                  author={element.author}
                  dateOn={element.publishedAt}
                  source={element.source.name}
                  newsUrl={element.url}
                />
              </div>
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: 'in',
  pageSize: 15,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
