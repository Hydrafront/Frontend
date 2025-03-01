import { useState } from "react";
import InvestmentList from "./InvestmentList";
import Steps from "../../allpresales/Steps";


const MyInvestments: React.FC = () => {
  const [step, setStep] = useState<string>("Live")
  return (
    <div className="py-5">
      <Steps step={step} setStep={setStep} />
      <InvestmentList step={step} />
    </div>
  )
}
export default MyInvestments;