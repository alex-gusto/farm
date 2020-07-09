import api from '~/front/api'
import BaseButton from 'base/BaseButton'
import { withRouter } from 'react-router-dom'
import BaseTextField from 'base/BaseTextField'
import React, { Component, useState } from 'react'
import { NotificationContext } from '~/front/providers/NotificationProvider'

class HomePage extends Component {
    static contextType = NotificationContext

    constructor(props) {
        super(props)

        this.state = {
            gameId: '',
            name: ''
        }
    }

    // methods
    changeGameId = (value) => {
        this.setState({
            gameId: value
        })
    }

    changeName = (value) => {
        this.setState({
            name: value
        })
    }

    createGame = async () => {
        const { history } = this.props
        const { data: { gameId } } = await api.post('/games/create', { name: this.state.name })
        history.push(`/${gameId}`)

        const { show } = this.context
        show('Hello', 0)
    }

    joinGame = async () => {
        const { history } = this.props
        try {
            const { data: { gameId } } = await api.put(`/games/${this.state.gameId}`, { name: this.state.name })
            history.push(`/${gameId}`)
        } catch (err) {
        }
    }

    render() {
        return (
            <div className="home-page">
                <BaseTextField
                    value={this.state.name}
                    placeholder="Enter your name"
                    onChange={this.changeName}
                    className="form-spacer"
                />

                <div className="row">
                    <div className="col-6">
                        <BaseButton onClick={this.createGame}>New game</BaseButton>
                    </div>

                    <div className="col-6">
                        <BaseTextField
                            className="form-spacer"
                            value={this.state.gameId}
                            placeholder="game ID"
                            onChange={this.changeGameId}
                        />
                        <BaseButton onClick={this.joinGame}>Join game</BaseButton>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(HomePage)
