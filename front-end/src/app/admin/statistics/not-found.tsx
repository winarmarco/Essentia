"use client"; // Error components must be Client Components

import Button from "@/components/shared/Button";
import { useRouter } from "next/navigation";
import {useEffect} from "react";

export default function Error({
  error,
}: {
  error: Error & {digest?: string};
}) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <Button onClick={() => router.push("/")}>Try again</Button>
    </div>
  );
}
