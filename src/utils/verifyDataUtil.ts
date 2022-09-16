import * as errors from '../errors/errorsThrow'
import { allModels } from '../types/userType'

export interface VerifyDataLiterals {
    foundData: (data: allModels | null, modelSingular: string, modelPlural: string) => void
    conflictDataExists: (data: allModels | null, conflict: string) => void
}

export const verifyData: VerifyDataLiterals = {
    foundData: (data, modelSingular, modelPlural) => {
        if (!data) {
            throw errors.notFound(modelSingular, modelPlural)
        }
    },
    conflictDataExists: (data, conflict) => {
        if (data) {
            throw errors.conflict(conflict, 'registered')
        }
    }
}