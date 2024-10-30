'use client';

import type { MyAccount, OthersAccount } from '@/data/account';
import { bankList } from '@/data/bank';
// import { BsStarFill } from 'react-icons/bs';
import Image from 'next/image';

// import { useState } from 'react';
// import { cn } from '@/lib/utils';

// type AccountItemFavoriteProps = (
//   | MyAccountItemProps
//   | OthersAccountItemProps
// ) & { isFavorite: boolean };

export type AccountListType = {
  account: MyAccount | OthersAccount;
  // | AccountItemFavoriteProps;
  onclick: () => void;
};

export default function AccountListItem({ account, onclick }: AccountListType) {
  const { bankId, accountNumber } = account;

  // const name =
  //   'accountName' in account
  //     ? account.accountName
  //     : 'name' in account
  //       ? account.name
  //       : undefined;

  const name =
    account.type === 'MyAccount' ? account.accountName : account.name;

  // const isFavorite = 'isFavorite' in account ? account.isFavorite : undefined;

  // const [favoriteState, setFavoriteState] = useState(isFavorite);

  // const toggleFavorite = () => {
  //   setFavoriteState((prev) => !prev);
  // };
  const bank = bankList.find((i) => i.id === +bankId);

  return (
    <div className='flex flex-row justify-between w-full h-fit py-[12px] bg-white'>
      <div className='flex gap-[16px]' onClick={onclick}>
        {bank ? (
          <div className='relative w-11 h-11'>
            <Image
              src={bank.image}
              alt={bank.bankname}
              className='rounded-full'
              layout='fill'
              sizes='min-width:40px height:40px'
            />
          </div>
        ) : (
          <span className='w-11 h-11 rounded-full bg-slate-200 '></span>
        )}
        <div className='flex flex-col gap-1'>
          <h1 className='text-hanaPrimary font-bold'>{name}</h1>
          <h1 className='text-gray-400 text-xs flex flex-row gap-2'>
            <div>{bank?.bankname}</div>
            <div>{accountNumber}</div>
          </h1>
        </div>
      </div>
      {/* <div className='flex items-center'>
        {typeof favoriteState !== 'undefined' && (
          <BsStarFill
            onClick={toggleFavorite}
            className={cn(
              'w-[27px] h-[27px]',
              'cursor-pointer',
              isFavorite ? 'text-yellow-300' : 'text-[#D9D9D9]'
            )}
          />
        )}
      </div> */}
    </div>
  );
}
