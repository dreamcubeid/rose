import React, { FC } from 'react'
import Link, { LinkProps } from 'next/link'
/* styles */
import styles from 'public/scss/components/Breadcrumbs.module.scss'

type BreadcrumbsPropsType = {
  steps: { label: string; href?: LinkProps }[]
  separator?: '/'
}

type BreadcrumbPropsType = {
  label: string
  href?: string | any
  className?: string
  disable?: boolean
}

const Breadcrumbs: FC<BreadcrumbsPropsType> = ({ steps, separator = '/' }) => {
  if (!steps.length) return null

  if (steps.length === 1)
    return (
      <>
        <div className={styles.breadcrumb_separator}>{separator}</div>
        <Breadcrumb {...steps[0]} className={styles.breadcrumb_last} disable />
        <Breadcrumbs steps={steps.slice(1)} />
      </>
    )

  return (
    <div className={styles.breadcrumbs}>
      <Breadcrumb {...steps[0]} />
      <Breadcrumbs steps={steps.slice(1)} />
    </div>
  )
}

const Breadcrumb: FC<BreadcrumbPropsType> = ({
  label,
  href = '/',
  className = styles.breadcrumb,
  disable = false
}) => {
  return <div className={className}>{disable ? label : <Link href={href}>{label}</Link>}</div>
}

export default Breadcrumbs
