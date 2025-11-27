import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormById } from './useFormById';
import { useUpdateForm } from './useUpdateForm';
import { useAddQuestionToForm } from './useAddQuestionToForm';
import { useRemoveQuestionFromForm } from './useRemoveQuestionFromForm';
import { useCreateQuestion } from '@/features/question/presentation/hooks/useCreateQuestion';
import { useCreateQuestionOption } from '@/features/question/presentation/hooks/useCreateQuestionOption';
import { useQuestionTypes } from '@/features/questionType/presentation/hooks/useQuestionTypes';
import { alertService } from '@/shared/services/alert.service';
import { ROUTES } from '@/shared/constants/route';
import type { Pregunta, OpcionPregunta } from '@/shared/types';

interface UseSurveyEditorProps {
  formId?: string;
  initialQuestions?: Pregunta[];
}

export const useSurveyEditor = ({ 
  formId, 
  initialQuestions = [] 
}: UseSurveyEditorProps) => {
  const navigate = useNavigate();
  const { form, isLoading: isLoadingForm } = useFormById(formId || null);
  const { updateForm } = useUpdateForm();
  const { addQuestionToForm } = useAddQuestionToForm();
  const { removeQuestionFromForm } = useRemoveQuestionFromForm();
  const { createQuestion } = useCreateQuestion();
  const { createQuestionOption } = useCreateQuestionOption();
  const { questionTypes, isLoading: isLoadingTypes } = useQuestionTypes();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Pregunta[]>(initialQuestions);
  const [isFormLoaded, setIsFormLoaded] = useState(false);

  useEffect(() => {
    if (form && !isFormLoaded) {
      setTitle(form.titulo);
      setDescription(form.descripcion);
      
      if (form.preguntas && form.preguntas.length > 0 && questionTypes.length > 0) {
        const preguntasConvertidas: Pregunta[] = form.preguntas.map(fq => ({
          id: fq.id,
          texto: '',
          tipoPreguntaId: questionTypes[0]?.id || '',
          requerida: false,
          opciones: [],
          orden: fq.orden
        }));
        setQuestions(preguntasConvertidas);
      }
      
      setIsFormLoaded(true);
    }
  }, [form, questionTypes, isFormLoaded]);

  const addQuestion = () => {
    if (questionTypes.length === 0) {
      alertService.error('Esperando tipos de pregunta...');
      return;
    }

    const defaultTypeId = questionTypes[0]?.id || '';
    
    const newQuestion: Pregunta = {
      id: `temp-${Date.now()}`,
      texto: '',
      tipoPreguntaId: defaultTypeId,
      requerida: false,
      opciones: [],
      orden: questions.length + 1,
    };
    setQuestions([...questions, newQuestion]);
  };

  const deleteQuestion = async (id: string) => {
    if (id.startsWith('temp-')) {
      setQuestions(questions.filter((q) => q.id !== id));
      return;
    }

    if (formId) {
      try {
        await removeQuestionFromForm({ formId, questionId: id });
        setQuestions(questions.filter((q) => q.id !== id));
        alertService.success('Pregunta eliminada del formulario');
      } catch (error) {
        alertService.error('Error al eliminar la pregunta');
      }
    } else {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  const updateQuestion = (id: string, updates: Partial<Pregunta>) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, ...updates } : q))
    );
  };

  const changeQuestionType = (id: string, newTypeId: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id !== id) return q;

        const tipo = questionTypes.find(qt => qt.id === newTypeId);
        const tipoNombre = tipo?.nombre.toLowerCase() || '';
        
        let opciones: OpcionPregunta[] = [];
        
        if (tipoNombre.includes('múltiple')) {
          opciones = [
            { id: `opt-${Date.now()}-1`, texto: 'Opción 1', etiqueta: 'A' },
            { id: `opt-${Date.now()}-2`, texto: 'Opción 2', etiqueta: 'B' },
          ];
        } else if (tipoNombre.includes('boolean')) {
          opciones = [
            { id: `opt-${Date.now()}-1`, texto: 'Sí', etiqueta: 'A' },
            { id: `opt-${Date.now()}-2`, texto: 'No', etiqueta: 'B' },
          ];
        } else if (tipoNombre.includes('likert')) {
          opciones = [
            { id: `opt-${Date.now()}-1`, texto: 'Muy en desacuerdo', etiqueta: '1' },
            { id: `opt-${Date.now()}-2`, texto: 'En desacuerdo', etiqueta: '2' },
            { id: `opt-${Date.now()}-3`, texto: 'Neutral', etiqueta: '3' },
            { id: `opt-${Date.now()}-4`, texto: 'De acuerdo', etiqueta: '4' },
            { id: `opt-${Date.now()}-5`, texto: 'Muy de acuerdo', etiqueta: '5' },
          ];
        }

        return { ...q, tipoPreguntaId: newTypeId, opciones };
      })
    );
  };

  const addOption = (questionId: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id !== questionId) return q;
        const nextLetter = String.fromCharCode(65 + (q.opciones?.length || 0));
        const newOption: OpcionPregunta = {
          id: `opt-${Date.now()}`,
          texto: `Opción ${(q.opciones?.length || 0) + 1}`,
          etiqueta: nextLetter,
        };
        return {
          ...q,
          opciones: [...(q.opciones || []), newOption],
        };
      })
    );
  };

  const updateOption = (questionId: string, optionId: string, text: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id !== questionId) return q;
        return {
          ...q,
          opciones: q.opciones?.map((opt) =>
            opt.id === optionId ? { ...opt, texto: text } : opt
          ),
        };
      })
    );
  };

  const deleteOption = (questionId: string, optionId: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id !== questionId) return q;
        const filteredOptions = q.opciones?.filter((opt) => opt.id !== optionId);
        if (filteredOptions && filteredOptions.length >= 2) {
          return { ...q, opciones: filteredOptions };
        }
        return q;
      })
    );
  };

  const saveSurvey = async () => {
  if (!formId) {
    alertService.error('Error: No se encontró el ID del formulario');
    return;
  }

  if (!title.trim()) {
    alertService.error('El título del formulario es requerido');
    return;
  }

  try {
    await updateForm({
      id: formId,
      titulo: title,
      descripcion: description,
      isActive: true,
    });

    const existingQuestionsCount = form?.preguntas?.length || 0;
    let nextOrder = existingQuestionsCount + 1;

    for (const question of questions) {
      if (question.id.startsWith('temp-')) {
        console.log('Creating question:', question);
        
        const createdQuestion = await createQuestion({
          textoPregunta: question.texto,
          esObligatoria: question.requerida,
          tipoPreguntaId: question.tipoPreguntaId,
        });

        console.log('Created question:', createdQuestion);

        await addQuestionToForm({
          formId,
          questionId: createdQuestion.id,
          orden: nextOrder,
        });

        console.log('Added question to form with orden:', nextOrder);
        nextOrder++;

        if (question.opciones && question.opciones.length > 0) {
          console.log('Creating options for question:', createdQuestion.id);
          
          for (const option of question.opciones) {
            console.log('Creating option:', {
              texto: option.texto,
              etiqueta: option.etiqueta || '',
              preguntaId: createdQuestion.id
            });
            
            await createQuestionOption({
              textoOpcion: option.texto,
              etiqueta: option.etiqueta || '',
              preguntaId: createdQuestion.id,
            });
          }
        }
      }
    }

    alertService.success('Formulario guardado exitosamente');
    navigate(ROUTES.SURVEY_CATALOG);
  } catch (error) {
    alertService.error('Error al guardar el formulario');
    console.error(error);
  }
};




  const cancel = () => {
    navigate(ROUTES.SURVEY_CATALOG);
  };

  return {
    title,
    description,
    questions,
    questionTypes,
    isLoading: isLoadingForm || isLoadingTypes,
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
  };
};
