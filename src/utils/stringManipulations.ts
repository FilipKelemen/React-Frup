export const turnFirstLetterToUppercaseAndTheRestLowercase = (string: string) => {
  return string[0].toUpperCase() + string.substring(1).toLowerCase()
}

export const operateWithPixels = (
  firstNumberOfPixels: string,
  secondNumberOfPixels: string,
  operationCallback: (a: number,b: number) => number) => {
    if(!firstNumberOfPixels.endsWith('px')) {
      console.error('The first string does not end in px')
      return
    }
    if(!secondNumberOfPixels.endsWith('px')) {
      console.error('The second string does not end in px')
      return
    }
    const numberFromFirstString = firstNumberOfPixels.slice(0,-2)
    const numberFromSecondString = secondNumberOfPixels.slice(0,-2)
    if(isNaN(Number(numberFromFirstString))) {
      console.error('The first string does not parse to a number')
      return
    }
    if(isNaN(Number(numberFromSecondString))) {
      console.error('The second string does not parse to a number')
      return
    }
  return operationCallback(Number(numberFromFirstString),Number(numberFromSecondString)) + 'px'
}

export const dividePixels = (numberOfPixels: string, divider: number) => {
  if(!numberOfPixels.endsWith('px')) {
    console.error('The string does not end in px')
    return
  }
  const numberFromFirstString = numberOfPixels.slice(0,-2)
  if(isNaN(Number(numberFromFirstString))) {
    console.error('The string does not parse to a number')
    return
  }
  return Number(numberFromFirstString) / divider + 'px'
}
