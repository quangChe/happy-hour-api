const graphql = require('graphql');
const axios = require('axios');
const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = graphql;

const FavoriteType = new GraphQLObjectType({
  name: 'Favorite',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  }
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString},
    firstName: { type: GraphQLString},
    age: { type: GraphQLInt},
    favorite: { 
      type: FavoriteType,
      resolve(parentVal, args) {
        return axios.get(`http://localhost:3000/favorites/${parentVal.favoriteId}`)
          .then(resp => resp.data)
      }
    }
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentVal, args) {
        return axios.get(`http://localhost:3000/users/${args.id}`)
          .then(resp => resp.data)
      }
    },
    favorite: {
      type: FavoriteType,
      args: { id: { type: GraphQLString } },
      resolve(parentVal, args) {  
        return axios.get(`http://localhost:3000/favorites/${args.id}`)
          .then(resp => resp.data)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})