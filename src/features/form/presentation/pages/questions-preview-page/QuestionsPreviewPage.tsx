import React from "react";
import QuestionHeader from "../../components/question-header/QuestionHeader";
import Question from "../../components/question/Question";

const QuestionsPreviewPage: React.FC = () => {
	return (
		<div className="p-2 sm:p-6 space-y-6">
			<QuestionHeader />

			<div className="grid grid-cols-1 gap-6">
				<Question />
			</div>
		</div>
	);
};

export default QuestionsPreviewPage;
