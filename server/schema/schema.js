const graphQL = require('graphql');

// Models/Collections
const Book = require('../models/Book')
const Author = require('../models/Author')

// GraphQL Types
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = graphQL

// Book Type
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve: (parent, args) => {
        return Author.findById(parent.authorID)
      }
    }
  })
});


// Author Type
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({authorID: parent.id})
      }
    }
  })
});


// Root
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {

    book: {
      type: BookType,
      args: {id: {type: GraphQLID}},
      resolve(_, args) {
        return Book.findById(args.id)
      }
    },

    books: {
      type: GraphQLList(BookType),
      resolve(_, __) {
        return Book.find({})
      }
    },

    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(_, args) {
        return Author.findById(args.id)
      }
    },

    authors: {
      type: GraphQLList(AuthorType),
      resolve(_, __) {
        return Author.find({})
      }
    },

  }
})

// Mutation Procedure
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {

    // ADD AUTHOR
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
      },

      // ADD AUTHOR - RESOLVE
      resolve(_, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        })
        
        return author.save()
      }
    },

    // ADD BOOK
    addBook: {
      type: BookType,
      args: {
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        authorID: {type: GraphQLID}
      },

      // ADD BOOK - RESOLVE
      resolve(parent, args) {
        let book = new Book ({
          name: args.name,
          genre: args.genre,
          authorID: args.authorID
        })

        return book.save()
      }
    }
    // ======================= //
    //      MORE MUTATIONS     //
    // ======================= //

  }
})


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})