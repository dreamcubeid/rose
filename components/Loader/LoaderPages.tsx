/* Library Package */
import { FC } from 'react'
/* Styles */
import styleLoader from 'public/scss/components/Loader.module.scss'

const LoaderPages: FC<any> = () => {
  return (
    <div className={styleLoader.loaderPage}>
      <div className={styleLoader.loaderPage_container}>
        <div className={styleLoader.loaderPage_containerSpin}></div>
      </div>
    </div>
  )
}

export default LoaderPages