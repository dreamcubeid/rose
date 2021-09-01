import { useEffect, useState } from "react";

const useInfiniteScroll = (pageInfo: any, itemClass: string) => {
  const [currPage, setCurrPage] = useState(0)
  const totalPage = Math.ceil(pageInfo.totalItems / pageInfo.itemPerPage)

  const handleScroll = () => {
    const lastTestimonial = document.querySelector(
      `.${itemClass}:last-child`
    ) as HTMLElement

    if (lastTestimonial) {
      const lastTestimonialOffset = lastTestimonial.offsetTop + lastTestimonial.clientHeight
      const pageOffset = window.pageYOffset + window.innerHeight

      if (pageOffset > lastTestimonialOffset && currPage < totalPage - 1)
        setCurrPage(currPage + 1)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  })

  return { currPage }
}

export default useInfiniteScroll
