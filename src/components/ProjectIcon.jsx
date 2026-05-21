import { cn } from "@/lib/utils";

const STYLE_MAP = {
  amber: {
    background: "linear-gradient(145deg, #f59e0b 0%, #d97706 100%)",
    color: "#1a0000",
    border: "rgba(255, 200, 100, 0.45)",
    shadow:
      "0 0 0 1px rgba(255, 200, 100, 0.15), 0 8px 20px rgba(0, 0, 0, 0.35)",
  },
  darkAmber: {
    background: "linear-gradient(160deg, #2a0000 0%, #1a0000 100%)",
    color: "#f59e0b",
    border: "rgba(217, 119, 6, 0.5)",
    shadow: "0 0 0 1px rgba(217, 119, 6, 0.15), 0 8px 20px rgba(0, 0, 0, 0.35)",
  },
  light: {
    background: "linear-gradient(160deg, #fff7ea 0%, #f8e8c8 100%)",
    color: "#8b0000",
    border: "rgba(201, 168, 76, 0.55)",
    shadow:
      "0 0 0 1px rgba(201, 168, 76, 0.15), 0 8px 20px rgba(0, 0, 0, 0.12)",
  },
};

function DefaultProjectGlyph({ size, strokeWidth }) {
  return (
    <svg
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6.5 10.5A3.5 3.5 0 0 1 10 7h6.4a2 2 0 0 1 1.42.59l3.59 3.59A2 2 0 0 1 22 12.6V20a3 3 0 0 1-3 3H10a3.5 3.5 0 0 1-3.5-3.5v-9Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M9.5 14.5h9"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M9.5 17.5H16"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <circle cx="19.5" cy="9" r="1.8" fill="currentColor" />
    </svg>
  );
}

export default function ProjectIcon({
  icon: Icon,
  size = 18,
  tone = "amber",
  className = "",
  strokeWidth = 2.2,
  title,
}) {
  const palette = STYLE_MAP[tone] ?? STYLE_MAP.amber;

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full border align-middle",
        className,
      )}
      title={title}
      aria-hidden={title ? undefined : "true"}
      style={{
        width: `calc(${size}px + 18px)`,
        height: `calc(${size}px + 18px)`,
        background: palette.background,
        color: palette.color,
        borderColor: palette.border,
        boxShadow: palette.shadow,
      }}
    >
      {Icon ? (
        <Icon size={size} strokeWidth={strokeWidth} />
      ) : (
        <DefaultProjectGlyph size={size} strokeWidth={strokeWidth} />
      )}
    </span>
  );
}

export { ProjectIcon };
