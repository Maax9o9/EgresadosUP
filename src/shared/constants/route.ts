export const ROUTES = {
  // Auth
  LOGIN: "/login",
  HOME: "/",
  DASHBOARD: "/dashboard",

  // Surveys 
  SURVEYS_CREATE: "/surveys/create",
  SURVEY_EDITOR: "/surveys/editor",
  SURVEY_CATALOG: "/survey-catalog",
  SURVEY_RESPONDENTS: "/respondents",
  SURVEY_SENDTO: "/survey-sendto",
  SURVEY_SEND: "/send-survey",
  SURVEY_METRICS: "/surveys/metrics",

  CREATE_MAIL_TEMPLATE: "/mail/template/create",
} as const