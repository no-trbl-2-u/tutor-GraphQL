import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
  {
    books {
      name
      author {
        name
      }
    }
  }
`

const BookList = props => {
  const { books } = this.props.data

  return (
    <ul className="BookList">
      {
        this.props.data.loading 
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