import React, { useRef, useEffect } from 'react'
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
    const canvasEl = canvasRef.current
    const ctx = canvasEl.getContext('2d')
    const howl = new Howl({
      src: [ '/audio/your-turn.mp3' ],
      autoplay: true,
      volume: 1
    })

    let id = 0
    let prevTitle = document.title
    createFrames().then((imgs) => {
      let i = 1
      id = setInterval(() => {
        i = 1 - i
        updateFavicon(imgs[ i ], canvasEl, ctx)
        document.title = i ? 'Your turn' : prevTitle
      }, 500)
    })

    return () => {
      howl.unload()
      clearInterval(id)
      document.title = prevTitle
      loadImage('/img/lamp-3.svg').then((img) => updateFavicon(img, canvasEl, ctx))
    }
  }, [])

  return <canvas ref={canvasRef} width="16px" height="16px"
                 style={{ visibility: 'hidden', position: 'absolute', width: '16px', height: '16px' }}/>
}
