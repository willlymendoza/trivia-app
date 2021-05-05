export const findByTestAttr = (wrapper: any, val: string, tagName?: string) => {
  if (tagName) return wrapper.find(`${tagName}`).find(`[data-test="${val}"]`);

  return wrapper.find(`[data-test="${val}"]`);
};
