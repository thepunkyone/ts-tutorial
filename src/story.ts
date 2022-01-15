interface lock {
  key: string
  choices: choice[]
}

interface inventoryChange {
  action: 'pickUp' | 'drop'
  item: string
}

interface choice {
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

interface description {
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
}
