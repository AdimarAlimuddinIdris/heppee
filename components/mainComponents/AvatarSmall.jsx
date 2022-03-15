

export default function AvatarSmall(props) {
    return (
        <div
            {...props}
            style={{ backgroundImage: `url(${props?.src})` }}
            className={`
                    min-h-[35px] min-w-[35px] max-w-[35px] max-h-[35px] 
                    rounded-full mx-1 bg-gray-100 bg-no-repeat bg-cover bg-center ` + props?.className}
        >
        </div>

    )
}

