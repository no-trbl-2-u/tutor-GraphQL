import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
  {
    books {
      name
    }
`

const BookList = props => {
  const { books, loading } = props.data

  return (
    <ul className="BookList">
      {
        loading 
        ? <li>Loading</li>
        : books.map(
          (ea, index) =>
            <li key={ index }>{ ea.name }</li>
        )
      }
    </ul>
  )
}


export default graphql(getBooksQuery)(BookList);