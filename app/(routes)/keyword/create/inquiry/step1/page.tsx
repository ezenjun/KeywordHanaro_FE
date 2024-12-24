'use client';

// import AccountListItem from '@/components/molecules/AccountListItem';
import SpeechToText from '@/components/SpeechToText';
import SelectAccount from '@/components/templates/SelectAccount';
import { useInquiry } from '@/contexts/InquiryContext';
import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { MyAccount, MyAccounts } from '@/data/account';
import { useAccountApi } from '@/hooks/useAccount/useAccount';
import { MyAccountWithBalance } from '@/types/Transfer';
import { useRouter } from 'next/navigation';
import { useEffect, useCallback, useState } from 'react';
import { levenshtein } from '@/lib/utils';

export default function Step1() {
  const router = useRouter();
  const { updateFormData, resetFormData } = useInquiry();
  const { result, setResult } = useVoiceInputSession();

  useEffect(() => {
    resetFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextStep = useCallback(() => {
    router.push('/keyword/create/inquiry/step2');
  }, [router]);

  const handleAccountClick = useCallback(
    (account: MyAccountWithBalance) => {
      setResult('');
      updateFormData({ account });
      nextStep();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updateFormData, nextStep]
  );

  useEffect(() => {
    if (result) {
      const threshold = 1; // 허용할 최대 편집 거리
      let bestMatch = null;
      let minDistance = Infinity;

      for (const account of MyAccounts) {
        const distance = levenshtein(
          account.accountName.toLowerCase(),
          result.toLowerCase()
        );
        if (distance < minDistance && distance <= threshold) {
          minDistance = distance;
          bestMatch = account;
        }
      }

      if (bestMatch) {
        setResult('');
        handleAccountClick(bestMatch);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, handleAccountClick]);

  return (
    <>
      <SelectAccount
        onUpdate={(account: MyAccount) => updateFormData({ account })}
        onNext={nextStep}
      />
      <SpeechToText autoStart placeholder='내 계좌를 선택해주세요' />
    </>
  );
}
