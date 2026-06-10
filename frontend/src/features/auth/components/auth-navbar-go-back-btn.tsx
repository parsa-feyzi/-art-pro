'use client'

import { Button } from '@/src/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation';

function AuthNavbarGoBackBtn() {
  const router = useRouter();

  const clickHandler = () => router.back()

  return (
    <>
      <div>
        {/* desktop state */}
        <Button className="sm:inline-flex hidden" onClick={clickHandler} variant="outline">
          <ArrowLeft />
          <span>Go Back</span>
        </Button>
        {/* mobile state */}
        <Button className="sm:hidden inline-flex" onClick={clickHandler} variant="outline" size="icon">
          <ArrowLeft />
        </Button>
      </div>


    </>
  )
}

export default AuthNavbarGoBackBtn