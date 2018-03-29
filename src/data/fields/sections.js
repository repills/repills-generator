import { sections as sectionsConfig } from 'repills-config';

export default collectedData => {
  const { sections } = collectedData;
  const { value, pristine, errors } = sections;

  return {
    title: 'Section',
    component: 'SectionSelector',
    name: 'sections',
    sections: sectionsConfig,
    hasError: !pristine ? !!(errors && errors.length > 0) : null,
    // help: 'Choose among the available sections or <a href="/link-to-github-page">propose a new one</a>.',
    help: 'Choose the section the resource belongs. Skip this step if the resource does not belong to any of the following sections.',
    selected: value
      ? sectionsConfig.map(e => e.id).indexOf(value) : null,
    handler: ({ selected }) => selected !== null
      ?  ({ value: sectionsConfig[selected].id, dirty: true })
      : ({ value: selected, dirty: true }),
    renderForSnippet: () => value ? `[${value.trim()}]` : `[]`,
    style: { width: '100%' }
  };
};
