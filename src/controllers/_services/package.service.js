//
import { fetching } from '../_helpers/fetching'

export const packageService = {
    list,
    create,
    update,
    remove,
    upload,
}

const APIMap = {
    list: '/api/packages?populate=*',
    create: '/api/packages',
    update: '/api/packages',
    delete: '/api/packages',
    upload: '/api/packages',
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


async function upload(param) {
    const requestOptions = {}
    const requestBody = new FormData()
    requestBody.append('files', param)
    requestBody.append('refId', param)
    requestBody.append('ref', param)
    requestBody.append('field', "img_package")
    const response = await fetching
        .post(APIMap.delete, requestOptions, requestBody)
        .then(async () => {
            const res = await list(param)
            return res
        })
        .catch(error => {
            return error
        })
    return response
}
