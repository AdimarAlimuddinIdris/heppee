
import { useState, useRef } from 'react'

export default function useImageEditor() {

    const [url, setUrl] = useState()
    const [file, setFile] = useState()
    const [lists, setLists] = useState([])
    const inputRef = useRef()

    const onInputHandler = ({ target }) => {
        console.log('recieving file');
        const image = target?.files[0]
        if (image) {
            setFile(image)
            const reader = new FileReader()
            reader.onload = () => {
                setLists(p => ([...p, { file: image, url: reader.result, name: image?.name || '' }]))
            }
            reader.readAsDataURL(image)
        }
    }

    function select() { inputRef?.current?.click() }
    function reset() { setFile(null); setUrl(null) }

    function read(caller = () => { }) {
    }

    const removeList = (image) => {
        setLists(p => p.filter(s => s != image))
    }

    const Input = () => <input
        hidden={true} ref={inputRef}
        onChange={onInputHandler} type='file'
        accept='image/*'
    />

    return {
        file, url, select, Input, read, setFile, setUrl,
        reset, lists, removeList,
    }
}