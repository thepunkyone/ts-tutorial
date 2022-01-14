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

export default class Story {
  private locations: location[]
  // public location: location

  constructor(storyData: string) {
    this.locations = JSON.parse(storyData)

    const startingLocation: location | undefined = this.locations.find(
      (location) => location.title === 'start'
    )

    if (!startingLocation) {
      throw new Error('story does not have a start')
    }

    // this.location = this.locations[0]
  }
}
