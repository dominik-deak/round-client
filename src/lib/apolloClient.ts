import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const httpLink = new HttpLink({
	uri: 'http://localhost:3000/graphql',
	credentials: 'same-origin' // Include credentials in the requests
});

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache()
});

export default client;
