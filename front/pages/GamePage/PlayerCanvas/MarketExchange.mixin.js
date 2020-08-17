import get from 'lodash/get'
import api from '~/front/api'

export default (superclass) => class extends superclass {
  updateFormData (key, value) {
    this.setState((state) => {
      const { formData } = state
      formData[ key ] = value
      return state.formData = formData
    })
  }

  decrement = () => {
    const { count } = this.state.formData
    if (!count) return

    this.setState({
      formData: {
        count: count - 1
      }
    })
  }

  increment = () => {
    const { count } = this.state.formData

    this.setState({
      formData: {
        count: (count || 0) + 1
      }
    })
  }

  exchangeAnimals = async () => {
    const body = Object.entries(this.state.formData).reduce((acc, [ key, value ]) => {
      acc[ key ] = get(value, 'id', value)
      return acc
    }, {})

    try {
      await api.post(`/market/${this.gameId}/${this.userId}`, body)
      this.resetChosenAnimals()
    } catch ({ response }) {
      this.context.show({
        content: response.data,
        type: 'danger'
      })
    }
  }

  getMarket = async () => {
    try {
      const { data } = await api.get(`/market/${this.gameId}`)
      const market = data.reduce((acc, { exchangeList, animalId }) => {
        acc[ animalId ] = exchangeList
        return acc
      }, {})

      this.setState({ market })
    } catch (e) {
      console.log(e)
    }
  }

  resetChosenAnimals = () => {
    this.updateFormData('to')
    this.updateFormData('from')
  }

  selectAnimal = (animal) => {
    const { formData } = this.state

    if (formData.from) {
      this.updateFormData('to', animal)
    } else {
      this.updateFormData('from', animal)
    }
  }
}
