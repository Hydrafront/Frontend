import { useEffect, useState } from "react"

interface propsType {
    content: React.ReactElement[]
    duration: number
}

const Slider = (props: propsType) => {
    const { content, duration } = props

    const count = content.length
    const [num, setNum] = useState<number>(0)

    useEffect(() => {
        let nextNum = 0
        setInterval(() => {
            nextNum = nextNum < count - 1 ? nextNum + 1 : 0
            setNum(nextNum)
        }, duration)
    }, [count, duration])

    return (
        <div className="flex w-max duration-500" style={{ translate: `-${100 * num / count}%` }}>
            {content.map((dom, index) => (
                <div key={index}>{dom}</div>
            ))}
        </div>
    )
}

export default Slider
