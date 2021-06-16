const text = {
  newText: (text) => {
    return text?.replace('"', '').replace('[', '')
  }
}

export default ({app}, inject) => {
  inject('Text', text)
}
