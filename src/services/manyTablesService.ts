import * as manyTablesRepository from '../repositories/manyTablesRepository'

export async function manyTables() {
    const manyTables = await manyTablesRepository.findManyTables()

    return manyTables
}