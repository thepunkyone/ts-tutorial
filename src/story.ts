interface lock {
  key: string
  choices: choice[]
}

interface inventoryChange {
  action: 'pickUp' | 'drop'
  item: string
}

export interface choice {
  label: string
  target: string
}

interface location {
  title: string
  text: string
  inventoryChanges?: inventoryChange[]
  healthChange?: number
  locks?: lock[]
  choices: choice[]
}

export interface description {
  title: string
  text: string
  inventoryChanges?: inventoryChange[]
  healthChange?: number
}

export default class Story {
  private locations: location[]
  private currentLocation: location

  constructor(storyData: string) {
    this.locations = JSON.parse(storyData)

    const startingLocation: location | undefined = this.locations.find(
      (location) => location.title === 'start'
    )

    if (!startingLocation) {
      throw new Error('story does not have a start')
    }

    this.currentLocation = startingLocation
  }

  public get location(): description {
    return {
      title: this.currentLocation.title,
      text: this.currentLocation.text,
      inventoryChanges: this.currentLocation.inventoryChanges,
      healthChange: this.currentLocation.healthChange,
    }
  }

  public getChoices(inventory: string[] = []): choice[] {
    let choices: choice[] = [...this.currentLocation.choices]
    if (this.currentLocation.locks) {
      this.currentLocation.locks.forEach((lock) => {
        if (inventory.indexOf(lock.key) > -1) {
          choices = choices.concat(lock.choices)
        }
      })
    }
    return choices
  }

  public choose(input: string, heroInventory: string[]): void {
    const choices = this.getChoices(heroInventory)

    const choice: choice | undefined = choices.find(
      (c) => c.label.toLowerCase() === input.toLowerCase()
    )

    if (!choice) {
      throw new Error(`choice "${input}" does not exist`)
    }

    const chosenLocation: location | undefined = this.locations.find(
      (location) => location.title === choice.target
    )

    if (!chosenLocation) {
      throw new Error(`location "${choice.target}" does not exist`)
    }

    this.currentLocation = chosenLocation
  }
}
