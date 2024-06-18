import {
  signInUser,
  signUpUser,
  signOutUser,
  updateGenres,
  formatUserData
} from "./util/index.js"

export default {
  Query: {
    me: async (_root, _args, context) => {
      return formatUserData(context.app)
    }
  },

  Mutation: {
    signInUser: async (_root, args, context) => {
      const [user, error] = await signInUser(args, context)
      if (error) context.throw(context.errorCode.U1, error.message)
      context.app.user = user
      return user
    },

    signUpUser: async (_root, args, context) => {
      const [user, error] = await signUpUser(args, context)
      if (error) context.throw(context.errorCode.U2, error.message)
      context.app.user = user
      return user
    },

    signOutUser: async (_root, _args, context) => {
      const [status, error] = await signOutUser(context)
      if (error) context.throw(context.errorCode.U3, error.message)
      context.app.user = null
      return { status }
    },

    updateGenres: async (_parent, args, context) => {
      const [user, error] = await updateGenres(args, context)
      if (error) context.throw(context.errorCode.U4, error.message)
      context.app.user = user
      return {
        favoriteGenres: user.favoriteGenres
      }
    }
  }
}
