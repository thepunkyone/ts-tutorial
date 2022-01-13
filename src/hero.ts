export default class Hero {
  public health: number
  public inventory: string[]

  constructor() {
    this.health = 10
    this.inventory = []
  }

  public get alive(): boolean {
    return this.health > 0
  }

  public takeDamage(damage: number): void {
    this.health -= damage
  }
}
