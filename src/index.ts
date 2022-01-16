import * as figlet from 'figlet'
import * as chalk from 'chalk'
import { prompt } from 'inquirer'

import Hero from './hero'
import Story from './story'
import Game from './game'

import * as storyData from './data/story.json'

const hero: Hero = new Hero()
const story: Story = new Story(JSON.stringify(storyData))
const game: Game = new Game(story, hero)

const render = (): void => {
  const choices = game.state.choices.map(
    (choice: { label: string; target: string }) => choice.label
  )

  console.log(story.location.text, '\n')

  console.log(chalk.bgGreen.blackBright.bold(`Health: ${game.state.health}/10`))
  console.log(chalk.bold('Inventory:'), game.state.inventory)

  prompt({
    name: 'choice',
    message: '> ',
    type: 'list',
    choices,
  }).then((answer) => {
    game.update(answer.choice)

    if (game.state.title !== 'Game Over') {
      render()
    }
  })
}

figlet.text('Adventure Game', function (_, data) {
  console.log(chalk.bold.greenBright(data))
})

render()
