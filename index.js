const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const todos = [
	{
		id: 1,
		title: 'delectus aut autem',
		completed: false,
		userId: 1
	},
	{
		id: 2,
		title: 'quis ut nam facilis et officia qui',
		completed: false,
		userId: 3
	},
	{
		id: 3,
		title: 'fugiat veniam minus',
		completed: false,
		userId: 1
	},
	{
		id: 4,
		title: 'et porro tempora',
		completed: true,
		userId: 2
	},
	{
		id: 5,
		title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
		completed: false,
		userId: 1
	}
];

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
	type Todo {
		id: Int!
		title: String
		completed: String
		userId: Int
	}

	type Query {
		allTodo: [Todo]
		todo(id: Int!): Todo
	}

	type Mutation {
		addTodo(title: String!, userId: Int!): Todo
	}
`;

// Provide resolver functions for your schema fields
const resolvers = {
	Query: {
		allTodo: () => {
			return todos;
		},
		todo: (root, { id }) => {
			return todos.find((todo) => todo.id === id);
		}
	},

	Mutation: {
		addTodo: (root, args) => {
			const newTodo = {
				// increment from last index
				id: todos.length + 1,
				title: args.title,
				// false by default
				completed: false,
				userId: args.userId
			};
			todos.push(newTodo);
			return newTodo;
		}
	}
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
