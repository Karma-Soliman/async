export const putData = async (url, data) => {
    //console.log("Sending data...", url, data)
    const update = `${url}/${data.id}`
    try {
        const response = await fetch(update, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                my_key: "my_super_secret_phrase",
            },
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        throw error
    }
}
