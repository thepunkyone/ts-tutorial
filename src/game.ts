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
  }

  public get state(): gameState {
    return {
      title: this.story.location.title,
      text: this.story.location.text,
      choices: this.story.getChoices(this.hero.inventory),
      health: this.hero.health,
      inventory: this.hero.inventory,
    }
  }
}
