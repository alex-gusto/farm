import React, { Component } from 'react'
import { Howl } from 'howler'

class AudioPlayer extends Component {
    constructor(props) {
        super(props)

        this.init()
    }

    init() {
        new Howl({
            src: ['/audio/03386.mp3'],
            autoplay: true,
            loop: true,
            volume: 0.1
        });
    }

    render() {
        return <div/>
    }
}

export default AudioPlayer

