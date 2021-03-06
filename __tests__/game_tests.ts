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

  describe('update', () => {
    it('takes a player input and updates the story state', () => {
      const story: story = {
        getChoices: jest.fn(() => [
          {
            label: 'choice',
            target: 'newLocation',
          },
        ]),
        choose: jest.fn(
          () =>
            (story.location = {
              title: 'newLocationTitle',
              text: 'newLocationText',
            })
        ),
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

      game.update('choice')

      expect(game.state).toEqual({
        title: 'newLocationTitle',
        text: 'newLocationText',
        inventory: ['keys'],
        health: 10,
        choices: [
          {
            label: 'choice',
            target: 'newLocation',
          },
        ],
      })
    })

    it('applies damage to the hero', () => {
      const story: story = {
        getChoices: jest.fn(() => [
          {
            label: 'choice',
            target: 'newLocation',
          },
        ]),
        choose: jest.fn(
          () =>
            (story.location = {
              title: 'newLocationTitle',
              text: 'newLocationText',
              healthChange: -2,
            })
        ),
        location: { title: 'locationTitle', text: 'locationText' },
      }
      const hero: hero = {
        inventory: ['keys'],
        health: 10,
        alive: true,
        heal: jest.fn(),
        takeDamage: jest.fn((health: number) => {
          hero.health -= health
        }),
        pickUp: jest.fn(),
        drop: jest.fn(),
      }
      const game: Game = new Game(story, hero)

      game.update('choice')

      expect(game.state).toEqual({
        title: 'newLocationTitle',
        text: 'newLocationText',
        inventory: ['keys'],
        health: 8,
        choices: [
          {
            label: 'choice',
            target: 'newLocation',
          },
        ],
      })
    })

    it('applies healing to the hero', () => {
      const story: story = {
        getChoices: jest.fn(() => [
          {
            label: 'choice',
            target: 'newLocation',
          },
        ]),
        choose: jest.fn(
          () =>
            (story.location = {
              title: 'newLocationTitle',
              text: 'newLocationText',
              healthChange: 2,
            })
        ),
        location: { title: 'locationTitle', text: 'locationText' },
      }
      const hero: hero = {
        inventory: ['keys'],
        health: 6,
        alive: true,
        heal: jest.fn((health: number) => {
          hero.health += health
        }),
        takeDamage: jest.fn(),
        pickUp: jest.fn(),
        drop: jest.fn(),
      }
      const game: Game = new Game(story, hero)

      game.update('choice')

      expect(game.state).toEqual({
        title: 'newLocationTitle',
        text: 'newLocationText',
        inventory: ['keys'],
        health: 8,
        choices: [
          {
            label: 'choice',
            target: 'newLocation',
          },
        ],
      })
    })

    it('adds picked up items to hero inventory', () => {
      const story: story = {
        getChoices: jest.fn(() => [
          {
            label: 'choice',
            target: 'newLocation',
          },
        ]),
        choose: jest.fn(
          () =>
            (story.location = {
              title: 'newLocationTitle',
              text: 'newLocationText',
              inventoryChanges: [{ action: 'pickUp', item: 'sword' }],
            })
        ),
        location: { title: 'locationTitle', text: 'locationText' },
      }
      const hero: hero = {
        inventory: ['keys'],
        health: 10,
        alive: true,
        heal: jest.fn((health: number) => {
          hero.health += health
        }),
        takeDamage: jest.fn(),
        pickUp: jest.fn((item) => (hero.inventory = ['keys', item])),
        drop: jest.fn(),
      }
      const game: Game = new Game(story, hero)

      game.update('choice')

      expect(game.state).toEqual({
        title: 'newLocationTitle',
        text: 'newLocationText',
        inventory: ['keys', 'sword'],
        health: 10,
        choices: [
          {
            label: 'choice',
            target: 'newLocation',
          },
        ],
      })
    })

    it('removes dropped items to hero inventory', () => {
      const story: story = {
        getChoices: jest.fn(() => [
          {
            label: 'choice',
            target: 'newLocation',
          },
        ]),
        choose: jest.fn(
          () =>
            (story.location = {
              title: 'newLocationTitle',
              text: 'newLocationText',
              inventoryChanges: [{ action: 'drop', item: 'sword' }],
            })
        ),
        location: { title: 'locationTitle', text: 'locationText' },
      }
      const hero: hero = {
        inventory: ['keys', 'sword'],
        health: 10,
        alive: true,
        heal: jest.fn((health: number) => {
          hero.health += health
        }),
        takeDamage: jest.fn(),
        pickUp: jest.fn(),
        drop: jest.fn(
          (item) => (hero.inventory = hero.inventory.filter((i) => i !== item))
        ),
      }
      const game: Game = new Game(story, hero)

      game.update('choice')

      expect(game.state).toEqual({
        title: 'newLocationTitle',
        text: 'newLocationText',
        inventory: ['keys'],
        health: 10,
        choices: [
          {
            label: 'choice',
            target: 'newLocation',
          },
        ],
      })
    })

    it('sets state to Game Over if hero is dead', () => {
      const story: story = {
        getChoices: jest.fn(() => [
          {
            label: 'choice',
            target: 'newLocation',
          },
        ]),
        choose: jest.fn(
          () =>
            (story.location = {
              title: 'newLocationTitle',
              text: 'newLocationText',
              healthChange: -2,
            })
        ),
        location: { title: 'locationTitle', text: 'locationText' },
      }
      const hero: hero = {
        inventory: ['keys'],
        health: 2,
        alive: true,
        heal: jest.fn(),
        takeDamage: jest.fn((health: number) => {
          hero.health -= health
          hero.alive = !!hero.health
        }),
        pickUp: jest.fn(),
        drop: jest.fn(),
      }
      const game: Game = new Game(story, hero)

      game.update('choice')

      expect(game.state).toEqual({
        title: 'Game Over',
        text: 'You died from your injuries...',
        inventory: ['keys'],
        health: 0,
        choices: [],
      })
    })
  })
})
