import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/shared/constants/route";
import Layout from "@/shared/components/layout/Layout";

// ============================================
// PAGES
// ============================================

// Home
import HomePage from "@/features/home/HomePage";

// Surveys
import { CreateSurveyPage } from "@/features/surveys/presentation/pages/CreateSurveyPage";
import { SurveyEditorPage } from "@/features/surveys/presentation/pages/SurveyEditorPage";
import CatalogPage from "@/features/surveys/presentation/pages/catalog-page/CatalogPage";
import RespondentsPage from "@/features/surveys/presentation/pages/respondents-page/RespondentsPage";
import MetricPage from "@/features/surveys/presentation/pages/metric-page/MetricPage";
import { SendSurveyPage } from "@/features/surveys/presentation/pages/SendSurveyPage";

// Mail
import { CreateEmailTemplatePage } from "@/features/mail/presentation/pages/CreateEmailTemplatePage";

// ============================================
// ROUTER CONFIGURATION
// ============================================

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.DASHBOARD,
        element: <HomePage />,
      },
      {
        path: ROUTES.SURVEYS_CREATE,
        element: <CreateSurveyPage />,
      },
      {
        path: ROUTES.SURVEY_EDITOR,
        element: <SurveyEditorPage />,
      },
      {
        path: ROUTES.SURVEY_CATALOG,
        element: <CatalogPage />,
      },
      {
        path: ROUTES.SURVEY_RESPONDENTS,
        element: <RespondentsPage />,
      },
      {
        path: ROUTES.SURVEY_SEND,
        element: <SendSurveyPage />,
      },
      {
        path: ROUTES.SURVEY_METRICS,
        element: <MetricPage />,
      },
      {
        path: ROUTES.CREATE_MAIL_TEMPLATE,
        element: <CreateEmailTemplatePage />,
      },
    ],
  },
]);