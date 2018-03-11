export default collectedData => {
  const { link } = collectedData;
  const { pristine, value, errors } = link;

  return {
    title: 'Link',
    component: 'TextField',
    placeholder: 'The resource\'s url',
    name: 'link',
    type: 'url',
    handler: ({ value, dirty }) => ({ value, dirty }),
    value: value ? value : '',
    help: 'Paste the resource link including http:// or https://',
    hasError: !pristine ? !!(errors && errors.length > 0) : null,
    dirty: !pristine,
    required: true,
    size: 'L',
    expanded: true
  };
};

