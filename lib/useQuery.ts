import { useRouter } from "next/router";

const useQuery = (name: string): string | null => {
  const router = useRouter();
  const value = router.query[name];

  if (!value) {
    const search = router.asPath.split("?")[1];

    if (search) {
      const params = new URLSearchParams(search);
      return params.get(name);
    }
  }

  return value as string;
}

export default useQuery;