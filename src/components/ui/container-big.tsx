interface propsType {
    className?: string
    children: React.ReactNode
}

export default function ContainerBig({ children, className }: propsType) {
    return (
        <div className={"mx-auto w-[91.6vw] lg:w-[95.6vw] " + (className || '')}>
            {children}
        </div>
    )
}
