export default function AIAudit() {
    return (
        <div className="relative group/whole">
            <div className="py-8 flex items-center gap-2 cursor-pointer group/item relative">
                AI Audit
                <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/64491fa5649dfb767a0c35ee_arrow-down.svg" alt="" />
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white group-hover/item:w-full duration-300 z-10" />
            </div>
            <div className="absolute top-full -left-5 py-4 hidden group-hover/whole:block border border-borderColor bg-bgColor">
                <div className="w-max px-6 py-4 flex justify-between items-center hover:opacity-70 duration-200">
                    <div className="flex items-center gap-4 mr-10 w-max">
                        <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/65e19a31ef2063a786b0198c_ico-grant.svg" className="w-[18px]" alt="" />
                        <p className="text-white">Coming Soon</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
