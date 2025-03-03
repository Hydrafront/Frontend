import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader
} from '@material-tailwind/react'
import React, { useState } from 'react'
import {
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix
} from '@material-tailwind/react'
import { IconCaretUpFilled } from '@tabler/icons-react'
import clsx from 'clsx'
import Pagination from '@/components/common/Pagination'

interface listType {
  image: string
  title: string
  usd: number
  percent: number
}

const RightSidebar: React.FC = () => {
  const [selected, setSelected] = useState('trending')

  const handleChange = (_: React.SyntheticEvent, value: string) => {
    setSelected(value)
  }

  const data: listType[] = [
    {
      image: '/assets/images/rightside/1.png',
      title: 'ABR',
      usd: 0.45,
      percent: 12.34
    },
    {
      image: '/assets/images/rightside/2.png',
      title: 'ABR',
      usd: 0.45,
      percent: 12.34
    },
    {
      image: '/assets/images/rightside/3.png',
      title: 'ABR',
      usd: 0.45,
      percent: 12.34
    },
    {
      image: '/assets/images/rightside/4.png',
      title: 'ABR',
      usd: 0.45,
      percent: 12.34
    },
    {
      image: '/assets/images/rightside/5.png',
      title: 'ABR',
      usd: 0.45,
      percent: 12.34
    },
    {
      image: '/assets/images/rightside/6.png',
      title: 'ABR',
      usd: 0.45,
      percent: 12.34
    },
    {
      image: '/assets/images/rightside/7.png',
      title: 'ABR',
      usd: 0.45,
      percent: 12.34
    },
    {
      image: '/assets/images/rightside/8.png',
      title: 'ABR',
      usd: 0.45,
      percent: 12.34
    },
    {
      image: '/assets/images/rightside/9.png',
      title: 'ABR',
      usd: 0.45,
      percent: 12.34
    },
    {
      image: '/assets/images/rightside/10.png',
      title: 'ABR',
      usd: 0.45,
      percent: 12.34
    }
  ]

  return (
    <Tabs value={selected} onChange={handleChange}>
      <TabsHeader
        className='rounded-none border-b border-borderColor bg-transparent p-0'
        indicatorProps={{
          className:
            'bg-transparent border-b border-[#F97736] shadow-none rounded-none'
        }}
        placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
      >
        <Tab value='trending' className='text-gray-600 py-3' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Trending
        </Tab>
        <Tab value='watchlist' className='text-gray-600 py-3' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Watchlist
        </Tab>
      </TabsHeader>
      <TabsBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <TabPanel value='trending' className='p-0'>
          <ContentList options={data} />
        </TabPanel>
        <TabPanel value='watchlist' className='p-0'>
          <ContentList options={data} />
        </TabPanel>
      </TabsBody>
    </Tabs>
  )
}

const ContentList = ({ options }: { options: listType[] }) => {
  return (
    <>
      <List className='my-2 p-0' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        {options.map((item: listType, index: number) => (
          <ListItem
            key={index}
            className={clsx(
              'group rounded-none py-1.5 px-3 text-sm font-normal text-blue-gray-700 hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white',
              index % 2 === 1 && 'bg-[#101014]'
            )}
            placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
          >
            <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <img
                src={item.image}
                alt='prefix-image'
                width={25}
                height={25}
                className='rounded-full'
              />
            </ListItemPrefix>
            {item.title}
            <ListItemSuffix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <div className='flex items-center'>
                <span className='text-[10px] text-[#707070] mr-3'>
                  ${item.usd.toFixed(2)}
                </span>
                <span className='text-[10px] text-[#35CB9E] mr-1'>
                  {item.percent.toFixed(2)}%
                </span>
                <IconCaretUpFilled className='w-[15px]' color='#35CB9E' />
              </div>
            </ListItemSuffix>
          </ListItem>
        ))}
      </List>
      <div className='flex justify-center pt-5'>
        <Pagination pageCount={3} nextLabel='>' previousLabel='<' />
      </div>
    </>
  )
}

export default RightSidebar
