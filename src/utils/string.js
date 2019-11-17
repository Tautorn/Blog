export const getFirstLastName = (str) => {
  if (!str) return

  const nameSplitted = str.split(' ')

  return {
    first: nameSplitted[0],
    last: nameSplitted[nameSplitted.length - 1]
  }
}