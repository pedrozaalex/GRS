import { StrictMode } from 'react';
import './main.sass';
import ReactDOM from 'react-dom';
import { createHttpLink, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import App from './App';

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

// put the necessary cookies on every apollo request
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = import.meta.env.VITE_GITHUB_API_TOKEN;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

ReactDOM.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
  document.getElementById('root')
);
