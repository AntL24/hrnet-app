// Mocks CSS imports for Jest. As Jest runs in Node, and Node doesn't understand CSS imports.
jest.mock('./DataTableStyles.css', () => {
    return {};
  });
  
  // Mocks SVG and other static asset imports for Jest.
  jest.mock('./search-icon.svg', () => {
    return {};
  });
  