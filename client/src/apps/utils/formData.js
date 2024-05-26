
export const addFormData = (data, params) => {
    let formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
        if (key === 'uploaded_images' || key === 'observers') {
            return [...value].forEach((item) => formData.append(key, item))
        }
        formData.append(key, value)

        if (params) formData.append('task', params.id)
    })

    return formData
}