export function unprocessableEntity(err: string): Object {
    return {
        type: 'error_unprocessable_entity',
        message: err
    }
}

export function notFound(err: string, errPlural: string): object {
    return {
        type: 'error_not_found',
        message: `This ${err} was not founded, it doesn't be in ${errPlural} datas`
    }
}

export function conflict(err: string, conflict: string): object {
    return {
        type: 'error_conflict',
        message: `This ${err} already ${conflict}`
    }
}

export function unhautorized(err: string): object {
    return {
        type: 'error_unhautorized',
        message: `Unhautorized! ${err}`
    }
}

export function badRequest(err: string): object {
    return {
        type: 'error_bad_request',
        message: err
    }
}