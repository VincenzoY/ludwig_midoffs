import Image from "next/image";
import mcsrIcon from "./mcsr.png";

interface MCSRProps {
  width?: number;
  height?: number;
  className?: string;
}

const MCSR: React.FC<MCSRProps> = ({ width = 24, height = 24, className }) => {
  return (
    <Image
      src={mcsrIcon}
      alt="MCSR Ranked"
      width={width}
      height={height}
      className={className}
    />
  );
};

export default MCSR;