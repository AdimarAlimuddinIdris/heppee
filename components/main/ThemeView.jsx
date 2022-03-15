import { useTheme } from "next-themes"
import { useState, useEffect } from 'react'

export default function ThemeView() {
    const { theme, setTheme } = useTheme()


    const changeTheme = () => {
        if (theme === 'dark') {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }


    return (
        <div>
            <p>{theme}</p>
            <button onClick={changeTheme}>change Theme</button>
        </div>
    )
}