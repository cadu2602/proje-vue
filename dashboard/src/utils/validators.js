export function validateEmptyAndLength(value) {
  if (!value) {
    return '*This field is required'
  }
  if (value.length < 3) {
    return '*This field needs at least 3 characters'
  }

  return true

}


export function validateEmptyEmail(value) {
  if (!value) {
    return '*This field is required'
  }



  const isValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(value)


  if (!isValid) {
    return '*This field must be an email'
  }
  return true


}