import { User } from "@/src/lib/types"
import UsersSlider from "./users-slider"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

async function HomeMostActiveAuthors() {
  const resolve = await fetch(`${baseUrl}/api/users`, { cache: 'no-store', next: { tags: ['users_list'] } })
  let users: User[] = await resolve.json()
  users = users.slice(users.length - 4, users.length)

  return (
    <UsersSlider dataList={users} title="The most active authors" itemsNumber={4} />
  )
}

export default HomeMostActiveAuthors