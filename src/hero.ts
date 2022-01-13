export default class Hero {
  public health: number
  public inventory: string[]

  constructor() {
    this.health = 10
    this.inventory = []
  }

  public takeDamage(damage: number): void {
    this.health -= damage
  }
}
