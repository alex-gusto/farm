import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { Howl } from 'howler'

export default function DynamicMetaData () {
  const canvasRef = useRef(null)
  const favicon = document.getElementById('favicon')

  const loadImage = (src) => {
    return new Promise(resolve => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.src = src
    })
  }

  const createFrames = () => {
    return Promise.all([ '/img/lamp.svg', '/img/lamp-2.svg' ].map(loadImage))
  }

  const updateFavicon = (img, canvasEl, ctx) => {
    ctx.drawImage(img, 0, 0, canvasEl.width * img.naturalWidth / img.naturalHeight, canvasEl.height)
    favicon.href = canvasEl.toDataURL('image/png')
  }

  useEffect(() => {
    const frames = { number: 0 }
    const canvasEl = canvasRef.current
    const ctx = canvasEl.getContext('2d')
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.2, yoyo: true, defaults: { ease: 'steps(1)' } })
    const howl = new Howl({
      src: [ '/audio/your-turn.mp3' ],
      autoplay: true,
      volume: 0
    })

    createFrames().then((imgs) => {
      tl.to(frames, {
        number: imgs.length - 1,
        onUpdate () {
          updateFavicon(imgs[ frames.number ], canvasEl, ctx)
        }
      })
    })

    return () => {
      tl.kill()
      howl.unload()
      loadImage('/img/lamp-3.svg').then((img) => updateFavicon(img, canvasEl, ctx))
    }
  }, [])

  return <canvas ref={canvasRef} width="16px" height="16px"
                 style={{ visibility: 'hidden', position: 'absolute', width: '16px', height: '16px' }}/>
}
