export const truncateText = (text, maxLength, more) => {
    if (text?.length > maxLength) {
      return text.slice(0, maxLength) + '...'; // Add ellipsis for truncation
    }
    return text;
  }
