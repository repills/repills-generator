import { css } from 'styled-components';
import { theme, typography, extRem } from 'repills-react-components';

const { palettes } = theme;
const { neutral } = palettes;

export const base = css`
  text-align: center;
  max-width: ${extRem(700)};
  margin: 0 auto;
`;

export const title = css`
  ${typography.header3}
  color: ${neutral.highest};
  margin: 0;
`;

export const lastSentence = css`
  ${typography.header4}
  color: ${neutral.highest};
  margin: ${extRem(40,0,0)};
`;

export const actions = css`
  display: flex;
  justify-content: center;
  margin-top: ${extRem(40)};
`;

