import React from 'react';
import {
  Button
} from 'repills-react-components';
import styled from 'styled-components';
import {
  base,
  title,
  actions,
  lastSentence
} from './style';

const BaseStyle = styled.div`${base}`;
const TitleStyle = styled.h2`${title}`;
const ActionsStyle = styled.div`${actions}`;
const LastSentence = styled.p`${lastSentence}`;

const Help = ({
  handleOnConfirm
}) => {
  return (
    <BaseStyle>
      <TitleStyle>Welcome to the contribution page!</TitleStyle>

      <p>Before you start adding your first resource:</p>

      <div>
        You will need a (free) GitHub account in order to contribute
      </div>
      <div>
        The contribution is pull request based. Every resource will be integrated in the <a href="http://repills.com">repills.com</a>
        website by creating a dedicated pull request.
      </div>

      <LastSentence>Every contribution is really appreciated.</LastSentence>

      <ActionsStyle>
        <Button
          label="Ok, I got"
          onClick={handleOnConfirm}
          size="L"
        />
      </ActionsStyle>
    </BaseStyle>
  );
};

export default Help;
