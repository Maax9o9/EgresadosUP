import { useState, useEffect } from 'react';
import { useFormById } from '../hooks/useFormById';
import { useFormQuestions } from '../hooks/useFormQuestions';

interface QuestionMetric {
  questionId: string;
  questionText: string;
  totalResponses: number;
  isRequired: boolean;
  options?: Array<{
    id: string;
    label: string;
    text: string;
    count: number;
    percentage: number;
  }>;
  textResponses?: string[];
}

interface MetricsData {
  title: string;
  description: string;
  totalSent: number;
  totalResponded: number;
  notResponded: number;
  responseRate: number;
  questions: QuestionMetric[];
}

export const useMetrics = (formId: string | null) => {
  const { form, isLoading: isLoadingForm } = useFormById(formId);
  const { questions, isLoading: isLoadingQuestions } = useFormQuestions(formId || '');
  const [metrics, setMetrics] = useState<MetricsData | null>(null);

  const isLoading = isLoadingForm || isLoadingQuestions;

  useEffect(() => {
    if (form && questions.length > 0) {
      const questionMetrics: QuestionMetric[] = questions.map((q) => ({
        questionId: q.id,
        questionText: q.textoPregunta,
        totalResponses: 0,
        isRequired: q.esObligatoria,
        options: q.opciones?.map((opt) => ({
          id: opt.id,
          label: opt.etiqueta || '',
          text: opt.textoOpcion,
          count: 0,
          percentage: 0,
        })) || [],
        textResponses: [],
      }));

      setMetrics({
        title: form.titulo,
        description: form.descripcion,
        totalSent: 0,
        totalResponded: 0,
        notResponded: 0,
        responseRate: 0,
        questions: questionMetrics,
      });
    }
  }, [form, questions]);

  return { metrics, isLoading };
};
