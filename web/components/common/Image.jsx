import Image from 'next/image';
import { client, server } from '../../api/client';

export default function NextImage({ src, props = {}, style }) {
  const myLoader = ({ src }) => {
    return src;
  };

  const imageSrc = src.includes(server.defaults.baseURL)
    ? src.replace(server.defaults.baseURL, client.defaults.baseURL)
    : src;

  return (
    <Image
      loader={myLoader}
      src={imageSrc}
      alt="no-img"
      width={0}
      height={0}
      style={{ ...style }}
      {...props}
    ></Image>
  );
}
