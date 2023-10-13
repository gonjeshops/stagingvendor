export const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text.slice(0, maxLength) + '...'; // Add ellipsis for truncation
    }
    return text;
  }
