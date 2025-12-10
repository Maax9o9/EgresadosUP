import MetricHeader from '../../components/metric-header/MetricHeader';
import MetricQuestion from '../../components/metric-question/MetricQuestion';

const MetricPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <MetricHeader />
        <div className="mt-6">
          <MetricQuestion />
        </div>
      </div>
    </div>
  );
};

export default MetricPage;

