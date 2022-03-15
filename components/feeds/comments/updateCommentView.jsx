
import { useRef, useEffect } from 'react';
import ButtonThird from '../../elements/buttons/ButtonThird';
import PrimaryBUtton from '../../elements/buttons/PrimaryButton'
import { updateComment } from './commentApi';


export default function CommentUpdate({ data, show, setIsEditing }) {
    if (!show) return null;
    const bodyRef = useRef()

    useEffect(() => {
        bodyRef?.current?.select()
    }, [])
    const onUpdate = async () => {
        await updateComment(data?.id, {
            body: bodyRef?.current?.value
        })
        setIsEditing(false)
    }

    return (
        <div className='mb-2'>
            <textarea className='bg-gray-100 max-h-[200px] min-h-[80px] p-2 rounded-xl' ref={bodyRef} cols="30" rows="3">{data?.body}</textarea>
            <div className=' flex justify-between'>
                <PrimaryBUtton onClick={onUpdate}>update</PrimaryBUtton>
                <ButtonThird onClick={() => setIsEditing(false)} className='text-red'>cancel</ButtonThird>
            </div>
        </div>
    )
}



