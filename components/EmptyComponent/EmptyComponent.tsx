import { FC } from "react";

export type EmptyComponentPropsType = {
  classes: {
    emptyContainer?: string;
    emptyTitle?: string;
    emptyDesc?: string;
  };
  logo?: any;
  title?: string;
  desc?: string;
  button?: React.ReactNode;
};

const EmptyComponent: FC<EmptyComponentPropsType> = ({
  classes = {},
  logo,
  title,
  desc,
  button
}) => {
  const {
    emptyContainer = "empty-emptyContainer",
    emptyTitle = "empty-emptyTitle",
    emptyDesc = "empty-emptyDesc"
  } = classes;

  return (
    <div className={emptyContainer}>
      {logo && logo}
      <h2 className={emptyTitle}>{title}</h2>
      {desc &&
        <p className={emptyDesc}>{desc}</p>
      }
      {button && button}
    </div>
  )
}

export default EmptyComponent;