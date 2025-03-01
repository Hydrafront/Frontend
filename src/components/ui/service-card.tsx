import { Button } from "@material-tailwind/react"

const ServiceCard = () => {
    return (
        <div className="rounded-md bg-[#1c1a2fab] cst-box-shadow text-center p-3">
            <img src="/assets/images/services/service-1.jpeg" alt="service" className="w-full rounded-md mb-2" />
            <div className="p-2 text-center flex flex-col items-stretch">
                <h4 className="h-16 text-[#346DA1] font-bold">SAFETY RATING</h4>
                <p className="h-28">After review of your product, we provide a broad security score to allow consumers to make informed decisions about your product.</p>
                <Button placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Apply</Button>
            </div>
        </div>
    )
}

export default ServiceCard
