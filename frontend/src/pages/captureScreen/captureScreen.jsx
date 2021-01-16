import React, { useRef, useEffect } from "react"

import "./captureScreen.styles.scss"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

const CaptureScreen = () => {
    const imageCanvas = useRef(null)

    useEffect(()=>{
        if (!('mediaDevices' in navigator)){
            navigator.mediaDevices = {}
        } 
        // polyfill for devices that don't support the getUsermedia 
        if (!('getUserMedia' in navigator.mediaDevices)){
            navigator.mediaDevices.getUserMedia = constraints => {
                let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia
                if (!getUserMedia) {
                    return Promise.reject(new Error('getUserMedia is not implemented'))
                }
                return new Promise((resolve, reject) => {
                    getUserMedia.call(navigator, constraints, resolve, reject)
                })
            }
        }

        //set stream object to video element
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        }).then(stream => {
            let video = document.querySelector(".fridge-capture")
            video.srcObject = stream
            video.addEventListener('loadedmetadata', () => {
                video.play()
            })
            console.log("success")
        })
    },[])

    return(
        <div className="capture-screen">
            <video className="fridge-capture"/>
            <canvas ref={imageCanvas} className="image-canvas"/>
            <button className="capture-btn">
                <FontAwesomeIcon icon={faCamera}/>
            </button>
            <div className="image-picker">
                <input className="image-select" type="file" accept="image/*"></input>
            </div>
        </div>
    )
}

export default CaptureScreen