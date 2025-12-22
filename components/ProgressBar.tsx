'use client';

interface ProgressBarProps {
    progress: number;
    showLabel?: boolean;
    size?: 'sm' | 'md' | 'lg';
    color?: 'yellow' | 'green' | 'blue';
}

export default function ProgressBar({
    progress,
    showLabel = true,
    size = 'md',
    color = 'yellow'
}: ProgressBarProps) {
    const clampedProgress = Math.min(100, Math.max(0, progress));

    const sizeClasses = {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3'
    };

    const colorClasses = {
        yellow: 'from-yellow-500 to-orange-500',
        green: 'from-green-500 to-emerald-500',
        blue: 'from-blue-500 to-cyan-500'
    };

    return (
        <div className="w-full">
            <div className={`w-full bg-gray-700 rounded-full overflow-hidden ${sizeClasses[size]}`}>
                <div
                    className={`h-full bg-gradient-to-r ${colorClasses[color]} transition-all duration-500 ease-out`}
                    style={{ width: `${clampedProgress}%` }}
                />
            </div>
            {showLabel && (
                <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">Progress</span>
                    <span className="text-xs font-medium text-gray-400">{Math.round(clampedProgress)}%</span>
                </div>
            )}
        </div>
    );
}
