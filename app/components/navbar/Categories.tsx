'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { 
  GiBarn, 
  GiBoatFishing, 
  GiCactus, 
  GiCastle, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland,
  GiWindmill
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';

import CategoryBox from "../CategoryBox";
import Container from '../Container';


export const categories = [
  {
    label: 'Twice',
    icon: TbBeach,
    description: 'Twice Group!',
  },
  {
    label: 'Itzy',
    icon: GiWindmill,
    description: 'Itzy Group!',
  },
  {
    label: 'Fifty-Fifty',
    icon: MdOutlineVilla,
    description: 'Fifty-Fifty Group!'
  },
  {
    label: 'XG',
    icon: TbMountain,
    description: 'XG Group!'
  },
  {
    label: '2pm',
    icon: TbPool,
    description: '2pm Group!'
  },
  {
    label: 'Le Sserafim',
    icon: GiIsland,
    description: 'Le Sserafim Group!'
  },
  {
    label: 'BlackPink',
    icon: GiBoatFishing,
    description: 'BlackPink Group!'
  },
  {
    label: 'NCT U',
    icon: FaSkiing,
    description: 'NCT U Group!'
  },
  {
    label: '(G) I-DLE',
    icon: GiCastle,
    description: '(G) I-DLE Group!'
  },
  {
    label: 'Trouble Maker',
    icon: GiCaveEntrance,
    description: 'Trouble Maker Group!'
  },
  {
    label: 'Block B',
    icon: GiForestCamp,
    description: 'Block B Group!'
  },
  {
    label: 'EXID',
    icon: BsSnow,
    description: 'EXID Group!'
  },
  {
    label: 'C.N Blue',
    icon: GiCactus,
    description: 'C.N Blue Group!'
  },
  {
    label: 'GOT7',
    icon: GiBarn,
    description: 'GOT7 Group!'
  },
  {
    label: 'Loona',
    icon: IoDiamond,
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