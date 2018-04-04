import React from 'react';
import {
  CodePreview,
  ResourcePreview,
  Button,
  PageBlock,
  Message
} from 'repills-react-components';
import styled from 'styled-components';
import { types } from 'repills-config';
import {
  base,
  codeBlock,
  actions,
  preview
} from './style';

const BaseStyle = styled.div`${base}`;
const ActionsStyle = styled.div`${actions}`;
const CodeBlockStyle = styled.div`${codeBlock}`;
const PreviewStyle = styled.div`${preview}`;
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
    const year = publishedAt ? parseInt(publishedAt,10) : 'NO_DATE';
    return `${baseUrlGitHubRepo}new/develop/src/resources/${year}/resource?filename=${fileName}&value=${encodeURI(snippet)}`;
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

        <Message
          title="Well done! Now you are able to propose the resource on the Repills GitHub repository."
          icon="Checked"
        />

        <PageBlock
          title="Create the pull request"
          description="By clicking the following button it will populate the pull request page with the resource filename and the
          code snippet that represents the resource itself."
          style={{ marginTop: '36px' }}
          simple
        >
          <ActionsStyle>
            <Button
              label="Go to the PR"
              onClick={() => window.open(this.getPullRequestUrl(),'_blank') }
            />
          </ActionsStyle>
          <div style={{ marginTop: '10px' }}>
            <Button
              autoWidth
              skin="ghost"
              onClick={handleEditInfo}
              label="Edit info"
              style={{ marginRight: '15px' }}
            />
            <Button
              autoWidth
              skin="ghost"
              onClick={this.handleToggleSnippet}
              label={`${ showSnippet ? 'Hide' : 'Show'} snippets`}
            />
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
        </PageBlock>

        <PageBlock
          title="The outcome"
          description="Once a pull request is made it will be reviewed and if everything is ok it'll be merged in and appear on repills.com. Here is a preview!"
          style={{ marginTop: '36px' }}
          simple
        >
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
        </PageBlock>

        <PageBlock
          title="Contribute again"
          description="Thanks again for your contribution. Click on the following button to add a new resource. Make sure that you'd finished the previous activity. All collected data will be cleaned."
          style={{ marginTop: '52px' }}
          simple
        >
          <ActionsStyle>
            <Button
              skin="outline"
              label="Add new resource"
              onClick={handleAddNewResource}
            />
          </ActionsStyle>
        </PageBlock>
      </BaseStyle>
    );
  }
}

export default PullRequest;
