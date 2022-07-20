//
import { fetching } from '../_helpers/fetching'

export const orderService = {
    list,
    create,
    update,
    remove
}

const APIMap = {
    list: '/api/orders?populate=*',
    create: '/api/orders',
    update: '/api/orders',
    delete: '/api/orders',
}

async function list() {
    const requestOptions = {}
    const response = await fetching
        .get(APIMap.list, requestOptions)
        .then(response => {
            return {
                data: response.data.data,
                status_code: response.status,
                message: response.data.message
            }
        })
        .catch(error => {
            return error
        })
    return response
}

async function create(param) {
    const requestOptions = {}
    const requestBody = param
    const response = await fetching
        .post(APIMap.create, requestOptions, requestBody)
        .then(async () => {
            const res = await list(param)
            return res
        })
        .catch(error => {
            return error
        })
    return response
}

async function update(param) {
    const requestOptions = {}
    const requestBody = param
    const response = await fetching
        .put(APIMap.update, requestOptions, requestBody, param?.data.id)
        .then(async () => {
            const res = await list(param)
            return res
        })
        .catch(error => {
            return error
        })
    return response
}

async function remove(param) {
    const requestOptions = {}
    const requestBody = param
    const response = await fetching
        .remove(APIMap.delete, requestOptions, requestBody, param?.id)
        .then(async () => {
            const res = await list(param)
            return res
        })
        .catch(error => {
            return error
        })
    return response
}
