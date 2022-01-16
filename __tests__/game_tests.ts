import Game, { hero, story } from '../src/game'

describe('Game', () => {
  describe('constructor', () => {
    it('returns a new instance of game', () => {
      const story: story = {
        getChoices: jest.fn((): [] => []),
        choose: jest.fn(),
        location: { title: 'locationTitle', text: 'locationText' },
      }
      const hero: hero = {
        inventory: [],
        health: 10,
        alive: true,
        heal: jest.fn(),
        takeDamage: jest.fn(),
        pickUp: jest.fn(),
        drop: jest.fn(),
      }

      const game: Game = new Game(story, hero)

      expect(game).toBeInstanceOf(Game)
    })

    describe('state', () => {
      it('describes the current state of the story and the hero', () => {
        const story: story = {
          getChoices: jest.fn(() => [
            {
              label: 'choice',
              target: 'location',
            },
          ]),
          choose: jest.fn(),
          location: { title: 'locationTitle', text: 'locationText' },
        }

        const hero: hero = {
          inventory: ['keys'],
          health: 10,
          alive: true,
          heal: jest.fn(),
          takeDamage: jest.fn(),
          pickUp: jest.fn(),
          drop: jest.fn(),
        }

        const game: Game = new Game(story, hero)

        expect(game.state).toEqual({
          title: 'locationTitle',
          text: 'locationText',
          health: 10,
          inventory: ['keys'],
          choices: [
            {
              label: 'choice',
              target: 'location',
            },
          ],
        })
      })
    })
  })
})
