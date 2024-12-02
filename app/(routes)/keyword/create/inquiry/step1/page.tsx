'use client';

// import AccountListItem from '@/components/molecules/AccountListItem';
import SelectAccount from '@/components/templates/SelectAccount';
import { useInquiry } from '@/contexts/InquiryContext';
import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { MyAccount, MyAccounts } from '@/data/account';
import { MyAccountWithBalance } from '@/data/transfer';
import { useRouter } from 'next/navigation';
import { useEffect, useCallback } from 'react';
import { levenshtein } from '@/lib/utils';

export default function Step1() {
  const router = useRouter();
  const { updateFormData, resetFormData } = useInquiry();
  const { result, setResult } = useVoiceInputSession();

  useEffect(() => {
    resetFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const nextStep = useCallback(() => {
  //   setResult('');
  //   router.push('/keyword/create/inquiry/step2');
  // }, [router, setResult]);
  const nextStep = useCallback(() => {
    setResult('');
    let isCancelled = false;

    setTimeout(() => {
      if (!isCancelled) {
        router.push('/keyword/create/inquiry/step2');
      }
    }, 0);

    return () => {
      isCancelled = true;
    };
  }, [router, setResult]);

  const handleAccountClick = useCallback(
    (account: MyAccountWithBalance) => {
      setResult('');
      updateFormData({ account });
      nextStep();
    },
    [updateFormData, nextStep]
  );

  // useEffect(() => {
  //   if (result) {
  //     const matchedAccount = MyAccounts.find(
  //       (account) => account.accountName.toLowerCase() === result.toLowerCase()
  //     );
  //     if (matchedAccount) {
  //       handleAccountClick(matchedAccount);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [result]);
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
  }, [result, handleAccountClick]);

  return (
    <SelectAccount
      onUpdate={(account: MyAccount) => updateFormData({ account })}
      onNext={nextStep}
    />
  );
}
