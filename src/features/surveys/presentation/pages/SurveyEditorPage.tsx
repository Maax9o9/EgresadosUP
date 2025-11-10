// ============================================
// PAGE - Survey Editor (Clean Architecture)
// ============================================

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { EyeIcon } from '@heroicons/react/24/outline';
import { useSurveyEditor } from '../hooks/useSurveyEditor';
import { SurveyHeaderCard } from '../components/SurveyHeaderCard';
import { QuestionCard } from '../components/QuestionCard';
import { AddQuestionButton } from '../components/AddQuestionButton';
import { SurveyPreviewModal } from '../components/SurveyPreviewModal';

export const SurveyEditorPage = () => {
  const [showPreview, setShowPreview] = useState(false);
  const location = useLocation();
  
  // Obtener las preguntas del template si vienen del state
  const initialQuestions = location.state?.questions || [];
  
  const {
    title,
    description,
    questions,
    setTitle,
    setDescription,
    addQuestion,
    deleteQuestion,
    updateQuestion,
    changeQuestionType,
    addOption,
    updateOption,
    deleteOption,
    saveSurvey,
    cancel,
  } = useSurveyEditor({ initialQuestions });

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-24">
        {/* Page Title Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Title Section */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#8DD2FF] to-[#6BB8E6] rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                <EyeIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Nueva Encuesta
                </h1>
                <p className="text-sm text-gray-600 mt-2">
                  Crea y personaliza tu encuesta • {questions.length} {questions.length === 1 ? 'pregunta' : 'preguntas'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowPreview(true)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#6BB8E6] bg-white border-2 border-[#8DD2FF] hover:bg-[#8DD2FF]/10 rounded-xl transition-all shadow-sm hover:shadow-md"
            >
              <EyeIcon className="h-5 w-5" />
              <span>Vista previa</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-5">
            {/* Header Card */}
            <SurveyHeaderCard
              title={title}
              description={description}
              onTitleChange={setTitle}
              onDescriptionChange={setDescription}
            />

            {/* Questions */}
            {questions.map((question, index) => (
              <QuestionCard
                key={question.id}
                question={question}
                index={index}
                onQuestionChange={(id, text) => updateQuestion(id, { texto: text })}
                onQuestionTypeChange={changeQuestionType}
                onQuestionDelete={deleteQuestion}
                onRequiredToggle={(id, required) => updateQuestion(id, { requerida: required })}
                onOptionAdd={addOption}
                onOptionChange={updateOption}
                onOptionDelete={deleteOption}
              />
            ))}

            {/* Add Question Button */}
            <AddQuestionButton onClick={addQuestion} />
          </div>
        </div>

        {/* Fixed Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] lg:left-64">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600 order-2 sm:order-1">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8DD2FF]/20 to-[#6BB8E6]/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-[#6BB8E6]">
                    {questions.length}
                  </span>
                </div>
                <span className="font-medium">
                  {questions.length === 1 ? 'pregunta' : 'preguntas'}
                </span>
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
                <button
                  onClick={cancel}
                  className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 rounded-xl transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={saveSurvey}
                  className="flex-1 sm:flex-none px-8 py-2.5 text-sm font-semibold bg-gradient-to-r from-[#8DD2FF] to-[#6BB8E6] text-white rounded-xl hover:from-[#6BB8E6] hover:to-[#8DD2FF] shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
                >
                  Guardar encuesta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <SurveyPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title={title}
        description={description}
        questions={questions}
      />
    </>
  );
};
