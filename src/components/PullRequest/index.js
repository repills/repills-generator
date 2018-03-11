import React from 'react';
import {
  CodePreview,
  ResourcePreview,
  Button
} from 'repills-react-components';
import styled from 'styled-components';
import { types } from 'repills-config';
import {
  base,
  title,
  p,
  codeBlock,
  actions,
  preview
} from './style';

const BaseStyle = styled.div`${base}`;
const TitleStyle = styled.h2`${title}`;
const ActionsStyle = styled.div`${actions}`;
const CodeBlockStyle = styled.div`${codeBlock}`;
const PreviewStyle = styled.div`${preview}`;
const PStyle = styled.p`${p}`;
const baseUrlGitHubRepo = 'https://github.com/repills/repills-website/';

class PullRequest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showSnippet: false
    };
  }

  handleToggleSnippet = () => this.setState(state => ({ showSnippet: !state.showSnippet }));

  getPullRequestUrl = () => {
    const {
      fileName,
      resourceData,
      snippet
    } = this.props;
    const publishedAt = resourceData.publishedAt.value;
    const year = publishedAt ? parseInt(publishedAt) : 'NO_DATE';
    return `${baseUrlGitHubRepo}${resourceData.sections.value}/${year}/new/develop/?filename=${fileName}&value=${encodeURI(snippet)}`;
  };

  render() {

    const {
      handleEditInfo,
      handleAddNewResource,
      snippet,
      fileName,
      resourceData
    } = this.props;

    const {
      showSnippet
    } = this.state;

    const type = types[resourceData.type.value];

    return (
      <BaseStyle>
        <div>
          <button onClick={handleEditInfo}>Edit info</button>
          <button onClick={this.handleToggleSnippet}>{ showSnippet ? 'Hide' : 'Show'} snippet</button>
        </div>

        {
          showSnippet &&
          <div>
            <CodeBlockStyle>
              <CodePreview
                title="Filename"
              >
                {fileName}
              </CodePreview>
            </CodeBlockStyle>
            <CodeBlockStyle>
              <CodePreview
                title="Resource definition"
              >
                {snippet}
              </CodePreview>
            </CodeBlockStyle>
          </div>
        }

        <TitleStyle>Create a pull request</TitleStyle>
        <PStyle>
          Well done! Now you are able to propose the resource on the Repills GitHub repository.
        </PStyle>
        <PStyle>
          By clicking the following button it will populate the pull request page with the resource filename and the
          code snippet that represents the resource itself.
        </PStyle>

        <ActionsStyle>
          <Button
            label="Go to the PR"
            onClick={() => window.open(this.getPullRequestUrl(),'_blank') }
          />
        </ActionsStyle>

        <PStyle>
          Once a pull request is made it will be reviewed and if everything is ok it'll be merged in and appear on repills.com. Here is a preview!
          Thanks again for your contribution.
        </PStyle>

        <PreviewStyle>
          <ResourcePreview
            author={resourceData['author'].value}
            color={type.color}
            link={resourceData['link'].value}
            publishedAt={resourceData['publishedAt'].value}
            title={resourceData['title'].value}
            typeLabel={type.label.singular}
          />
        </PreviewStyle>

        <ActionsStyle>
          <Button
            label="Add new resource"
            onClick={handleAddNewResource}
          />
        </ActionsStyle>

      </BaseStyle>
    );
  }
}

export default PullRequest;
