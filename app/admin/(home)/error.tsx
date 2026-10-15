"use client";

import { useEffect } from "react";

import { Button } from "@radix-ui/themes";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="align-center flex h-60 w-full flex-col justify-center text-center">
      <div className="text-center">
        <h2 className="mb-2 text-4xl">Something went wrong!</h2>
        <Button onClick={() => retry()}>Try again</Button>
      </div>
    </div>
  );
}
