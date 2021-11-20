/**
 * To write data to output
 * @param data
 */
export const writeOutput = async (data: string[]) => {
  data.forEach(line => console.log(line))
}
