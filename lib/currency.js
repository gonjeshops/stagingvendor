export const currency = (data) => {
    return !data ? '0' : '$'+Number(data).toLocaleString('us-en')
}