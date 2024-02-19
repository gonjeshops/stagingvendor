export const stringToJson = (data) => {
    try {
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (error) {
        // If parsing fails, return the original data
        return data;
    }
}
