interface betType {
  name: string,
  list: betList[],
  sum: number,
  times: number
}

interface betList {
  id: string,
  money: number
}

class betDefault {
  public betting: boolean = false
  public title: string = ''
}

class bet {
  public list: betList[] = []
  public start: boolean = false
  public name: string | null = null
  public moneyBefore: number = 0
  public times: number = 0

  get betName() {
    return this.name
  }
  

  get sum() {
    let result: number = 0
    for(let i = 0; i < this.list.length; i++) {
      result += this.list[i].money
    }
    return result
  }
}

const betting = new betDefault()
const bet1 = new bet()
const bet2 = new bet()

export { betting, bet1, bet2, bet }