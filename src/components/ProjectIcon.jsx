import { cn } from "@/lib/utils";

const STYLE_MAP = {
  amber: {
    background: "linear-gradient(145deg, #f59e0b 0%, #d97706 100%)",
    color: "#1a0000",
    border: "rgba(255, 200, 100, 0.45)",
    shadow: "0 0 0 1px rgba(255, 200, 100, 0.15), 0 8px 20px rgba(0, 0, 0, 0.35)",
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
    shadow: "0 0 0 1px rgba(201, 168, 76, 0.15), 0 8px 20px rgba(0, 0, 0, 0.12)",
  },
};

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
      <Icon size={size} strokeWidth={strokeWidth} />
    </span>
  );
}
