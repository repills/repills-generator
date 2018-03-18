import { css } from 'styled-components';
import { theme, typography, extRem } from 'repills-react-components';

const { palettes } = theme;
const { neutral } = palettes;

export const lastSentence = css`
  ${typography.header4}
  color: ${neutral.highest};
  margin: ${extRem(40,0,0)};
  text-align: center;
`;

export const featureList = css`
  border: 1px solid ${neutral.medium};
  padding: ${extRem(40)};
`;

export const actions = css`
  display: flex;
  justify-content: center;
  margin-top: ${extRem(40)};
`;

