
export default function ProfileFeaturedImage({ src }) {

    return (
        <div style={{
            backgroundImage: `url(${src})`
        }} className=' bg-gray-100 min-h-[160px] bg-no-repeat bg-center bg-cover'>

        </div>
    )
}


