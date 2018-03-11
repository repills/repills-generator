import { css } from 'styled-components';
import { theme, typography, extRem } from 'repills-react-components';

const { palettes } = theme;
const { neutral, status } = palettes;

export const page = css`
  max-width: ${extRem(950)}; 
  margin: 0 auto;
`;

export const navigation = css`
  padding: ${extRem(0, 16)}
`;

export const step = css`
  padding: ${extRem(24,16,0)};
`;

export const stepHeader = css`
  text-align: center;
`;

export const stepStatus = css`
  ${typography.body}
  color: ${neutral.mediumHigh};
  text-transform: uppercase;
`;

export const stepFooter = css`
  margin-top: ${extRem(40)};
  text-align: center;
`;

export const stepNavigation = css`
  button {
    margin: ${extRem(0, 2)};
  }
`;

export const stepBody = css`
  margin: ${extRem(40)} auto 0;
`;

export const stepField = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const stepErrors = css`
  ${typography.small}
  color: ${status.danger};
  margin-top: ${extRem(20)};
  text-align: center;
`;

export const stepNavigationHelp = css`
  ${typography.body}
  color: ${neutral.highest};
  margin-top: ${extRem(16)};
`;

export const label = css`
  ${typography.header3}
  margin: ${extRem(40,0,0)};
  line-height: 1;
`;

export const helpGuide = css`
  padding-top: ${extRem(40)};
`;

export const helpStyle = css`
  ${typography.body}
  margin: ${extRem(20,0,0)};
  color: ${neutral.high};
  
  a {
    font-weight: bold;
    text-decoration: underline;
    color: currentColor;
  }
`;

export const footer = css`
  ${typography.small}
  margin-top: ${extRem(80)};
  color: ${neutral.mediumHigh};
  align-items: center;
  display: flex;
  justify-content: center;
  
  a {
    color: currentColor;
  }
`;
