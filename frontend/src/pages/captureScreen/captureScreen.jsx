import React, { useRef, useEffect, useState } from "react"

import "./captureScreen.styles.scss"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

import GenerateRecipePage from "../generateRecipePage/generateRecipePage"

const CaptureScreen = () => {
    const fileReader = useRef(null)
    const [hasVideoAccess, setVideoAccess] = useState(false)
    const [isImageTaken, setImageTaken] = useState(false)
    const [picture, setPicture] = useState('')
    const [ingArr, setIngArr] = useState([
        {"name": "milk"},
        {"name": "cheese"},
    ])
    const [hideIngPage, setHideIngPage] = useState(true)

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
            setVideoAccess(true)
            let video = document.querySelector(".fridge-capture")
            video.srcObject = stream
            video.addEventListener('loadedmetadata', () => {
                video.play()
            })
            
        })
    },[])

    const takePicture = _ => {
        setImageTaken(true)
        let canvas = document.querySelector(".image-canvas")
        let video = document.querySelector(".fridge-capture")
        let context = canvas.getContext('2d')
        context.drawImage(video, 0, 0, canvas.width, video.videoHeight/ (video.videoWidth/canvas.width))
        video.srcObject.getVideoTracks().forEach(track => {
            track.stop()
        })
        setVideoAccess(false)
        setPicture(dataURItoBlob(canvas.toDataURL()))
    }

    const sendImage = () => { 
        let id = new Date().toISOString()
        const formData = new FormData()
        formData.append("image", picture, id + '.png')
        fetch('url', {
            method: 'POST',
            body: formData
        })
    }

    useEffect(_ => console.log(picture), [picture])

    const dataURItoBlob = dataURI => {
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        var blob = new Blob([ab], {type: mimeString});
        return blob; 
    }

    const convertFileToBlob = file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", function () {
            setPicture(dataURItoBlob(reader.result));
          }, false);
    }

    const addIng = (ingName) => {
        let ingArrCopy = ingArr.slice()
        ingArrCopy.push({"name":ingName})
        setIngArr(ingArrCopy)
    }

    const delIng = (idx) => {
        let ingArrCopy = ingArr.slice()
        ingArrCopy.splice(idx, 1)
        setIngArr(ingArrCopy)
    }

    return(
        <div className="page">
            <div className="capture-screen container">
                <div className="capture-screen-prompt">Take a picture of your fridge :D</div>
                {hasVideoAccess ? <video className="fridge-capture"/> : picture ? "" : <div className="no-video-access">No camera access</div>}
                <canvas className={`image-canvas ${isImageTaken ? "": "hidden"}`} width="320px" height="240px"/>
                <button className="capture-btn" onClick={takePicture} disabled={isImageTaken||!hasVideoAccess ? true:false}>
                    <FontAwesomeIcon icon={faCamera}/>
                </button>
                <div className="buttons-container">
                <div className="image-picker">
                    <input ref={fileReader} onChange={e=>{convertFileToBlob(fileReader.current.files[0])}} className="image-select" type="file" accept="image/*"></input>
                </div>
                    <button className="get-ingredients-btn" onClick={sendImage}> 
                        Get Recipes
                    </button>
                    <button className="edit-ingredients-btn" onClick={()=>setHideIngPage(false)}>add your own ingredients</button>                
                </div>
            </div>
            <GenerateRecipePage setHideIngPage={setHideIngPage} isHidden={hideIngPage} ingArr={ingArr} addIng={addIng} delIng={delIng}/>
        </div>
    )
}

export default CaptureScreen