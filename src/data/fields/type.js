import { types } from 'repills-config';

const typesOptions = Object.keys(types).reduce(
  (acc, key) => {
    acc.push({ label: types[key].label.singular, value: types[key].id });
    return acc;
  },
  []
);

export default collectedData => {
  const { type } = collectedData;
  const { value, pristine, errors } = type;

  const selectedIndex = typesOptions.findIndex(e => (e.value === value));

  return {
    title: 'Type',
    component: 'Select',
    help: 'todo',
    name: 'type',
    options: typesOptions,
    handler: ({ value }) => ({ value, dirty: true }),
    hasError: !pristine ? !!(errors && errors.length > 0) : null,
    value: value ? value : '',
    selectedIndex:  selectedIndex === -1 ? null : selectedIndex,
    size: 'L',
    renderForSnippet: () => {
      const _value = value.split('_');
      return `[${_value.join(', ')}]`;
    }
  };
};
