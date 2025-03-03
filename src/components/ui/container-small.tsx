interface propsType {
    className?: string
    children: React.ReactNode
}

export default function ContainerSmall({ children, className }: propsType) {
    return (
        <div className={"mx-auto w-[91.6vw] lg:w-[66vw] " + (className || '')}>
            {children}
        </div>
    )
}
