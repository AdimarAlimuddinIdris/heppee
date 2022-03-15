

export default (props) => <button
    {...props}
    className={" bg-violet-400 p-1 text-white rounded-md px-4  " + props?.className}
>{props?.children}</button>