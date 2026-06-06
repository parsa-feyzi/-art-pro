'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation';

function AuthNavbarGoBackBtn() {
  const router = useRouter();

  const clickHandler = () => router.back()

  return (
    <div className="sm:block hidden">
      <Button onClick={clickHandler} variant="outline">
        <ArrowLeft />
        <span>Go Back</span>
      </Button>
    </div>
  )
}

export default AuthNavbarGoBackBtn