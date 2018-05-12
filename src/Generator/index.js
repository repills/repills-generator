import React from 'react';
import dataFields from '../data/fields';
import * as c from 'repills-react-components';
import slugify from 'slugify';
import {
  Help,
  PullRequest
} from '../components';
import {
  Modal,
  Button,
  TopNavigation,
  PageBlock
} from 'repills-react-components';
import update from 'immutability-helper';
import Validator from 'validatorjs';

import base64url from 'base64url';
import styled from 'styled-components';
import validations from '../data/validators';

import {
  helpGuide,
  page,
  step,
  stepErrors,
  stepField,
  navigation,
  stepFooter,
  stepNavigation,
  stepNavigationHelp,
  pullRequest,
  footer
} from './style';

const HelpGuideStyle = styled.div`${helpGuide}`;
const PullRequestStyle = styled.div`${pullRequest}`;
const NavigationStyle = styled.div`${navigation}`;
const PageStyle = styled.div`${page}`;
const StepErrorsStyle = styled.div`${stepErrors}`;
const StepFieldStyle = styled.div`${stepField}`;
const StepFooter = styled.div`${stepFooter}`;
const StepNavigation = styled.div`${stepNavigation}`;
const StepNavigationHelp = styled.div`${stepNavigationHelp}`;
const StepStyle = styled.div`${step}`;
const FooterStyle = styled.footer`${footer}`;

const fieldsReferences = [
  'sections',
  'link',
  'title',
  'author',
  'publishedAt',
  'type',
  'topics',
  'suggestedBy'
];

const initialData = fieldsReferences.reduce((acc,key) => {
  acc[key] = {
    value: null,
    pristine: true,
    errors: []
  };
  return acc;
}, {});

class Generator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentFieldIndex: 0,
      dataFields,
      collectedData: initialData,
      showSnippet: false,
      showHelp: false,
      reachedStepIndex: 0,
      initialHelpVisible: false
    };
  }

  componentWillMount() {
    this.setState({ initialHelpVisible: !localStorage.initialHelp });
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDownTextField, false);
  }

  addNewResource = () => {
    this.setState({
      collectedData: initialData,
      reachedStepIndex: 0,
      currentFieldIndex: 0,
      showSnippet: false
    })
  };

  getFieldErrors = (fieldName,value) => {
    let errors = [];

    if (validations[fieldName]) {
      const validation = new Validator(
        { [fieldName]: value },
        { [fieldName]:validations[fieldName].rules },
        validations[fieldName].messages
      );

      if (validation.fails()) {
        errors = validation.errors.get(fieldName);
      }
    }

    return errors;
  };

  handleOnChange = field => params => {
    const { value, dirty } = field.handler(params);
    let errors = this.getFieldErrors(field.name, value);

    this.setState(
      state => ({ collectedData: update(
        state.collectedData,
        { [field.name]: {
          value: { $set: value },
          pristine: { $set: !dirty },
          errors: { $set: errors }
        } }
      ) })
    );
  };

  keyDownTextField = event => {
    if (event.keyCode === 13) {
      this.handleGoToNextStep();
    }
  };

  generateSnippet = () => {
    const { collectedData } = this.state;
    const body = fieldsReferences.reduce((acc, key, index) => {
      const value = collectedData[key].value;
      const field = dataFields[index](collectedData);
      const _value = field.renderForSnippet ? field.renderForSnippet() : value;
      acc.push(`${key}: ${_value}`);
      return acc;
    }, []).join('\n');

    if (collectedData['suggestedBy'].value) {
      localStorage.setItem('suggestedBy', collectedData['suggestedBy'].value);
    }

    return (
      `---
${body}
createdAt: ${new Date().toISOString()}
reference: ${this.getFileReference(false)}
slug: ${this.getFileName(false)}
---`);
  };

  getFileReference = (withExtension = true) => {
    const { collectedData  } = this.state;
    const url = collectedData['link'].value;
    return url ? `${base64url(url)}${withExtension ? '.md' : ''}` : null;
  };

  getFileName = (withExtension = true) => {
    const { collectedData  } = this.state;
    const title = collectedData['title'].value;
    return title ? `${slugify(`${collectedData.title.value} by ${collectedData.author.value}`, {remove: /[$*_–—+,~.()'"#!?\-:@]/g}).toLowerCase()}${withExtension ? '.md' : ''}` : null;
  };

  isFieldOk = fieldName => {
    const field = this.state.collectedData[fieldName];
    return !validations[fieldName] || (!field.pristine && field.errors.length === 0);
  };

  // skip allows to not consider the validation
  handleGoToNextStep = skip => {
    const {
      currentFieldIndex,
      reachedStepIndex
    } = this.state;

    if (currentFieldIndex !== null && (currentFieldIndex + 1 < fieldsReferences.length)) {

      if (skip || this.isFieldOk(fieldsReferences[currentFieldIndex])) {
        this.setState(state => {
          const newFieldIndex = state.currentFieldIndex + 1;
          const _reachedStepIndex = newFieldIndex > currentFieldIndex ? newFieldIndex : reachedStepIndex;
          return { currentFieldIndex: state.currentFieldIndex + 1, reachedStepIndex: _reachedStepIndex };
        });
      }

    } else {
      this.setState({
        showSnippet: true,
        currentFieldIndex: null
      });
    }
  };

  handleGoToPrevStep = () => {
    this.setState(state => ({ currentFieldIndex: state.currentFieldIndex - 1 }));
  };

  hasPrev = () => this.state.currentFieldIndex > 0;

  closeHelp = () => this.setState({ showHelp: false });

  hideInitialHelp = () => {
    localStorage.setItem('initialHelp', 'hidden');
    this.setState({ initialHelpVisible: false });
  };

  OnEditInfo = () => {
    this.setState({
      currentFieldIndex: 0,
      showSnippet: false
    });
  };

  renderCurrentStep = () => {
    const {
      collectedData,
      dataFields
    } = this.state;

    const {
      currentFieldIndex
    } = this.state;

    const field = dataFields[currentFieldIndex](collectedData);
    const Component = c[field.component];
    const data = collectedData[field.name];

    if(field.skip) {
      this.handleGoToNextStep(true);
      return;
    }

    return (
      <StepStyle>
        <PageBlock
          title={field.title}
          description={field.help}
          align="CENTER"
          simple
        >
          <StepFieldStyle>
            <Component
              handleOnChange={this.handleOnChange(field)}
              {...field}
            />
          </StepFieldStyle>
          {
            (data.errors && data.errors.length > 0) &&
            <StepErrorsStyle>
              {
                data.errors.map((e, index) => (
                  <div key={`error-${index}`}>{e}</div>
                ))
              }
            </StepErrorsStyle>
          }
          <StepFooter>
            <StepNavigation>
              {
                this.hasPrev() &&
                <Button
                  label="Previous"
                  onClick={this.handleGoToPrevStep}
                  skin="outline"
                  type="button"
                />
              }
              <Button
                disabled={!this.isFieldOk(field.name)}
                label="Next"
                onClick={this.handleGoToNextStep}
                type="button"
              />
            </StepNavigation>
            <StepNavigationHelp>or simply <strong>Enter ⏎</strong></StepNavigationHelp>
          </StepFooter>
        </PageBlock>
      </StepStyle>
    );
  };

  render() {

    const {
      collectedData,
      showSnippet,
      showHelp,
      initialHelpVisible
    } = this.state;

    return (
      <div>
        <NavigationStyle>
          <TopNavigation
            items={[
              {
                label: 'Info',
                onClick: () => this.setState({ showHelp: true }),
                hidden: initialHelpVisible
              },
              {
                label: 'repills.com',
                href: 'https://repills.com'
              }
            ]}
          />
        </NavigationStyle>
        <PageStyle>
          {
            initialHelpVisible &&
            <HelpGuideStyle>
              <Help
                handleOnConfirm={this.hideInitialHelp}
              />
            </HelpGuideStyle>
          }

          { !initialHelpVisible && !showSnippet && this.renderCurrentStep() }

          <Modal
            handleClose={this.closeHelp}
            open={showHelp}
            size="L"
          >
            <div style={{padding: '40px 20px'}}>
              <Help
                handleOnConfirm={this.closeHelp}
              />
            </div>
          </Modal>

          {
            showSnippet &&
            <PullRequestStyle>
              <PullRequest
                fileName={this.getFileName()}
                handleEditInfo={this.OnEditInfo}
                resourceData={collectedData}
                snippet={this.generateSnippet()}
                handleAddNewResource={this.addNewResource}
              />
            </PullRequestStyle>
          }

          <FooterStyle>
            <a
              href="https://github.com/repills/repills-generator/issues"
              rel="noopener noreferrer"
              target="_blank"
            >
              Report issue or suggestion
            </a>
          </FooterStyle>

        </PageStyle>
      </div>
    );
  }
}

export default Generator;
