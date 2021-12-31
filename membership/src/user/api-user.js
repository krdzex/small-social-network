import baseUrl from "../config"

const create = (user) => {
    console.log(JSON.stringify(user))
    return fetch(`${baseUrl}/api/users/`, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(user),
    }).then(response => response.json()).catch(err => console.log(err))
}

const list = () => {
    return fetch(`${baseUrl}/api/users/`, { method: "GET" })
        .then(response => response.json())
        .catch((err) => console.log(err))
};

const read = (params, token) => {
    return fetch(`${baseUrl}/api/users/${params.userId}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        }
    }).then(response => response.json())
        .catch(err => console.log(err))
}

const update = (params, token, user) => {
    
    return fetch(`${baseUrl}/api/users/${params.userId}`, {
        method: "PUT",
        headers: {
            "Authorization": "Bearer " + token,
        },
        body: user,
        
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}

const remove = (params, token) => {
    return fetch(`${baseUrl}/api/users/${params.userId}`, {
        method: "Delete",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        }
    })
        .then((response) => response.json())
        .catch(err => console.log(err))
}

const follow = async(params,credentials,followId) =>{
    try {
        let response = await fetch("/api/users/follow/",{
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + credentials.t,
            },
            body: JSON.stringify({userId: params.userId,followId: followId})
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const unfollow = async(params,credentials,unfollowId) =>{
    try {
        let response = await fetch("/api/users/unfollow/",{
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + credentials.t,
            },
            body: JSON.stringify({userId: params.userId,unfollowId: unfollowId})
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export { create, list, read, update, remove,follow,unfollow }
