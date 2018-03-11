import { sections as sectionsConfig } from 'repills-config';

export default collectedData => {
  const { sections } = collectedData;
  const { value, pristine, errors } = sections;

  return {
    title: 'Sections',
    component: 'SectionSelector',
    name: 'sections',
    required: true,
    sections: sectionsConfig,
    hasError: !pristine ? !!(errors && errors.length > 0) : null,
    // help: 'Choose among the available sections or <a href="/link-to-github-page">propose a new one</a>.',
    help: 'Choose among the available sections.',
    selected: value
      ? sectionsConfig.map(e => e.id).indexOf(value) : null,
    handler: ({ selected }) => selected !== null
      ?  ({ value: sectionsConfig[selected].id, dirty: true })
      : ({ value: selected, dirty: true }),
    renderForSnippet: () => `[${value.trim()}]`
  };
};