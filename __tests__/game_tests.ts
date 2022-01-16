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
  })
})
