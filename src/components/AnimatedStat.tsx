import { useCountUp } from "@/hooks/useCountUp";

interface AnimatedStatProps {
  value: string;
  label: string;
  delay?: number;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}

const parseStat = (value: string) => {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: "" };
  return { num: parseInt(match[1], 10), suffix: match[2] };
};

const AnimatedStat = ({
  value,
  label,
  delay = 0,
  className = "",
  valueClassName = "",
  labelClassName = "",
}: AnimatedStatProps) => {
  const { num, suffix } = parseStat(value);
  const { count, ref } = useCountUp({ end: num, duration: 1600, delay });

  return (
    <div className={className}>
      <p
        ref={ref as React.RefObject<HTMLParagraphElement>}
        className={`font-display font-medium gradient-gold-text ${valueClassName}`}
        style={{ letterSpacing: "-0.02em" }}
      >
        {Math.floor(count)}{suffix}
      </p>
      <p className={`font-body uppercase text-muted-foreground ${labelClassName}`}>
        {label}
      </p>
    </div>
  );
};

export default AnimatedStat;
