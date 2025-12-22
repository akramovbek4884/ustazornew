'use client';

interface StatsChartProps {
    data: { label: string; value: number }[];
    title?: string;
    type?: 'bar' | 'line';
    color?: 'yellow' | 'green' | 'blue';
    height?: number;
}

export default function StatsChart({
    data,
    title,
    type = 'bar',
    color = 'yellow',
    height = 200
}: StatsChartProps) {
    if (!data || data.length === 0) return null;

    const maxValue = Math.max(...data.map(d => d.value));

    const colorClasses = {
        yellow: 'from-yellow-500 to-orange-500',
        green: 'from-green-500 to-emerald-500',
        blue: 'from-blue-500 to-cyan-500'
    };

    const dotColors = {
        yellow: 'bg-yellow-500',
        green: 'bg-green-500',
        blue: 'bg-blue-500'
    };

    const formatValue = (value: number) => {
        if (value >= 1000000) {
            return (value / 1000000).toFixed(1) + 'M';
        } else if (value >= 1000) {
            return (value / 1000).toFixed(1) + 'K';
        }
        return value.toString();
    };

    return (
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
            {title && (
                <h4 className="text-sm font-medium text-gray-400 mb-4">{title}</h4>
            )}

            <div className="overflow-x-auto pb-4 custom-scrollbar">
                <div style={{ height, minWidth: data.length > 6 ? `${data.length * 60}px` : '100%' }} className="flex items-end gap-2">
                    {type === 'bar' ? (
                        // Bar Chart
                        data.map((item, index) => {
                            const barHeight = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
                            return (
                                <div key={index} className="flex-1 flex flex-col items-center gap-2 min-w-[40px]">
                                    <div
                                        className="w-full relative group"
                                        style={{ height: `${height - 40}px` }}
                                    >
                                        <div
                                            className={`absolute bottom-0 w-full bg-gradient-to-t ${colorClasses[color]} rounded-t-lg transition-all duration-500 hover:opacity-80`}
                                            style={{ height: `${barHeight}%` }}
                                        >
                                            {/* Tooltip */}
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                {formatValue(item.value)}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-500 truncate w-full text-center">
                                        {item.label}
                                    </span>
                                </div>
                            );
                        })
                    ) : (
                        // Line Chart
                        <div className="w-full relative" style={{ height: `${height - 40}px`, minWidth: data.length > 6 ? `${data.length * 60}px` : '100%' }}>
                            <svg className="w-full h-full" preserveAspectRatio="none">
                                {/* Grid lines */}
                                {[0, 25, 50, 75, 100].map((percent) => (
                                    <line
                                        key={percent}
                                        x1="0"
                                        y1={`${100 - percent}%`}
                                        x2="100%"
                                        y2={`${100 - percent}%`}
                                        stroke="rgb(55, 65, 81)"
                                        strokeWidth="1"
                                        strokeDasharray="4"
                                    />
                                ))}

                                {/* Line */}
                                <polyline
                                    fill="none"
                                    stroke="url(#lineGradient)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    points={data.map((item, idx) => {
                                        const x = (idx / (data.length - 1)) * 100;
                                        const y = maxValue > 0 ? 100 - (item.value / maxValue) * 100 : 100;
                                        return `${x}%,${y}%`;
                                    }).join(' ')}
                                />

                                {/* Gradient definition */}
                                <defs>
                                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor={color === 'yellow' ? '#EAB308' : color === 'green' ? '#22C55E' : '#3B82F6'} />
                                        <stop offset="100%" stopColor={color === 'yellow' ? '#F97316' : color === 'green' ? '#10B981' : '#06B6D4'} />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Dots */}
                            {data.map((item, idx) => {
                                const x = (idx / (data.length - 1)) * 100;
                                const y = maxValue > 0 ? 100 - (item.value / maxValue) * 100 : 100;
                                return (
                                    <div
                                        key={idx}
                                        className={`absolute w-3 h-3 ${dotColors[color]} rounded-full -translate-x-1/2 translate-y-1/2 group cursor-pointer`}
                                        style={{ left: `${x}%`, bottom: `${100 - y}%` }}
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                            {formatValue(item.value)}
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Labels */}
                            <div className="absolute -bottom-6 left-0 right-0 flex justify-between">
                                {data.map((item, idx) => (
                                    <span key={idx} className="text-xs text-gray-500">
                                        {item.label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
