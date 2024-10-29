'use client';

import { AccountInputRef } from '@/components/atoms/Inputs';
import { type MyOrOthersAccountItemProps } from '@/components/molecules/AccountListItem';
import MyAccountList from '@/components/organisms/MyAccountList';
import RecentAccountList from '@/components/organisms/RecentAccountList';
import { MyAccounts, RecentAccount } from '@/data/account';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

export type SelectToAccountType = {
  onUpdate: (account: MyOrOthersAccountItemProps) => void;
  onNext: (step?: number) => void;
  selectedAccountNumber: string;
};

export default function SelectToAccount({
  onUpdate,
  onNext,
  selectedAccountNumber,
}: SelectToAccountType) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccountList = () => {
    setIsOpen((prev) => !prev);
  };

  const handleInputClick = () => {
    onNext();
  };

  const handleListClick = () => {
    onNext(2);
  };

  const myAccountWithoutSelected = MyAccounts.filter((account) => {
    return account.accountNumber !== selectedAccountNumber;
  });

  return (
    <div className='flex flex-col gap-[15px] h-full'>
      <h1 className='font-extrabold text-2xl'>어디로 돈을 보낼까요?</h1>
      <div className=''>
        <AccountInputRef
          placeHolder='계좌번호 입력'
          onClick={handleInputClick}
        />
      </div>
      <div className='flex flex-col h-full overflow-y-scroll pb-24'>
        <div className='flex justify-between'>
          <div className='font-bold text-[18px]'>내 계좌</div>
          <div
            className='flex items-center gap-1 cursor-pointer'
            onClick={toggleAccountList}
          >
            {!isOpen && (
              <span className='font-bold text-[12px] text-hanaPrimary'>
                + {myAccountWithoutSelected.length}개
              </span>
            )}
            <span
              className={`transition-transform duration-300 ${
                isOpen ? 'rotate-90' : 'rotate-0'
              }`}
            >
              <ChevronRight className='w-[20px] h-[20px] text-slate-500 hover:text-black' />
            </span>
          </div>
        </div>
        <div
          className={`flex transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className='transition-opacity duration-500 ease-in-out'>
            <MyAccountList
              accounts={myAccountWithoutSelected}
              onUpdate={onUpdate}
              onNext={handleListClick}
            />
          </div>
        </div>
        <div>
          <div className='font-bold text-[18px] mt-8'>최근 보낸 계좌</div>
          <div>
            <RecentAccountList
              accounts={RecentAccount}
              onUpdate={onUpdate}
              onNext={handleListClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}