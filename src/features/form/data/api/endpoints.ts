export const FORM_ENDPOINTS = {
  base: '/formulario',
  getForms: () => '/formulario',
  getFormById: (id: string) => `/formulario/${id}`,
  createForm: () => '/formulario',
  updateForm: (id: string) => `/formulario/${id}`,
  deleteForm: (id: string) => `/formulario/${id}`,
  addQuestion: (formId: string) => `/formulario/${formId}/preguntas`,
  removeQuestion: (formId: string, questionId: string) => 
    `/formulario/${formId}/preguntas/${questionId}`,
  getQuestionCount: (questionId: string) => 
    `/formulario/pregunta/${questionId}/count`,
} as const;
