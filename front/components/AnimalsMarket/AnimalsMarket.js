import React, { Component } from 'react'
import api from '~/front/api'
import { withRouter } from "react-router-dom";
import FarmAnimal from '../FarmAnimal'
import BaseTextField from 'base/BaseTextField'
import get from 'lodash/get'

class AnimalsMarket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            formData: {
                from: undefined,
                to: undefined,
                count: 0
            }
        }
    }

    get gameId() {
        const { match: { params: { gameId } } } = this.props
        return gameId
    }

    componentDidMount() {
        this.getList()
    }

    componentWillUnmount() {
    }


    async getList() {
        try {
            const { data } = await api.get(`/market/${this.gameId}`)
            this.updateList(data)
        } catch (err) {
            console.warn(err)
        }
    }

    updateList(list) {
        this.setState({
            list
        })
    }

    updateFormData(key, value) {
        this.setState((state) => {
            const { formData } = state
            formData[key] = value
            return state.formData = formData
        })
    }

    onAnimalClick(animal) {
        const { formData } = this.state

        if (formData.from) {
            this.updateFormData('to', animal)
        } else {
            this.updateFormData('from', animal)
        }
    }

    exchangeAnimals = async () => {
        const { onClose } = this.props
        const body = Object.entries(this.state.formData).reduce((acc, [key, value]) => {
            acc[key] = get(value, 'id', value)
            return acc
        }, {})

        try {
            await api.post(`/market/${this.gameId}`, body)
            onClose()
        } catch (err) {
            console.dir(err)
        }
    }

    render() {
        const { list, formData } = this.state

        const visibleList = list.map((item, key) => {

            if (formData.from) {
                const isSelectable = item.exchangeList.some(k => k.id === formData.from.id)

                return <FarmAnimal
                    key={key} {...item.animal}
                    selectable={isSelectable}
                    onClick={() => this.onAnimalClick(item.animal)}
                />
            } else {
                return <FarmAnimal
                    key={key} {...item.animal}
                    onClick={() => this.onAnimalClick(item.animal)}
                />
            }
        })

        return (
            <div className="animals-market">
                <div className="animals-market__form">
                    <div>
                        Change {get(formData, 'from.name', '-')} to {get(formData, 'to.name', '-')}
                    </div>

                    <div>
                        <button>x</button>
                    </div>

                    <BaseTextField
                        value={formData['count']}
                        onChange={this.updateFormData.bind(this, 'count')}
                    />

                    <button onClick={this.exchangeAnimals}>
                        Exchange
                    </button>
                </div>

                <div className="animals-market__list">
                    {
                        visibleList
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(AnimalsMarket)
