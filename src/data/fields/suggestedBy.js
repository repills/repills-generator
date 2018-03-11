export default collectedData => {
  const { suggestedBy } = collectedData;
  const { pristine, value, errors } = suggestedBy;

  return {
    title: 'Suggested by',
    component: 'TextFieldWithSuggestions',
    placeholder: 'Your GitHub username',
    name: 'suggestedBy',
    type: 'text',
    help: 'Your GitHub username',
    handler: ({ value, dirty }) => ({ value, dirty }),
    value: value ? value : '',
    hasError: !pristine ? !!(errors && errors.length > 0) : null,
    dirty: !pristine,
    size: 'L',
    suggestions: localStorage.getItem('suggestedBy') ? [localStorage.getItem('suggestedBy')] : [],
    renderForSnippet: () => `[${value.trim()}]`
  };
};
