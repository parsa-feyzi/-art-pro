"use client"

import { User } from "@/lib/types";
import HomeSection from "./home-section";
import Collapsible from "@/components/ui/collapsible";
import UserBox from "../user-box/user-box";

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
