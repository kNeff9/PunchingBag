import React, { useState } from 'react';
import '../css/graph.css';

function StressTracker() {
	const [ratings, setRatings] = useState([]); // [{rating, timestamp}]
	const maxBars = 10; // Maximum bars to show before removing the top one

	// Get color based on stress level
	const getStressColor = (level) => {
		if (level === 0) return 'transparent'; // No color for 0
		if (level <= 3) return '#4ade80'; // Green (calm)
		if (level <= 6) return '#fbbf24'; // Yellow (medium)
		return '#ef4444'; // Red (stressed)
	};
    

	// Format timestamp in military (HH:mm:ss)
	const formatMilitary = (date) => {
		const pad = (n) => n.toString().padStart(2, '0');
		return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
	};

	return (
		<div className="stress-graph-container" style={{position: 'fixed', right: 24, bottom: 24, top: 'auto', width: 420}}>
			{/* Multiple Stress Bars (limit to maxBars) */}
			<div style={{marginBottom: 32}}>
				{(ratings.slice(-maxBars)).map((entry, idx) => {
					const fillPercentage = (entry.rating / 10) * 100;
					const barColor = getStressColor(entry.rating);
					return (
						<div className="stress-bar-section" key={idx + ratings.length - Math.min(ratings.length, maxBars)} style={{display: 'flex', alignItems: 'center'}}>
							<div style={{
								width: 70,
								textAlign: 'left',
								fontSize: 20,
								color: '#fff',
								fontFamily: 'monospace',
								fontWeight: 'bold',
								textShadow: '0 1px 4px #000',
								marginLeft: '-28px'
							}}>
								{formatMilitary(new Date(entry.timestamp))}
							</div>
							<div className="stress-bar-container" style={{flex: 1, minWidth: 320, maxWidth: 320, marginLeft: '24px'}}>
								<div 
									className="stress-bar-fill"
									style={{
										width: `${fillPercentage}%`,
										backgroundColor: barColor
									}}
								></div>
								{/* scale markers removed */}
							</div>
						</div>
					);
				})}
			</div>

			{/* Input block below bars */}
			<div style={{textAlign: 'center'}}>
				<div className="graph-question" style={{marginBottom: 8, fontSize: 32, fontWeight: 700}}>How stressed are you?</div>
				<div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', maxWidth: 320, margin: '0 0 8px 0'}}>
					<span className="graph-emoji-left" role="img" aria-label="smile" style={{fontSize: 32, marginRight: 8}}>😊</span>
					<div className="graph-rating-row graph-rating-row-wide" style={{flex: 1}}>
						{[...Array(10)].map((_, i) => (
							<button
								key={i}
								className={`graph-rating-btn graph-rating-btn-large graph-rating-btn-wide`}
								onClick={() => {
									setRatings(prev => {
										const now = Date.now();
										const updated = [...prev, {rating: i+1, timestamp: now}];
										return updated.length > maxBars ? updated.slice(-maxBars) : updated;
									});
								}}
							>
								{i+1}
							</button>
						))}
					</div>
					<span className="graph-emoji-right" role="img" aria-label="sad" style={{fontSize: 32, marginLeft: 8}}>😢</span>
				</div>
			</div>
		</div>
	);
}

export default StressTracker;