export default {
  rules: ['regex:/^[a-z](?:[a-z]|-(?=[a-z])){0,38}$/i'],
  messages: { 'regex': 'It doesn\'t seem to be a valid GitHub username.' }
};
