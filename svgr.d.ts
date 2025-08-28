declare module "*.svg" {
  import { FC, SVGProps } from "react";
  const ReactComponent: FC<SVGProps<SVGElement>>;
  export default ReactComponent;
}

// Дополнительная типизация для @svgr/webpack
declare module "*.svg?url" {
  const src: string;
  export default src;
}
