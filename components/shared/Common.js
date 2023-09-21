import React, { useState, useEffect } from "react";
import { useIdleTimer } from "react-idle-timer";
import Router from "next/router";
import { publicPaths } from "../../pages/_app";

export default function Common({children}) {
  const timeout = 300000;
  //const timeout = 3000
  const [lastEvent, setLastEvent] = useState("Events Emitted on Leader");

  const handleOnActive = () => setLastEvent("active");
  const handleOnIdle = () => setLastEvent("idle");

  const { isIdle } = useIdleTimer({
    timeout,
    onActive: handleOnActive,
    onIdle: handleOnIdle,
    crossTab: {
      emitOnAllTabs: true,
    },
  });

  useEffect(() => {
    if (isIdle().toString() === "true") {
      localStorage.clear("user_detail");
      // window.location.reload(true);
      Router.push("/");
    }
  }, [isIdle, isIdle().toString(), Router.pathname ]);
  return <>{children}</>;
}
