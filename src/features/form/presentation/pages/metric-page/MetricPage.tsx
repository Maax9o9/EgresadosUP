import React from "react";
import MetricHeader from "../../components/metric-header/MetricHeader";
import MetricQuestion from "../../components/metric-question/MetricQuestion";

const MetricPage: React.FC = () => {
	return (
		<div className="p-6 space-y-6">
			<MetricHeader />

			<div className="grid grid-cols-1 gap-6">
				<MetricQuestion />
			</div>
		</div>
	);
};

export default MetricPage;

