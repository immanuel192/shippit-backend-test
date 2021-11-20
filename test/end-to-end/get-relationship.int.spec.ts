import { suiteName } from '../utils'
import { CommandType, RawCommand } from '../../src/app/types'
import { main } from '../../src/app/app'

describe(suiteName(__filename), () => {
  describe('son', () => {
    it('should get list of son of Harry', async () => {
      const command: RawCommand = {
        command: CommandType.GET_RELATIONSHIP,
        params: ['Harry', 'Son'],
      }

      await expect(main([command])).resolves.toEqual(['James Albus'])
    })

    it('should return empty for son of Dominique', async () => {
      const command: RawCommand = {
        command: CommandType.GET_RELATIONSHIP,
        params: ['Dominique', 'Son'],
      }

      await expect(main([command])).resolves.toEqual(['NONE'])
    })
  })

  describe('daughter', () => {
    it('should get list of daughter of Harry', async () => {
      const command: RawCommand = {
        command: CommandType.GET_RELATIONSHIP,
        params: ['Harry', 'Daughter'],
      }

      await expect(main([command])).resolves.toEqual(['Lily'])
    })

    it('should return empty for daughter of James', async () => {
      const command: RawCommand = {
        command: CommandType.GET_RELATIONSHIP,
        params: ['James', 'Daughter'],
      }

      await expect(main([command])).resolves.toEqual(['NONE'])
    })
  })

  describe('siblings', () => {
    it('should get list of siblings of Ted', async () => {
      const command: RawCommand = {
        command: CommandType.GET_RELATIONSHIP,
        params: ['Ted', 'Siblings'],
      }

      await expect(main([command])).resolves.toEqual(['NONE'])
    })

    it('should return empty for siblings of Molly', async () => {
      const command: RawCommand = {
        command: CommandType.GET_RELATIONSHIP,
        params: ['Molly', 'Siblings'],
      }

      await expect(main([command])).resolves.toEqual(['Lucy'])
    })
  })

  describe('brother in law', () => {
    it('should get list of brother in law of Ted', async () => {
      const command: RawCommand = {
        command: CommandType.GET_RELATIONSHIP,
        params: ['Ted', 'Brother-In-Law'],
      }

      await expect(main([command])).resolves.toEqual(['Louis'])
    })

    it('should return empty for brother in law of Rose', async () => {
      const command: RawCommand = {
        command: CommandType.GET_RELATIONSHIP,
        params: ['Rose', 'Brother-In-Law'],
      }

      await expect(main([command])).resolves.toEqual(['NONE'])
    })
  })

  describe('sister in law', () => {
    it('should get list of sister in law of Ted', async () => {
      const command: RawCommand = {
        command: CommandType.GET_RELATIONSHIP,
        params: ['Ted', 'Sister-In-Law'],
      }

      await expect(main([command])).resolves.toEqual(['Dominique'])
    })

    it('should return empty for sister in law of Rose', async () => {
      const command: RawCommand = {
        command: CommandType.GET_RELATIONSHIP,
        params: ['Rose', 'Sister-In-Law'],
      }

      await expect(main([command])).resolves.toEqual(['NONE'])
    })
  })

  describe('maternal aunt', () => {
    it('should get list of maternal aunt of Remus', async () => {
      const command: RawCommand = {
        command: CommandType.GET_RELATIONSHIP,
        params: ['Remus', 'Maternal-Aunt'],
      }

      await expect(main([command])).resolves.toEqual(['Dominique'])
    })

    it('should return empty for maternal aunt of Ron', async () => {
      const command: RawCommand = {
        command: CommandType.GET_RELATIONSHIP,
        params: ['Ron', 'Maternal-Aunt'],
      }

      await expect(main([command])).resolves.toEqual(['NONE'])
    })
  })

  describe('maternal uncle', () => {
    it('should get list of maternal uncle of Remus', async () => {
      const command: RawCommand = {
        command: CommandType.GET_RELATIONSHIP,
        params: ['Remus', 'Maternal-Uncle'],
      }

      await expect(main([command])).resolves.toEqual(['Louis'])
    })

    it('should return empty for maternal uncle of Ron', async () => {
      const command: RawCommand = {
        command: CommandType.GET_RELATIONSHIP,
        params: ['Ron', 'Maternal-Uncle'],
      }

      await expect(main([command])).resolves.toEqual(['NONE'])
    })
  })

  describe('paternal aunt', () => {
    it('should get list of paternal aunt of Remus', async () => {
      const command: RawCommand = {
        command: CommandType.GET_RELATIONSHIP,
        params: ['Remus', 'Paternal-Aunt'],
      }

      await expect(main([command])).resolves.toEqual(['NONE'])
    })

    it('should return for paternal aunt of William', async () => {
      const command: RawCommand = {
        command: CommandType.GET_RELATIONSHIP,
        params: ['William', 'Paternal-Aunt'],
      }

      await expect(main([command])).resolves.toEqual(['Lily'])
    })
  })

  describe('paternal uncle', () => {
    it('should get list of paternal aunt of Louis', async () => {
      const command: RawCommand = {
        command: CommandType.GET_RELATIONSHIP,
        params: ['Louis', 'Paternal-Uncle'],
      }

      await expect(main([command])).resolves.toEqual(['Charlie Percy Ronald'])
    })

    it('should return for paternal uncle of Draco', async () => {
      const command: RawCommand = {
        command: CommandType.GET_RELATIONSHIP,
        params: ['Draco', 'Paternal-Uncle'],
      }

      await expect(main([command])).resolves.toEqual(['NONE'])
    })
  })
})
