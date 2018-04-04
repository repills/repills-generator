import { css } from 'styled-components';
import { theme, typography, extRem, media } from 'repills-react-components';

const { palettes } = theme;
const { neutral } = palettes;

export const lastSentence = css`
  ${typography.header4}
  color: ${neutral.higher};
  margin: ${extRem(40,0,0)};
  text-align: center;
`;

export const actions = css`
  display: flex;
  justify-content: center;
  margin-top: ${extRem(40)};
`;

