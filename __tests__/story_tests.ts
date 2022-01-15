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

    it('sets the location of story to the start location description', () => {
      const startLocation = JSON.parse(storyDataWithStart)[0]
      const startDescription = {
        title: startLocation.title,
        text: startLocation.text,
        inventoryChanges: startLocation.inventoryChanges,
        healthChange: startLocation.healthChange,
      }

      const story: Story = new Story(storyDataWithStart)

      expect(story.location).toEqual(startDescription)
    })
  })
})
