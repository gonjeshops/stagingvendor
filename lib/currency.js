export const currency = ({data}) => {
    return !data ? '$' : '$'+Number(data).toLocaleString('us-en')
}