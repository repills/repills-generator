import React from 'react';
import dataFields from '../data/fields';
import * as c from 'repills-react-components';
import {
  Help,
  PullRequest
} from '../components';
import {
  Modal,
  Button,
  TopNavigation
} from 'repills-react-components';
import update from 'immutability-helper';
import Validator from 'validatorjs';

import base64url from 'base64url';
import styled from 'styled-components';
import validations from '../data/validators';

import {
  helpGuide,
  helpStyle,
  label,
  page,
  step,
  stepBody,
  stepErrors,
  stepField,
  navigation,
  stepFooter,
  stepHeader,
  stepNavigation,
  stepNavigationHelp,
  stepStatus,
  footer
} from './style';

const HelpGuideStyle = styled.div`${helpGuide}`;
const HelpStyle = styled.p`${helpStyle}`;
const NavigationStyle = styled.p`${navigation}`;
const LabelStyle = styled.h4`${label}`;
const PageStyle = styled.div`${page}`;
const StepBodyStyle = styled.div`${stepBody}`;
const StepErrorsStyle = styled.div`${stepErrors}`;
const StepFieldStyle = styled.div`${stepField}`;
const StepFooter = styled.div`${stepFooter}`;
const StepHeader = styled.div`${stepHeader}`;
const StepNavigation = styled.div`${stepNavigation}`;
const StepNavigationHelp = styled.div`${stepNavigationHelp}`;
const StepStatus = styled.div`${stepStatus}`;
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

const collectedData = fieldsReferences.reduce((acc,key) => {
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
      collectedData,
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
      if (value) {
        const field = dataFields[index](collectedData);
        const _value = field.renderForSnippet ? field.renderForSnippet() : value;
        acc.push(`${key}: ${_value}`);
      }
      return acc;
    }, []).join('\n');

    if (collectedData['suggestedBy'].value) {
      localStorage.setItem('suggestedBy', collectedData['suggestedBy'].value);
    }

    return (
      `---
${body}
createdAt: ${new Date().toISOString()}
reference: ${this.getFileName(false)}
---`);
  };

  getFileName = (withExtension = true) => {
    const { collectedData  } = this.state;
    const url = collectedData['link'].value;
    return url ? `${base64url(url)}${withExtension ? '.md' : ''}` : null;
  };

  isFieldOk = fieldName => {
    const field = this.state.collectedData[fieldName];
    return !validations[fieldName] || (!field.pristine && field.errors.length === 0);
  };

  handleGoToNextStep = () => {
    const {
      currentFieldIndex,
      reachedStepIndex
    } = this.state;

    if (currentFieldIndex !== null && (currentFieldIndex + 1 < fieldsReferences.length)) {

      if (this.isFieldOk(fieldsReferences[currentFieldIndex])) {
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

    return (
      <StepStyle>
        <StepHeader>
          <StepStatus>
            Step <strong>{currentFieldIndex + 1}</strong> of {fieldsReferences.length}
          </StepStatus>
          <LabelStyle>
            {field.title}
          </LabelStyle>
          {
            field.help &&
            <HelpStyle dangerouslySetInnerHTML={{ __html: field.help }} />
          }
        </StepHeader>
        <StepBodyStyle>
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
        </StepBodyStyle>
        <StepFooter>
          <StepNavigation>
            {
              this.hasPrev() &&
              <Button
                label="Previous"
                onClick={this.handleGoToPrevStep}
                skin="ghost"
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
      <PageStyle>

        <NavigationStyle>
          <TopNavigation
            items={[
              {
                label: 'Info',
                onClick: () => this.setState({ showHelp: true })
              },
              {
                label: 'repills.com',
                href: 'http://repills.com'
              }
            ]}
          />
        </NavigationStyle>

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
        >
          <Help
            handleOnConfirm={this.closeHelp}
          />
        </Modal>

        {
          showSnippet &&
          <PullRequest
            fileName={this.getFileName()}
            handleEditInfo={this.OnEditInfo}
            resourceData={collectedData}
            snippet={this.generateSnippet()}
          />
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
    );
  }
}

export default Generator;