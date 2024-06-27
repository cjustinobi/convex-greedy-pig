
export const capitalize = (word: string) =>
  `${word?.substring(0, 1).toUpperCase()}${word?.substring(1)}`

export const loadDiceImages = () => {
  const diceImages = []
  for (let i = 1; i <= 6; i++) {
    diceImages.push(require(`@/assets/img/dice_${i}.png`))
  }
  return diceImages
}
