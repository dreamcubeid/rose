import { FC } from 'react'

type TypeProductTitleComponent = {
  i18n: any
  styleProduct: any
  handleChangeTagname: (msg: string) => void
  tagnameActive: string,
  totalProducts: {
    ourproduct: number,
    featured: number,
    newarrival: number,
    preorder: number
  }
}

type TypeTitleProduct = {
  title: string
  tagname: string,
  slug: string
}

const ProductTitle: FC<any> = ({
  i18n,
  styleProduct,
  handleChangeTagname,
  tagnameActive,
  totalProducts
}: TypeProductTitleComponent) => {
  const titleProduct: TypeTitleProduct[] = [
    {
      title: i18n.t("home.ourProduct"),
      tagname: "",
      slug: "ourproduct"
    },
    {
      title: i18n.t("home.featureProduct"),
      tagname: "featured",
      slug: "featured"
    },
    {
      title: i18n.t("home.newProduct"),
      tagname: "new-arrivals",
      slug: "newarrival"
    },
    {
      title: i18n.t("home.preOrder"),
      tagname: "preorder",
      slug: "preorder"
    }
  ]

  return (
    <>
      {titleProduct?.map((el, idx) => (
        <>
          {(totalProducts[el.slug] === null || totalProducts[el.slug] > 0) &&
            <div
              className={`
              ${styleProduct.product_homeTitle}
              ${tagnameActive === el.tagname && styleProduct.product_homeTitleActive}
            `}
              onClick={() => handleChangeTagname(el.tagname)}
              key={idx}
            >
              {el.title}
            </div>
          }
        </>
      ))}
    </>
  )
}

export default ProductTitle