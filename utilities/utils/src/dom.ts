export const scrollToId = (id: string) => {
  const object = document.getElementById(id)

  if (object) {
    object.scrollIntoView({
      behavior: 'smooth'
    })
  }
}

export const getWindowSize = () => {
  const isClient = typeof window === 'object'

  return {
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined
  }
}
