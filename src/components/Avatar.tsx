import styles from "./Avatar.module.css";

interface AvatarProps {
  src: string;
  border: boolean;
  alt?: string;
}

export function Avatar({ src, border, alt }: AvatarProps) {
  return (
    <img
      className={`${styles.avatar} ${border ? styles.border : styles.noBorder}`}
      src={src}
      alt={alt}
    />
  );
}
