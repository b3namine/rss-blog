const text = {
  newText: (text) => {
    return !!text && text.join('');
  }
}

export default ({app}, inject) => {
  inject('text', text)
}
