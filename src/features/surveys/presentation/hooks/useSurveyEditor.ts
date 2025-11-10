// ============================================
// CUSTOM HOOK - Survey Editor Logic
// ============================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { alertService } from '@/shared/services/alert.service';
import type { Pregunta, TipoPregunta } from '@/shared/types';
import { ROUTES } from '@/shared/constants/route';

interface UseSurveyEditorProps {
  initialQuestions?: Pregunta[];
}

export const useSurveyEditor = ({ initialQuestions = [] }: UseSurveyEditorProps = {}) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Pregunta[]>(initialQuestions);

  const addQuestion = () => {
    const newQuestion: Pregunta = {
      id: `question-${Date.now()}`,
      texto: '',
      tipo: 'abierta',
      requerida: false,
      orden: questions.length + 1,
    };
    setQuestions([...questions, newQuestion]);
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestion = (id: string, changes: Partial<Pregunta>) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, ...changes } : q))
    );
  };

  const addOption = (questionId: string) => {
    const question = questions.find((q) => q.id === questionId);
    if (!question) return;

    const newOption = {
      id: `option-${Date.now()}`,
      texto: '',
      orden: (question.opciones?.length || 0) + 1,
    };

    updateQuestion(questionId, {
      opciones: [...(question.opciones || []), newOption],
    });
  };

  const deleteOption = (questionId: string, optionId: string) => {
    const question = questions.find((q) => q.id === questionId);
    if (!question?.opciones) return;

    updateQuestion(questionId, {
      opciones: question.opciones.filter((op) => op.id !== optionId),
    });
  };

  const updateOption = (questionId: string, optionId: string, text: string) => {
    const question = questions.find((q) => q.id === questionId);
    if (!question?.opciones) return;

    updateQuestion(questionId, {
      opciones: question.opciones.map((op) =>
        op.id === optionId ? { ...op, texto: text } : op
      ),
    });
  };

  const changeQuestionType = (questionId: string, newType: TipoPregunta) => {
    const changes: Partial<Pregunta> = { tipo: newType };

    if (newType === 'multiple' || newType === 'checkbox') {
      changes.opciones = [
        { id: `option-${Date.now()}-1`, texto: '', orden: 1 },
        { id: `option-${Date.now()}-2`, texto: '', orden: 2 },
      ];
    } else {
      changes.opciones = undefined;
    }

    updateQuestion(questionId, changes);
  };

  const validateSurvey = (): boolean => {
    if (!title.trim()) {
      alertService.error('El título de la encuesta es requerido');
      return false;
    }

    if (questions.length === 0) {
      alertService.error('Agrega al menos una pregunta');
      return false;
    }

    const hasEmptyQuestions = questions.some((q) => !q.texto.trim());
    if (hasEmptyQuestions) {
      alertService.error('Todas las preguntas deben tener texto');
      return false;
    }

    const hasIncompleteOptions = questions.some(
      (q) =>
        (q.tipo === 'multiple' || q.tipo === 'checkbox') &&
        (!q.opciones || q.opciones.length < 2 || q.opciones.some((op) => !op.texto.trim()))
    );

    if (hasIncompleteOptions) {
      alertService.error('Las preguntas de opción múltiple deben tener al menos 2 opciones con texto');
      return false;
    }

    return true;
  };

  const saveSurvey = () => {
    if (!validateSurvey()) return;

    // TODO: API call here
    console.log('Save survey:', { title, description, questions });
    alertService.success('Encuesta creada exitosamente');
    navigate(ROUTES.DASHBOARD);
  };

  const cancel = () => {
    if (confirm('¿Seguro que deseas cancelar? Se perderán los cambios.')) {
      navigate(-1);
    }
  };

  return {
    // State
    title,
    description,
    questions,
    // Setters
    setTitle,
    setDescription,
    // Actions
    addQuestion,
    deleteQuestion,
    updateQuestion,
    addOption,
    deleteOption,
    updateOption,
    changeQuestionType,
    saveSurvey,
    cancel,
  };
};
