import { sections as sectionsConfig } from 'repills-config';

export default collectedData => {
  const { topics } = collectedData;
  const { pristine, value, errors } = topics;
  const section = sectionsConfig.find(e => e.id === collectedData.sections.value);

  return {
    title: 'Topics',
    component: 'TopicSelector',
    help: 'Choose the topics to which the resource belongs',
    name: 'topics',
    handler: ({ selected }) =>  ({ value: selected, dirty: true }),
    selected: value ? value : [],
    topics: section ? section.topics : [],
    hasError: !pristine ? !!(errors && errors.length > 0) : null,
    dirty: !pristine,
    renderForSnippet: () => value ? `[${value.join(', ')}]` : `[]`,
    skip: !section
  };
};
