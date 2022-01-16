import { description, choice } from './story'

export interface story {
  location: description
  getChoices: (inventory: string[]) => choice[]
  choose: (input: string, inventory: string[]) => void
}

export interface hero {
  inventory: string[]
  health: number
  alive: boolean
  heal: (health: number) => void
  takeDamage: (damage: number) => void
  pickUp: (item: string) => void
  drop: (item: string) => void
}

interface gameState {
  title: string
  text: string
  choices: choice[]
  health: number
  inventory: string[]
}

export default class Game {
  private story: story
  private hero: hero

  constructor(story: story, hero: hero) {
    this.story = story
    this.hero = hero

    this.updateHero()
  }

  public update(input: string): void {
    this.story.choose(input, this.hero.inventory)

    this.updateHero()
  }

  private updateHero(): void {
    const { healthChange, inventoryChanges } = this.story.location

    if (healthChange && healthChange < 0) {
      this.hero.takeDamage(Math.abs(healthChange))
    }

    if (healthChange && healthChange > 0) {
      this.hero.heal(Math.abs(healthChange))
    }

    if (inventoryChanges) {
      inventoryChanges.forEach((change) => {
        this.hero[change.action](change.item)
      })
    }
  }

  public get state(): gameState {
    if (this.hero.alive) {
      return {
        title: this.story.location.title,
        text: this.story.location.text,
        choices: this.story.getChoices(this.hero.inventory),
        health: this.hero.health,
        inventory: this.hero.inventory,
      }
    } else {
      return {
        title: 'Game Over',
        text: 'You died from your injuries...',
        choices: [],
        health: this.hero.health,
        inventory: this.hero.inventory,
      }
    }
  }
}
