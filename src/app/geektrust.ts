/**
 * Expected the app to be run by calling: npm start --silent file-name.txt
 */
import { loadArgsInput } from './services/dataloader'
import { writeOutput } from './services/writer'
import { main } from './app'

const filename = process.argv[2]

Promise.resolve()
  .then(async () => {
    const rawCommands = await loadArgsInput(filename)
    const result = await main(rawCommands)
    await writeOutput(result)
  })
  .catch((err: Error) => {
    console.error(err)
    process.exit(1)
  })
