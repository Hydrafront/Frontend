import TokenForm from "./TokenForm";

const CreateTokenERC20: React.FC = () => {
  return (
    <div className="px-4">
      <div className="bg-lightColor py-10 px-5 rounded-lg flex flex-wrap w-full xl:w-2/3 mx-auto my-8">
        <TokenForm />
      </div>
    </div>
  );
};
export default CreateTokenERC20;
