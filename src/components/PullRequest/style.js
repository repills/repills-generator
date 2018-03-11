import { css } from 'styled-components';
import {
  theme,
  typography,
  extRem
} from 'repills-react-components';

const { palettes } = theme;
const { neutral } = palettes;

export const base = css`
  max-width: ${extRem(800)};
  margin: 0 auto;
`;

export const title = css`
  ${typography.header3}
  color: ${neutral.highest};
  margin: ${extRem(28)} 0 0;
`;

export const p = css`
  ${typography.body}
  color: ${neutral.high};
  margin: ${extRem(20)} 0 0 0;
`;

export const codeBlock = css`
  margin: ${extRem(24)} 0 0 0;
`;

export const actions = css`
  margin: ${extRem(24)} 0 0 0;
`;

export const preview = css`
  margin: ${extRem(28)} 0 0 0;
  max-width: ${extRem(350)};
  width: 100%;
`;


