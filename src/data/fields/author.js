export default collectedData => {
  const { author } = collectedData;
  const { pristine, value, errors } = author;

  return {
    title: 'Author',
    component: 'TextField',
    placeholder: 'The resource\'s author',
    help: 'The resource\'s author',
    name: 'author',
    type: 'text',
    handler: ({ value, dirty }) => ({ value, dirty }),
    value: value ? value : '',
    hasError: !pristine ? !!(errors && errors.length > 0) : null,
    dirty: !pristine,
    size: 'L',
    expanded: true,
    renderForSnippet: () => `"${value.replace(/"/g, '\\"').trim()}"`,
    style: { maxWidth: '600px' }
  };
};
