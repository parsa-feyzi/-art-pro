import { Button } from '@/src/components/ui/button'
import Link from 'next/link'

function MainSidebarUserInfosLogoutCase() {
  return (
    <div className='w-full flex flex-col gap-2'>
        <Link href="/sign-up"><Button className="w-full">Sign up</Button></Link>
        <Link href="/login"><Button variant="secondary" className="w-full">Log in</Button></Link>
    </div>
  )
}

export default MainSidebarUserInfosLogoutCase