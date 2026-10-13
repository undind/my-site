'use client'

import { useEffect } from 'react'

import { Button } from '@radix-ui/themes'

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <Button
        onClick={
          () => retry()
        }
      >
        Try again
      </Button>
    </div>
  )
}
