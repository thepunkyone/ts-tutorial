import Story from '../src/story'

const storyDataWithStart = `[
  {
    "title": "start",
    "text": "Welcome adventurer. Your adventure begins, as many do, in Ye Olde Inn.",
    "inventoryChanges": [
      {
        "action": "pickUp",
        "item": "gold coins"
      }
    ],
    "healthChange": 0,
    "locks": [],
    "choices": [
      {
        "label": "Continue",
        "target": "inn"
      }
    ]
  }
]`

const storyDataWithChoices = `[
  {
    "title": "start",
    "text": "Welcome adventurer. Your adventure begins, as many do, in Ye Olde Inn.",
    "inventoryChanges": [
      {
        "action": "pickUp",
        "item": "gold coins"
      }
    ],
    "healthChange": 0,
    "locks": [
      {
        "key": "key",
        "choices": {
          "label": "Enter",
          "target": "back room"
        }
      }
    ],
    "choices": [
      {
        "label": "Continue",
        "target": "inn"
      }
    ]
  }
]`

const storyDataWithThreeLocations = `[
  {
    "title": "start",
    "text": "Welcome adventurer. Your adventure begins, as many do, in Ye Olde Inn.",
    "inventoryChanges": [
      {
        "action": "pickUp",
        "item": "gold coins"
      }
    ],
    "healthChange": 0,
    "locks": [
      {
        "key": "key",
        "choices": {
          "label": "Enter",
          "target": "back room"
        }
      },
       {
        "key": "secret",
        "choices": {
          "label": "Read",
          "target": "magic book"
        }
      }
    ],
    "choices": [
      {
        "label": "Continue",
        "target": "inn"
      }
    ]
  },
 
   {
    "title": "inn",
    "text": "Shall we get some beers.",
    "inventoryChanges": [
      {
        "action": "pickUp",
        "item": "key"
      }
    ],
    "healthChange": 0,
    "locks": [
      {
        "key": "key",
        "choices": {
          "label": "Enter",
          "target": "back room"
        }
      }
    ],
    "choices": [
      {
        "label": "Continue",
        "target": "market"
      }
    ]
  },
  
   {
    "title": "back room",
    "text": "Something dodgy is going on here.",
    "inventoryChanges": [
      {
        "action": "pickUp",
        "item": "book of magic"
      }
    ],
    "healthChange": 0,
    "locks": [
      {
        "key": "book of magic",
        "choices": {
          "label": "Enter",
          "target": "mystery portal"
        }
      }
    ],
    "choices": [
      {
        "label": "Continue",
        "target": "market"
      }
    ]
  }
]`

describe('Story', () => {
  describe('constructor', () => {
    it('returns a new instance of Story', () => {
      expect(new Story(storyDataWithStart)).toBeInstanceOf(Story)
    })

    it('throws error if story does not have a start', () => {
      const expectedError = 'story does not have a start'
      const json = `[{
      "title": "not the start",
      "text": "",
      "choices": [
        {
          "label": "Continue",
          "target": "inn"
        }
      ]
    }]`

      expect(() => new Story(json)).toThrow(expectedError)
    })

    it('sets the location of story to the start location', () => {
      const story: Story = new Story(storyDataWithStart)

      expect(story.location.title).toBe('start')
    })
  })

  describe('location', () => {
    it('returns healthChange if present', () => {
      const startLocation = JSON.parse(storyDataWithStart)[0]

      const story: Story = new Story(storyDataWithStart)

      expect(story.location.healthChange).toBe(startLocation.healthChange)
    })

    it('returns inventoryChanges if present', () => {
      const startLocation = JSON.parse(storyDataWithStart)[0]

      const story: Story = new Story(storyDataWithStart)

      expect(story.location.inventoryChanges).toEqual(
        startLocation.inventoryChanges
      )
    })
  })

  describe('getChoices', () => {
    it('returns an array of choices', () => {
      const startLocation = JSON.parse(storyDataWithStart)[0]

      const story: Story = new Story(storyDataWithStart)

      expect(story.getChoices()).toEqual(startLocation.choices)
    })

    it('takes an optional inventory array and returns unlocked choices', () => {
      const heroInventoryWithKey = ['key']

      const startLocation = JSON.parse(storyDataWithChoices)[0]

      const story: Story = new Story(storyDataWithChoices)

      expect(story.getChoices(heroInventoryWithKey)).toEqual([
        ...startLocation.choices,
        startLocation.locks[0].choices,
      ])
    })
  })

  describe('choose', () => {
    const heroInventory = ['key', 'secret']

    it('throws an error if choice does not exist', () => {
      const story: Story = new Story(storyDataWithThreeLocations)

      expect(() => story.choose('i dont exist', heroInventory)).toThrowError(
        'choice "i dont exist" does not exist'
      )
    })

    it('throws an error if choice target does not exist', () => {
      const story: Story = new Story(storyDataWithThreeLocations)

      expect(() => story.choose('Read', heroInventory)).toThrowError(
        'location "magic book" does not exist'
      )
    })

    it('takes the choice label and updates the story location', () => {
      const story: Story = new Story(storyDataWithThreeLocations)

      story.choose('Continue', heroInventory)

      expect(story.location.title).toEqual('inn')
    })

    it('is case insensitive', () => {
      const story: Story = new Story(storyDataWithThreeLocations)

      story.choose('continue', heroInventory)

      expect(story.location.title).toEqual('inn')
    })
  })
})
