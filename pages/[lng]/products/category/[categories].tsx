import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ProductCategory = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.query.lng && router.query.categories) {
      router.push(
        "/[lng]/products",
        `/${router.query.lng}/products?categories=${router.query.categories}`
      );
    }
  }, [router]);

  return <></>;
};

export default ProductCategory;
