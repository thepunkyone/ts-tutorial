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

  describe('takeDamage', () => {
    it('reduces hero health by specified amount', () => {
      const hero: Hero = new Hero()
      hero.takeDamage(3)
      expect(hero.health).toBe(7)

      hero.takeDamage(2)
      expect(hero.health).toBe(5)
    })
  })
})
