import { isConstructorDeclaration } from "typescript"

interface BetList {
  id: string,
  name?: string
  money: number
}

class BetDefault {
  public betting: boolean = false
  public title: string = ''
}

class Bet {
  public list: Array<BetList> = []
  public name: string = ''
  public times: number = 0
  
  get sum() {
    let result: number = 0
    this.list.forEach(element => {
      result += element.money
    })
    return result
  }
}

const betting = new BetDefault()
const bet1 = new Bet()
const bet2 = new Bet()

export { betting, bet1, bet2, Bet }