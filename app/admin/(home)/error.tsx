"use client";

import { useEffect } from "react";

import { Button } from "@radix-ui/themes";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="align-center flex flex-col text-center h-60 w-full justify-center">
      <div className="text-center">
        <h2 className="text-4xl mb-2">Something went wrong!</h2>
        <Button onClick={() => retry()}>Try again</Button>
      </div>
    </div>
  );
}
