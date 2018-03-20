export default collectedData => {
  const { title } = collectedData;
  const { pristine, value, errors } = title;

  return {
    title: 'Title',
    component: 'TextField',
    name: 'title',
    type: 'text',
    handler: ({ value, dirty }) => ({ value, dirty }),
    placeholder: 'The resource\'s title',
    help: 'The resource\'s title (e.g. the article title or the tool name)',
    required: true,
    value: value ? value : '',
    hasError: !pristine ? !!(errors && errors.length > 0) : null,
    dirty: !pristine,
    size: 'L',
    expanded: true,
    renderForSnippet: () => `"${value.replace(/"/g, '\\"').trim()}"`,
    style: { maxWidth: '600px' }
  };
};
