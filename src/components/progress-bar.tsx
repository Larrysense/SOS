interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="w-full bg-charcoal/50 rounded-full h-2">
        <div 
          className="bg-gold h-2 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="font-crimson text-sm text-warm-gray/60 mt-2">
        Question {current} of {total}
      </p>
    </div>
  );
}
