"use client"

import { User } from "@/src/lib/types";
import Collapsible from "@/src/components/ui/collapsible";
import UserBox from "./user-box";
import HomeSection from "@/src/components/web/home-components/home-section";

interface Props {
  title: string;
  dataList: User[];
  itemsNumber?: 2 | 3 | 4;
}

function UsersSlider({ title, dataList, itemsNumber }: Props) {
  return (
    <HomeSection title={title}>
      <Collapsible itemsNumber={itemsNumber}>
        {dataList.map((user) => (
          <UserBox {...user} key={user._id+Math.random()} />
        ))}
      </Collapsible>
    </HomeSection>
  );
}

export default UsersSlider;
