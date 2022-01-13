import Hero from '../src/hero'

describe('Hero', () => {
  describe('constructor', () => {
    it('returns a new instance of Hero', () => {
      expect(new Hero()).toBeInstanceOf(Hero)
    })

    it('has a starting health of 10', () => {
      const hero: Hero = new Hero()
      expect(hero.health).toBe(10)
    })

    it('starts with an empty inventory', () => {
      const hero: Hero = new Hero()
      expect(hero.inventory.length).toBe(0)
    })
  })
})
