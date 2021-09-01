import { FC } from "react"

export type PlaceholderPropsType = {
  classes?: {
    placeholderImage?: string;
    placeholderTitle?: string;
    placeholderList?: string;
  };
  withImage?: boolean;
  withTitle?: boolean;
  withList?: boolean;
  listMany?: number;
};

const Placeholder: FC<PlaceholderPropsType> = ({
  classes = {},
  withImage = false,
  withTitle = false,
  withList = false,
  listMany = 2
}) => {
  const {
    placeholderImage = "placeholder-placeholderImage",
    placeholderTitle = "placeholder-placeholderTitle",
    placeholderList = "placeholder-placeholderList"
  } = classes;

  const loopList = (length) => {
    let element = []
    for (let i = 0; i < length; i++) {
      element.push(<div className={placeholderList} key={i}></div>)
    }
    return <>{element}</>
  }

  return (
    <>
      {withImage && (
        <div className={placeholderImage}></div>
      )}
      {withTitle && <div className={placeholderTitle}></div>}
      {withList && loopList(listMany)}
    </>
  )
}

export default Placeholder;