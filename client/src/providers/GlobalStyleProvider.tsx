import React from "react";

interface Props {
  children: React.ReactNode;
}

function GlobalStyleProvider({ children }: Props) {
  return <>{children}</>;
}

export default GlobalStyleProvider;
