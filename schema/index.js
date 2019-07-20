const graphql = require('graphql');
const _ = require('lodash');
const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = graphql;

const users = [
  { id: '23', firstName: 'Bill', age: 29 },
  { id: '47', firstName: 'Samantha', age: 28 },
  { id: '4', firstName: 'John', age: 24 },
  { id: '47', firstName: 'Roland', age: 32 }
];

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString},
    firstName: { type: GraphQLString},
    age: { type: GraphQLInt},
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return _.find(users, { id: args.id });
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})