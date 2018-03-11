export default collectedData => {
  const { publishedAt } = collectedData;
  const { pristine, value, errors } = publishedAt;

  return {
    title: 'Published Date',
    component: 'TextField',
    help: 'Enter the publication date of the resource (if available)',
    name: 'publishedAt',
    type: 'date',
    handler: ({ value, dirty }) => ({ value, dirty }),
    value: value ? value : '',
    hasError: !pristine ? !!(errors && errors.length > 0) : null,
    dirty: !pristine,
    size: 'L',
    renderForSnippet: () => new Date(value).toISOString()
  };
};
