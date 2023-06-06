'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
// import { 
//   GiBarn, 
//   GiBoatFishing, 
//   GiCactus, 
//   GiCastle, 
//   GiCaveEntrance, 
//   GiForestCamp, 
//   GiIsland,
//   GiWindmill
// } from 'react-icons/gi';
// import { FaSkiing } from 'react-icons/fa';
import { BsFillFileMusicFill, BsSnow } from 'react-icons/bs';
// import { IoDiamond } from 'react-icons/io5';
import { MdLibraryMusic, MdOutlineVilla } from 'react-icons/md';

import CategoryBox from "../CategoryBox";
import Container from '../Container';


export const categories = [
  {
    label: 'Twice',
    icon: MdLibraryMusic,
    description: 'Twice Group!',
  },
  {
    label: 'Itzy',
    icon: MdLibraryMusic,
    description: 'Itzy Group!',
  },
  {
    label: 'Fifty-Fifty',
    icon: MdLibraryMusic,
    description: 'Fifty-Fifty Group!'
  },
  {
    label: 'XG',
    icon: MdLibraryMusic,
    description: 'XG Group!'
  },
  {
    label: '2pm',
    icon: MdLibraryMusic,
    description: '2pm Group!'
  },
  {
    label: 'Le Sserafim',
    icon: MdLibraryMusic,
    description: 'Le Sserafim Group!'
  },
  {
    label: 'BlackPink',
    icon: MdLibraryMusic,
    description: 'BlackPink Group!'
  },
  {
    label: 'NCT U',
    icon: MdLibraryMusic,
    description: 'NCT U Group!'
  },
  {
    label: '(G) I-DLE',
    icon: MdLibraryMusic,
    description: '(G) I-DLE Group!'
  },
  {
    label: 'Trouble Maker',
    icon: MdLibraryMusic,
    description: 'Trouble Maker Group!'
  },
  {
    label: 'Block B',
    icon: MdLibraryMusic,
    description: 'Block B Group!'
  },
  {
    label: 'EXID',
    icon: MdLibraryMusic,
    description: 'EXID Group!'
  },
  {
    label: 'C.N Blue',
    icon: MdLibraryMusic,
    description: 'C.N Blue Group!'
  },
  {
    label: 'GOT7',
    icon: MdLibraryMusic,
    description: 'GOT7 Group!'
  },
  {
    label: 'Loona',
    icon: MdLibraryMusic,
    description: 'Loona Group!'
  }
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}
 
export default Categories;