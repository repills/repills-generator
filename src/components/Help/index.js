import React from 'react';
import {
  Button,
  FeatureList,
  PageBlock,
} from 'repills-react-components';
import styled from 'styled-components';
import {
  actions,
  lastSentence,
  featureList
} from './style';

const ActionsStyle = styled.div`${actions}`;
const LastSentence = styled.p`${lastSentence}`;
const FeatureListStyle = styled(FeatureList)`${featureList}`;

const Help = ({
  handleOnConfirm
}) => {

  const features = [
    {
      icon: 'User',
      title: 'Account GitHub',
      description: 'You will need a (free) GitHub account in order to contribute.'
    },
    {
      icon: 'PullRequest',
      title: 'How to contribute',
      description: 'The contribution is given through pull requests to the <a href="https://github.com/repills/repills-website" target="_blank">repills.com repository.</a>'
    },
    {
      icon: 'Star',
      title: 'Content quality',
      description: 'We ask you to share high-quality resources. This way you allow people to learn and keep themselves up to date in the best way.'
    },
    {
      icon: 'English',
      title: 'English content',
      description: 'The proposed resources must be in english.'
    }
  ];

  return (
    <div>
      <PageBlock
        title="Welcome to the contribution page!"
        description="Some tips before you start adding your first resource:"
        align="CENTER"
      >
        <FeatureListStyle
          features={features}
          style={{marginTop: '60px'}}
        />

        <LastSentence>Every contribution is really appreciated.</LastSentence>

        <ActionsStyle>
          <Button
            label="Ok, I got"
            onClick={handleOnConfirm}
          />
        </ActionsStyle>
      </PageBlock>

    </div>
  );
};

export default Help;
