import React, { useState, useEffect } from 'react'
import api from '~/front/api'
import FarmAnimal from '~/front/components/FarmAnimal'

export default function DiceRoll({ gameId, onClose }) {
    const [result, changeResult] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const { data, status } = await api.put(`/games/${gameId}/make-move`)
                if (status === 201) {
                    alert(data)
                } else {
                    changeResult(data.diceAnimals)
                }
            } catch ({ response }) {
                this.context.show({
                    content: response.data,
                    type: 'danger'
                })
            } finally {
                setTimeout(onClose, 1500)
            }
        })()
    }, [])

    return (
        <div className="dice-roll" onClick={onClose}>
            {result.map((animal, key) => <FarmAnimal isNameHidden={true} key={key} {...animal} />)}
        </div>
    )
}
