export const shortenAddress = (addr: string) => {
  return `${addr?.substring(0, 6)}...${addr?.substring(addr.length - 4)}`
}

export const capitalize = (word: string) => `${word?.substring(0, 1).toUpperCase()}${word?.substring(1)}`

