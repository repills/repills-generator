import { css } from 'styled-components';
import { theme, typography, extRem, media } from 'repills-react-components';

const { palettes } = theme;
const { neutral, status } = palettes;

export const page = css`
  max-width: ${extRem(1030)}; 
  margin: 0 auto;
`;

export const navigation = css`
  border-bottom: 1px solid ${neutral.low};

  ${media.MD`
    margin: ${extRem(0,16)};
  `}
`;

export const step = css`
  padding: ${extRem(52,16,0)};
`;

export const stepHeader = css`
  text-align: center;
`;

export const stepStatus = css`
  ${typography.body}
  color: ${neutral.medium};
  margin-bottom: ${extRem(20)};
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

export const stepField = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const stepErrors = css`
  ${typography.small}
  color: ${status.danger};
  margin-top: ${extRem(20)};
  text-align: center;
`;

export const stepNavigationHelp = css`
  ${typography.body}
  color: ${neutral.high};
  margin-top: ${extRem(16)};
`;

export const helpGuide = css`
  padding: ${extRem(40,16,0)};
`;

export const pullRequest = css`
  margin: ${extRem(20,16,0)};
  color: ${neutral.high};
`;

export const footer = css`
  ${typography.small}
  margin-top: ${extRem(60)};
  padding: ${extRem(20,0,28)};
  color: ${neutral.medium};
  align-items: center;
  display: flex;
  justify-content: center;
  
  a {
    color: currentColor;
  }
`;
