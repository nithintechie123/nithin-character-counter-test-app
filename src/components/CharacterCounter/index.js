import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {
  AppContainer,
  UserInputsContainer,
  CountHeadingContainer,
  CountDescription,
  InputHeadingContainer,
  CharacterCounterHeading,
  FormContainer,
  UserInputField,
  AddButton,
  UserInputValueContainer,
  UserInputItem,
  ImageElement,
  ParagraphElement,
} from '../../styledComponents'

class CharacterCounter extends Component {
  state = {userInputList: [], userInput: ''}

  onChangeInputText = event => {
    this.setState({userInput: event.target.value})
  }

  onClickAddButton = event => {
    event.preventDefault()
    const {userInput} = this.state

    const newUser = {
      id: uuidv4(),
      newInputValue: userInput,
      length: userInput.length,
    }

    this.setState(prevState => ({
      userInputList: [...prevState.userInputList, newUser],
      userInput: '',
    }))
  }

  renderNoUserInputView = () => (
    <ImageElement
      src="https://assets.ccbp.in/frontend/react-js/no-user-inputs-img.png"
      alt="no user inputs"
    />
  )

  renderUserInputsView = () => {
    const {userInputList} = this.state

    const InputsListLength = userInputList.length > 0

    return (
      <UserInputsContainer>
        <CountHeadingContainer>
          <CountDescription>
            Count the characters like a Boss...
          </CountDescription>
        </CountHeadingContainer>
        {InputsListLength ? (
          <UserInputValueContainer>
            {userInputList.map(eachUser => (
              <UserInputItem key={eachUser.id}>
                <ParagraphElement>
                  {eachUser.newInputValue}: {eachUser.length}
                </ParagraphElement>
              </UserInputItem>
            ))}
          </UserInputValueContainer>
        ) : (
          this.renderNoUserInputView()
        )}
      </UserInputsContainer>
    )
  }

  renderInputBarContainer = () => {
    const {userInput} = this.state
    return (
      <InputHeadingContainer>
        <CharacterCounterHeading>Character Counter</CharacterCounterHeading>
        <FormContainer type="form" onSubmit={this.onClickAddButton}>
          <UserInputField
            type="text"
            value={userInput}
            placeholder="Enter the Characters here"
            onChange={this.onChangeInputText}
          />
          <AddButton type="submit">Add</AddButton>
        </FormContainer>
      </InputHeadingContainer>
    )
  }

  render() {
    return (
      <AppContainer>
        {this.renderUserInputsView()}
        {this.renderInputBarContainer()}
      </AppContainer>
    )
  }
}

export default CharacterCounter
