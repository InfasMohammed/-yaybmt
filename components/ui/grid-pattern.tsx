import { useId, type SVGProps } from "react";

export function GridPattern({
  width = 25,
  height = 25,
  className,
}: { width?: number; height?: number; className?: string } & Pick<
  SVGProps<SVGSVGElement>,
  "className"
>) {
  const id = useId();
  return (
    <svg aria-hidden="true" className={className}>
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={-12}
          y={4}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            stroke="currentColor"
            strokeDasharray="3"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
}
