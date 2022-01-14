const maxHealth = 10
const minHealth = 0

export default class Hero {
  public health: number
  public inventory: string[]

  constructor() {
    this.health = maxHealth
    this.inventory = []
  }

  public get alive(): boolean {
    return this.health > minHealth
  }

  public takeDamage(damage: number): void {
    if (this.health - damage <= minHealth) {
      this.health = minHealth
    } else {
      this.health -= damage
    }
  }

  public heal(healing: number): void {
    if (this.health + healing >= maxHealth) {
      this.health = maxHealth
    } else {
      this.health += healing
    }
  }
}
