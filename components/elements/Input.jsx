


export default function Input(props) {
    return <div className={"flex flex-col " + props?.divStyle}>
        <label htmlFor={props?.name || props?.type}>{props?.children}</label>
        <input
            className={'p-2 ring-1 ring-gray-200 my-1 rounded-md ' + props?.className}
            name={props?.name || props?.type} type={props?.type} />
    </div>
}