export default (value) => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.style.position = 'fixed'
    // input.style.visibility = 'hidden'
    input.value = value

    document.body.appendChild(input)
    input.focus()
    input.select()

    try {
      document.execCommand('copy')
      input.blur()
      document.body.removeChild(input)
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}
