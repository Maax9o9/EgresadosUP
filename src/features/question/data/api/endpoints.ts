export const QUESTION_ENDPOINTS = {
  getQuestions: (texto?: string) => 
    `/pregunta${texto ? `?texto=${encodeURIComponent(texto)}` : ''}`,
  getQuestionById: (id: string) => `/pregunta/${id}`,
  createQuestion: () => '/pregunta',
  updateQuestion: (id: string) => `/pregunta/${id}`,
  deleteQuestion: (id: string) => `/pregunta/${id}`,
} as const;

export const QUESTION_OPTION_ENDPOINTS = {
  getQuestionOptions: (preguntaId?: string) =>
    `/opcion-pregunta${preguntaId ? `?preguntaId=${preguntaId}` : ''}`,
  getQuestionOptionById: (id: string) => `/opcion-pregunta/${id}`,
  createQuestionOption: () => '/opcion-pregunta',
  updateQuestionOption: (id: string) => `/opcion-pregunta/${id}`,
  deleteQuestionOption: (id: string) => `/opcion-pregunta/${id}`,
} as const;
