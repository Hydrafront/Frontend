// import Steps from "../allpresales/Steps";
// import { useState } from "react";

// Add type assertion to presaleData

const ManagePresale: React.FC = () => {
  // const [step, setStep] = useState<string>("Live");
  return (
    <div className="bg-lightColor rounded-lg p-6 m-3 h-[calc(100vh-180px)] overflow-y-scroll">
      {/* <h5 className="mb-5">PRESALE PAGE</h5>
      <p className="mb-5">List of all Projects Launched</p>
      <Steps step={step} setStep={setStep} />
      <div className="flex flex-wrap -mx-5">
        {typedPresaleData
          .filter((item) => item.step === step)
          .map((item, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-5">
              <PresaleCard {...item} />
            </div>
          ))}
      </div> */}
    </div>
  )
}
export default ManagePresale;