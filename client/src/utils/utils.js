export const sep = (str) => {
  let arr = []
  for (var i = 0; i < str.length; i += 4) {
    arr.push(str.slice(i, i + 4))
  }
  return arr.join(' ')
}

export const handleDigits = ({ target }) => {
  if (/\D/.test(target.value)) {
    target.value = target.value.substring(0, target.value.length - 1)
  }

  if (target.name === 'expiresMonth' && !validateMonth(target.value)) {
    console.log(target.value)
    target.value = target.value.length > 1 ? target.value.substring(0, target.value.length - 1) : ''

    console.log(target.value)
  }
}

const validateMonth = (val) => {
  const arr = val.split('')
  if (arr[0] > 1) return false
  if (arr.length === 2 && +val > 12) return false
  return true
}


const validateYear = () => {
  const arr = val.split('')
  if (arr[0] > 3 && arr[0] < 1) return false
  if (arr[1] !== 1 || arr[1] !== 0 || arr[1] !== 9 ) return false
  if (arr.length === 4 && +val < 1900 && +val > 2004) return false
  return true
}