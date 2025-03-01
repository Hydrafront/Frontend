

interface optionType {
  image: string;
  icon: string;
  name: string;
  price: number;
  balance: string;
  value: number;
  diffPercent: number;
  diffPrice: number;
}

const options: optionType[] = [
  { image: "/assets/images/wallets/1.png", icon: "/assets/images/wallets/icons/1.png", name: "Ethereum", price: 3245.32, balance: "0.023 ETH", value: 99.34, diffPercent: 4.34, diffPrice: 2.23 },
  { image: "/assets/images/wallets/2.png", icon: "/assets/images/wallets/icons/2.png", name: "Ethereum", price: 3245.32, balance: "0.023 ETH", value: 99.34, diffPercent: 4.34, diffPrice: 2.23 },
]

const WalletList: React.FC = () => {
  return (
    <div className="w-full p-5">
      <table className="w-full">
        <thead>
          <tr className="justify-between">
            <td className="pb-3 text-gray-600 text-[12px]">ASSET</td>
            <td className="pb-3 text-gray-600 text-[12px]">PRICE</td>
            <td className="pb-3 text-gray-600 text-[12px]">BALANCE</td>
            <td className="pb-3 text-gray-600 text-[12px]">VALUE</td>
          </tr>
        </thead>
        <tbody>
          {
            options.map((item: optionType, index: number) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="py-3">
                  <div className="flex items-center">
                    <img src={item.image} alt="wallet-image" className="w-[40px] h-[40px] mr-2" />
                    <div>
                      <p>{item.name}</p>
                      <img src={item.icon} alt="wallet-icon" className="w-[15px] h-[16px]" />
                    </div>
                  </div>
                </td>
                <td className="py-3">{item.price}</td>
                <td className="py-3">{item.balance}</td>
                <td className="py-3">
                  <div>
                    <p>${item.value}</p>
                    <p className="text-[#04BC65] text-[11px]">+{item.diffPercent}% (${item.diffPrice})</p>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
export default WalletList;