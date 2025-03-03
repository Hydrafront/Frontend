import CustomInput from "@/components/common/CustomInput";
import CustomTextarea from "@/components/common/CustomTextarea";
// import GradientButton from "@/components/common/GradientButton";
import LabelText from "@/components/common/LabelText";

const ContactUs: React.FC = () => {
  return (
    <div className=" pb-3">
      <div className="bg-lightColor p-10 pb-3 rounded-lg w-full lg:w-2/3 xl:w-1/2 m-auto">
        <h5 className="mb-5">CONTACT US</h5>
        <div className="mb-5">
          <LabelText>Project Name</LabelText>
          <CustomInput placeholder="Project Name" />
        </div>
        <div className="mb-5">
          <LabelText>Your Contact Details</LabelText>
          <CustomInput className="mb-3" placeholder="Name" />
          <CustomInput className="mb-3" placeholder="Telegram Handle" />
          <CustomInput className="mb-3" placeholder="Discord Handle" />
          <CustomInput className="mb-3" placeholder="Twitter Handle (optional)" />
          <CustomInput className="mb-3" placeholder="Email Address" />
        </div>
        <div className="Socials (Optional) mb-5">
          <LabelText>Social (Optional)</LabelText>
          <CustomInput className="mb-3" placeholder="Website URL" />
          <CustomInput className="mb-3" placeholder="Twitter URL" />
          <CustomInput className="mb-3" placeholder="Telegram Group URL" />
          <CustomInput className="mb-3" placeholder="Discord URL" />
          <CustomInput className="mb-3" placeholder="Whitepaper URL" />
        </div>
        <div className="mb-5">
          <LabelText>Message Box</LabelText>
          <CustomTextarea placeholder="Write Your Message" />
        </div>
        <div className="w-full flex justify-center">
          {/* <GradientButton className="px-[30px] rounded-lg">SUBMIT</GradientButton> */}
          <button className='px-[30px] py-2 bg-green-500 text-white rounded-lg'>
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  )
}
export default ContactUs;