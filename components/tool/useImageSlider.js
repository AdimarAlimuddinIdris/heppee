
import { useState } from 'react'
import Icon from '../elements/icons/Icon'
import ImageDiv from '../elements/images/ImageDiv'

export default function useImageSlider(images) {

    const [show, setShow] = useState()
    const [selected, setSelected] = useState()
    const [index, setIndex] = useState()


    function slid(mtplr) {
        setSelected(images[index + mtplr])
        setIndex(index + mtplr)
    }

    function select(image, ind) {
        console.log({ image, ind });
        console.log(images);
        setShow(true)
        setSelected(image)
        setIndex(ind)
    }

    const Slider = (props) => {
        if (index == props?.limit) return <div className='p-4'></div>
        return <Icon className='' onClick={() => slid(props?.num)} round={true}>{props?.children}</Icon>
    }

    const View = ({ props }) => {
        if (!show) return null;
        return (
            <div className="popup-div flex flex-col justify-center items-center">
                <div className=" max-h-[90%] flex p-2 h-full w-full max-w-3xl  bg-white  rounded-md">
                    <div className='flex-1 flex flex-col h-full '>
                        <Icon round={true} className='mr-auto' onClick={() => setShow(false)}>close</Icon>
                        <div className='flex-1 flex justify-between items-center '>
                            <Slider limit={0} num={-1} >arrow_back_ios</Slider>
                            <div className=' items-center justify-center flex flex-1 max-h-[400px]'>
                                <img className='max-h-[700px] shadow-xl' src={selected?.url} alt="" />
                            </div>
                            <Slider limit={images?.length - 1} num={+1} >arrow_forward_ios</Slider>
                        </div>
                        <div className='flex flex-wrap  overflow-y-scroll mt-7 max-h-[200px] min-h-[120px] '>
                            {
                                images?.map((img, ind) => <ImageDiv rounded={true} onClick={() => select(img, ind)} className='hover:scale-105 cursor-pointer ring-2 ring-white' src={img?.url} />)
                            }
                        </div>
                    </div>
                    {props?.children}
                </div>
            </div>
        )
    }


    return {
        View,
        select,

    }

}


{/* <div
                                style={{ backgroundImage: `url(${img?.url})` }}
                                className='min-h-[100px] min-w-[100px] max-h-[100px] max-w-[100px] '>

                            </div> */}