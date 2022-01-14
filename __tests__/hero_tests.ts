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

    it('cannot reduce hero health to below 0', () => {
      const hero: Hero = new Hero()

      hero.health = 1

      hero.takeDamage(3)
      expect(hero.health).toBe(0)
    })
  })

  describe('heal', () => {
    it('increases hero health by specified amount', () => {
      const hero: Hero = new Hero()
      hero.health = 1

      hero.heal(2)

      expect(hero.health).toBe(3)
    })

    it('cannot increase hero health to above 10', () => {
      const hero: Hero = new Hero()

      hero.heal(3)

      expect(hero.health).toBe(10)
    })
  })

  describe('alive', () => {
    it('returns true if hero health greater than 0', () => {
      const hero: Hero = new Hero()
      expect(hero.alive).toBeTruthy()
    })

    it('returns false if hero health 0', () => {
      const hero: Hero = new Hero()
      hero.health = 0
      expect(hero.alive).toBeFalsy()
    })
  })

  describe('pickUp', () => {
    it('adds an item string to hero inventory', () => {
      const hero: Hero = new Hero()

      hero.pickUp('sword')

      expect(hero.inventory).toEqual(['sword'])
    })
  })

  describe('drop', () => {
    it('removes an item string from hero inventory', () => {
      const hero: Hero = new Hero()

      hero.inventory = ['sword']

      hero.drop('sword')

      expect(hero.inventory).toEqual([])
    })

    it('throws an error when trying to remove an item which is not in inventory', () => {
      const hero: Hero = new Hero()

      expect(() => hero.drop('map')).toThrow('map is not in inventory!')
    })
  })
})
