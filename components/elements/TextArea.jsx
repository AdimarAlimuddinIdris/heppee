
export default function TextArea(props) {
    return (
        <div className=" flex-1">
            <textarea
                {...props}
                className={" w-full bg-gray-100 p-3 ring-violet-400 my-2 rounded-lg max-h-[150px] min-h-[15px] " + props?.className}

                cols={props?.cols || "30"}
                rows={props?.rows || "10"}></textarea>
        </div>
    )
}