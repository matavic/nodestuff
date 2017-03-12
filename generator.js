function* ask(){
  const name = yield "What is your name?"
  const sport = yield "What's your favorite sport?"
  return `${name}'s favorite sport is ${sport}'`
}
const it = ask()
console.log(it.next())
console.log(it.next('Ethan'))
console.log(it.next('Cricket'))
