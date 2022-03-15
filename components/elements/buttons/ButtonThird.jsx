

export default function ButtonThird(props) {
    return <button
        className={`hover:bg-gray-100 p-1 px-2 rounded-md ` + props?.className}
        {...props}
    >{props?.children}</button>
}