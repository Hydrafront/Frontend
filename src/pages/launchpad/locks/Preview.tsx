import PreviewBox from "@/components/common/PreviewBox";
import PreviewLink from "@/components/common/PreviewLink";
import PreviewText from "@/components/common/PreviewText";

const Preview: React.FC = () => {
  return (
    <div className="w-full md:w-1/2 px-8">
      <h5 className="mb-5">PREVIEW</h5>
      <PreviewBox name="" symbol={'0'} />
      <div className="bg-lighterColor mt-5 p-5 rounded-lg">
        <h6 className="text-[18px] mb-10">Token Information</h6>
        <PreviewText name="Name" value={<span></span>} />
        <PreviewText name="Symbol" value={<span></span>} />
        <PreviewText name="Decimals" value={<span>6</span>} />
        <PreviewText name="Program" value={<PreviewLink text="Token Program" to="#" />} />
        <PreviewText name="Token Contact" value={<PreviewLink text="ESZrirvWmzfasUxR3Q7iaiX8R48JYurrMhrZ9DeSLuae" to="#" />} />
        <PreviewText name="Token Creator" value={<PreviewLink text="ESZrirvWmzfasUxR3Q7iaiX8R48JYurrMhrZ9DeSLuae" to="#" />} />
        <PreviewText name="Lock Duration" value={<p><span>dd/mm/yy</span> <span className="mx-3">Time: </span><span>UTC:</span></p>} />
        <PreviewText border={false} name="Unlock Date" value={<p><span>dd/mm/yy</span> <span className="mx-3">Time: </span><span>UTC:</span></p>} />
      </div>
    </div>
  )
}
export default Preview;