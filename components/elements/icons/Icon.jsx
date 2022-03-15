import { useEffect, useState } from "react"


export default function Icon({ onClick, className, round, children }) {



    return <span onClick={onClick} className={round ? 'material-icons bg-white p-1 rounded-full shadow-md  cursor-pointer ' + className : 'material-icons cursor-pointer ' + className}>
        {children}
    </span>
}