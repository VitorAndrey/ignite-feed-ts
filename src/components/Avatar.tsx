import styles from "./Avatar.module.css";

import { ImgHTMLAttributes } from "react";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  border: boolean;
}

export function Avatar({ border, ...props }: AvatarProps) {
  return (
    <img className={`${styles.avatar} ${border ? styles.border : styles.noBorder}`} {...props} />
  );
}
