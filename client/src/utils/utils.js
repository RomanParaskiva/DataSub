
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
    target.value = target.value.length > 1 ? target.value.substring(0, target.value.length - 1) : ''
  }
}

const validateMonth = (val) => {
  const arr = val.split('')
  if (arr[0] > 1) return false
  if (arr.length === 2 && +val > 12) return false
  return true
}


export const validateYear = (val) => {
  const year = new Date(val).getFullYear()
  console.log('year', year)
  if (+year < 1940 || +year > 2016) return false
  
  return true
}

export const validateForm = (cardData) => {
  console.log(cardData)
  if(cardData?.cardNumber?.length != 16 ) return false
  if(cardData?.expiresMonth?.length != 2) return false
  if(cardData?.expiresYear?.length != 4) return false
  if(cardData?.cvv?.length != 3) return false
  if(cardData?.amount?.length == 0) return false
  return true
}