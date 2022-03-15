import ImageSlider from "../../mainComponents/ImageSlider";
import { gridStyling } from "../../tool/toolPrimay";
import useImageSlider from "../../tool/useImageSlider";



export default function ImagesViewer({ images, post }) {
    if (!images || images?.length <= 0) return null;

    const slider = useImageSlider(images)

    return (
        <div className="grid grid-cols-6  gap-[2px] h-min ">
            <slider.View />
            {images?.map((image, ind) => {
                if (ind == 5 && images?.length > 6) {
                    return <ImageView last={true} slider={slider} image={image} images={images} ind={ind} key={image?.name + ind} />
                };
                if (ind == 6) return
                return <ImageView slider={slider} image={image} images={images} ind={ind} key={image?.name + ind} />
            })}
        </div>
    )
}


function ImageView({ image, ind, images, slider, last }) {

    const onClickHandler = () => {
        slider.select(image, ind)
    }

    return (
        <div key={image?.url + ind}
            style={{ backgroundImage: `url(${image?.url})` }}
            onClick={onClickHandler}
            className={gridStyling(ind, images) + ' cursor-pointer bg-no-repeat bg-cover bg-center'}>
            {
                last ? <h1 className="text-[35px] text-white bg-[#30303060] h-full items-center flex justify-center "> +{images?.length - 6} </h1>
                    : <img className=" opacity-0 " src={image?.url} alt="dfd" />
            }
        </div>
    )

}


{/* <h1 className="text-[30px] flex-1 text-center items-center flex justify-center text-white h-full bg-gray-700 opacity-50 "> +{images?.length - 6} </h1> */}