"use client";

import dynamic from "next/dynamic";
import Loading from "../demo/loading";

const DemoContent = dynamic(() => import("./DemoContent"), {
  loading: Loading,
  ssr: false,
});

export default function DemoWrapper() {
  return <DemoContent />;
}
