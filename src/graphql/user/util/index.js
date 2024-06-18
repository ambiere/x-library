export async function currentUser(context) {
  const { data, error } = await context.auth.getUser()
  const user = formatUserData(data)
  return [user, error]
}

export async function signInUser(args, context) {
  const { data, error } = await context
    .auth
    .signInWithPassword({
      email: args.email,
      password: args.password
    })

  const user = formatUserData(data)
  return [user, error]
}

export async function signUpUser(args, context) {
  const { data, error } = await context
    .auth
    .signUp({
      email: args.email,
      password: args.password,
      options: {
        data: {
          display_name: args.username ?? "",
          favorite_genres: args.genres ?? []
        }
      }
    })

  const user = formatUserData(data)
  return [user, error]
}

export async function signOutUser(context) {
  let status = "OK"
  const { error } = await context.auth.signOut()
  if (error) status = null
  return [status, error]
}

export async function updateGenres(args, context) {
  const user = context.app.user
  args.genres.concat(user.favoriteGenres)

  const { data, error } = await context
    .auth
    .updateUser({
      data: {
        favorite_genres: args.genres
      }
    })

  user = formatUserData(data)
  return [user, error]
}

export function formatUserData(data) {
  if (data.user)
    return {
      userId: data.user.id,
      email: data.user.user_metadata.email,
      username: data.user.user_metadata.display_name,
      favoriteGenres: data.user.user_metadata.favorite_genres
    }
}
