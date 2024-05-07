"use client";

import React, { useState } from "react";
import RasterRequestForm from "./form_rasterRequest";
import DownloadButton from "./button_download";
import GenSessionIdButton from "./button_GenSessionId";


export default function Home() {
  const [sessionId, setSessionId] = useState("");

  return (
    <>
      <h3>Must to generate a unique browser session id first. </h3>
      <GenSessionIdButton setSessionId={setSessionId} />
      <h3>Browser session: {sessionId}</h3>
      <hr />
      <RasterRequestForm sessionId={sessionId} />
      <hr />
      <DownloadButton sessionId={sessionId} />
    </>
  );
}
