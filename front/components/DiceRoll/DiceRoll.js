import React, { useState, useEffect, useRef, useContext } from 'react'
import api from '~/front/api'
import FarmAnimal from '~/front/components/FarmAnimal'
import gsap from 'gsap'
import { NotificationContext } from '~/front/providers/NotificationProvider'

// import GSDevTools from 'assets/js/vendors/GSDevTools'
//
// gsap.registerPlugin(GSDevTools)

export default function DiceRoll ({ gameId, userId, onClose }) {
  const [ result, changeResult ] = useState([])
  const notifications = useContext(NotificationContext)
  const rocketEl = useRef(null)

  const rocketFly = () => {
    const tl = gsap.timeline({})
    tl.to(rocketEl.current, {
        y: -window.innerHeight * 1.3,
        duration: 3,
        ease: 'power3.out'
      }, '0')
      .from('.dice-animal', {
        y: -window.innerHeight / 2,
        x (i) {
          if (i) return -100
          return 100
        },
        rotation (i) {
          if (i) return -420
          return 360
        },
        ease: 'power2.in',
        scale: 0,
        stagger: 0.1,
        duration: 1
      }, '0+=0.2')

    return tl
  }

  const animalsDisappear = () => {
    gsap.to('.dice-animal', {
      duration: 0.3,
      ease: 'power1.out',
      y: '100%',
      opacity: 0
    }).then(onClose)
  }

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.put(`/games/${gameId}/${userId}/make-move`)
        changeResult(data.diceAnimals)
      } catch ({ response }) {
        notifications.show({
          content: response.data,
          type: 'danger'
        })
      } finally {
        rocketFly().then(animalsDisappear)
      }
    })()
  }, [ rocketEl ])

  return (
    <div className="dice-roll">
      <img ref={rocketEl} src="/img/rocket.svg" alt="" className="dice-rocket"/>

      {result.map((animal, key) => <FarmAnimal className='dice-animal' isNameHidden={true}
                                               key={key} {...animal}/>)}
    </div>
  )
}
