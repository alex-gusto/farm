import React, { Component, Fragment } from 'react'
import QuizBlock from '@/components/QuizBlock'
import FarmAnimal from '~/front/components/FarmAnimal'

class QuizBonus extends Component {
  state = {
    animals: null
  }

  onSuccess = (animals) => {
    this.setState({ animals })
    setTimeout(this.props.onClose, 1000)
  }

  render () {
    const { gameId, userId, onClose } = this.props
    const { animals } = this.state
    const content = () => {
      if (animals) {
        return (
          <Fragment>
            <h2 className="h2">{`You've got ${animals.map(animal => animal.name).join(', ')}!`}</h2>
            {animals.map((animal, key) => <FarmAnimal isNameHidden={true}
                                                      className="quiz-bonus-animal"
                                                      key={key} {...animal} />)}
          </Fragment>
        )
      }

      return (
        <QuizBlock onSuccess={this.onSuccess}
                   onClose={onClose}
                   getUrl={`/games/quiz/${gameId}/${userId}`}
                   postUrl={`/games/quiz/${gameId}/${userId}`}
        />
      )
    }

    return (
      <div className="quiz-bonus">
        {
          content()
        }
      </div>
    )
  }
}

export default QuizBonus
