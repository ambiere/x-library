export function setCookie({ context, key, value, options }) {
  context.setCookie(key,
    value,
    options
  )
}

export function clearCookie({ context, key, options }) {
  context.clearCookie(key, options)
}
