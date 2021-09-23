import React, { FC } from 'react'
import Link, { LinkProps } from 'next/link'
/* styles */
import styles from 'public/scss/components/Breadcrumbs.module.scss'

type BreadcrumbsPropsType = {
  steps: { label: string; linkProps?: LinkProps }[]
  separator?: '/'
}

type BreadcrumbPropsType = {
  label: string
  linkProps?: LinkProps
  className?: string
  disable?: boolean
}

const Breadcrumbs: FC<BreadcrumbsPropsType> = ({ steps, separator = '/' }) => {
  if (!steps.length) return null

  if (steps.length === 1)
    return (
      <>
        <Breadcrumb {...steps[0]} className={styles.breadcrumb_last} disable />
        <Breadcrumbs steps={steps.slice(1)} />
      </>
    )

  return (
    <div className={styles.breadcrumbs}>
      <Breadcrumb {...steps[0]} />
      <div className={styles.breadcrumb_separator}>{separator}</div>
      <Breadcrumbs steps={steps.slice(1)} />
    </div>
  )
}

const Breadcrumb: FC<BreadcrumbPropsType> = ({
  label,
  linkProps,
  className = styles.breadcrumb,
  disable = false,
}) => {
  return (
    <div className={className}>
      {disable ? (
        label
      ) : (
        <Link href="/" {...linkProps}>
          {label}
        </Link>
      )}
    </div>
  )
}

export default Breadcrumbs
