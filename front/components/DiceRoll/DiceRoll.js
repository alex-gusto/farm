import React, { useState, useEffect } from 'react'
import api from '~/front/api'
import FarmAnimal from '~/front/components/FarmAnimal'

export default function DiceRoll({ gameId, onClose }) {
    const [result, changeResult] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const { data } = await api.put(`/games/${gameId}/make-move`)
                changeResult(data.diceAnimals)
            } catch (err) {
                console.log(err)
            } finally {
                // setTimeout(onClose, 2000)
            }
        })()
    }, [])

    return (
        <div className="dice-roll" onClick={onClose}>
            {result.map((animal, key) => <FarmAnimal isNameHidden={true} key={key} {...animal} />)}
        </div>
    )
}
