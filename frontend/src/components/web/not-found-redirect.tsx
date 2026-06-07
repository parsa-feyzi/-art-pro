'use client'

import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";

function NotFoundRedirect() {
  const [time, setTime] = useState(5);
  const [isRedirected, setIsRedirected] = useState(false);

  const router = useRouter();

  const redirectHandler = useEffectEvent(() => {
    if (!isRedirected) {
      router.push("/");
      setIsRedirected(true)
    }
  })

  useEffect(() => {
    setTimeout(() => {
      redirectHandler();
    }, 5000);

    const timeInterval = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    return () => {
      clearInterval(timeInterval)
    }
  });

  return (
    <div className="timer absolute top-6">{time} second to redirecting to the home page</div>
  )
}

export default NotFoundRedirect