import React, { Component } from 'react'
import api from '~/front/api'
import { withRouter } from 'react-router-dom'
import { NotificationContext } from '~/front/providers/NotificationProvider'
import FarmAnimal from '../FarmAnimal'
import get from 'lodash/get'

class AnimalsMarket extends Component {
  static contextType = NotificationContext

  constructor (props) {
    super(props)

    this.state = {
      list: [],
      formData: {
        from: undefined,
        to: undefined,
        count: undefined
      }
    }
  }

  get gameId () {
    const { match: { params: { gameId } } } = this.props
    return gameId
  }

  componentDidMount () {
    this.getList()
  }

  componentWillUnmount () {
  }

  async getList () {
    try {
      const { data } = await api.get(`/market/${this.gameId}`)
      this.updateList(data)
    } catch (err) {
      console.warn(err)
    }
  }

  updateList (list) {
    this.setState({
      list
    })
  }

  updateFormData (key, value) {
    this.setState((state) => {
      const { formData } = state
      formData[ key ] = value
      return state.formData = formData
    })
  }

  onAnimalClick (animal) {
    const { formData } = this.state

    if (formData.from) {
      this.updateFormData('to', animal)
    } else {
      this.updateFormData('from', animal)
    }
  }

  exchangeAnimals = async () => {
    const { onClose } = this.props
    const body = Object.entries(this.state.formData).reduce((acc, [ key, value ]) => {
      acc[ key ] = get(value, 'id', value)
      return acc
    }, {})

    try {
      await api.post(`/market/${this.gameId}`, body)
      onClose()
    } catch ({ response }) {
      this.context.show({
        content: response.data,
        type: 'danger'
      })
    }
  }

  resetChosenAnimals = () => {
    this.updateFormData('to')
    this.updateFormData('from')
  }

  render () {
    const { list, formData } = this.state

    const visibleList = list.map((item, key) => {

      if (formData.from) {
        const exchanger = item.exchangeList.find(k => k.id === formData.from.id)

        return <FarmAnimal
          key={key}
          {...item.animal}
          coef={exchanger && exchanger.coef}
          selectable={!!exchanger}
          onClick={() => this.onAnimalClick(item.animal)}
        />
      } else {
        return <FarmAnimal
          key={key}
          {...item.animal}
          onClick={() => this.onAnimalClick(item.animal)}
        />
      }
    })

    return (
      <div className="animals-market">
        <h2 className="text-center">Select animals to change</h2>
        <div className="row">
          <div className="col-sm-3">
            <div className="animals-market__form">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  Change {get(formData, 'from.name', '-')} to {get(formData, 'to.name', '-')}
                </div>

                <button onClick={this.resetChosenAnimals}>x</button>
              </div>

              <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend" id="button-addon3">
                  <button className="btn btn-outline-secondary" type="button">-</button>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Count"
                  onChange={({ target: { value } }) => this.updateFormData('count', value)}
                  value={formData[ 'count' ]}
                />

                <div className="input-group-append" id="button-addon4">
                  <button className="btn btn-outline-secondary" type="button">+</button>
                </div>
              </div>

              <button className="btn btn-primary btn-sm" onClick={this.exchangeAnimals}>
                Exchange
              </button>
            </div>
          </div>
          <div className="col-sm-9">
            <div className="animals-market__list">
              {
                visibleList
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(AnimalsMarket)
