
import { useState } from "react"
export default function ImageDiv(props) {

    const [size, setSize] = useState(props?.size || '100')

    return (
        <div
            {...props}
            style={{ backgroundImage: `url(${props?.src})` }}
            className={`
            min-h-[96px]
            min-w-[96px]
            max-h-[96px] 
            max-w-[96px] 
            bg-cover bg-center bg-no-repeat
            ${!props?.rounded && ` rounded-{${props?.rounded || 'md '}}`}

            ` + props?.className}>
            {props?.children}
        </div>
    )
}

