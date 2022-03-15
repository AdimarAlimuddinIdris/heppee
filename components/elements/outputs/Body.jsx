



export default function Body(props) {

    if (!props?.show) {
        return null
    }

    return (
        <div className={"p-3 min-w-[100px] " + props?.className} {...props}>
            <small>{props?.userProfile?.userName || props?.userProfile?.displayName}</small><br />
            {props?.children}
        </div>
    )
}