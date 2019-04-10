export const getFbShareUrl = (url: string) => {
  return `https://www.facebook.com/sharer/sharer.php?u=${url}`
}

export const getLinkedinShareUrl = (url: string, title: string) => {
  return `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`
}

export const getTwitterShareUrl = (url: string) => {
  return `https://twitter.com/home?status=${url}`
}
