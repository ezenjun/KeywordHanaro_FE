'use client';

import SpeechToText from '@/components/SpeechToText';
import InputToAccount from '@/components/templates/createKeyword/transfer/InputToAccount';
import { useTransferForm } from '@/contexts/TransferContext';
import type { OthersAccount } from '@/types/Account';
import { MyAccount } from '@/types/Account';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Step3() {
  const router = useRouter();
  const { formData, updateFormData, resetAmountData } = useTransferForm();
  const handleNext = () => {
    router.push(`/keyword/create/transfer/step4`);
  };

  useEffect(() => {
    resetAmountData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <InputToAccount
        formData={formData}
        onNext={handleNext}
        onUpdate={(toAccount: OthersAccount | MyAccount) =>
          updateFormData({ toAccount })
        }
      />
      <SpeechToText placeholder={'어떤 계좌로 보낼까요?'} autoStart />
    </>
  );
}
