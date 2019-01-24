import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

//Components
import BookList from './Components/BookList'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
})

const App = () => {
  return(
    <ApolloProvider client={ client } >
      <div id="Main">
        <h1 className="App-header">Here we go</h1>
        <BookList />
      </div>
    </ApolloProvider>
  )
}
export default App;
