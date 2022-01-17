import baseUrl from "../config"

const listNewsFeed = async (params, credentials, signal) => {
    try {
        let response = await fetch(`${baseUrl}/api/posts/feed/` + params.userId, {
            method: "GET",
            signal: signal,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + credentials.t,
            }
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

const create = async (params, credentials, post) => {
    try {
        let response = await fetch(`${baseUrl}/api/posts/new/` + params.userId, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + credentials.t,
            },
            body: post
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

const remove = (params, token) => {

    return fetch(`${baseUrl}/api/posts/remove/${params.postId}`, {
        method: "Delete",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token.t,
        }
    })
        .then((response) => response.json())
        .catch(err => console.log(err))
}

const like = async (params, credentials, postId) => {
    try {
        let response = await fetch(`${baseUrl}/api/posts/like/`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + credentials.t,
            },
            body: JSON.stringify({ userId: params.userId, postId: postId })
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}


const unlike = async (params, credentials, postId) => {
    try {
        let response = await fetch(`${baseUrl}/api/posts/unlike/`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + credentials.t,
            },
            body: JSON.stringify({ userId: params.userId, postId: postId })
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}


const comment = async (params, credentials, postId, comment) => {
    try {
        let response = await fetch(`${baseUrl}/api/posts/comment/`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + credentials.t,
            },
            body: JSON.stringify({ userId: params.userId, postId: postId,comment: comment })
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

const uncomment = async (params, credentials, postId, comment) => {
    try {
        let response = await fetch(`${baseUrl}/api/posts/uncomment/`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + credentials.t,
            },
            body: JSON.stringify({ userId: params.userId, postId: postId,comment: comment })
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}



export { listNewsFeed, create, remove, like, unlike, comment,uncomment }