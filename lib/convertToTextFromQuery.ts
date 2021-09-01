const convertToTextFromQuery = (query: string): string | null => {
  let newQuery = query.replace(/-/g, ' ');
  return newQuery as string;
}

export default convertToTextFromQuery;