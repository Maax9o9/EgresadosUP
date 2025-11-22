import { useCallback } from "react";
// import { useEmailTemplateRepository } from 'data/EmailTemplateRepository';

const useSaveEmailTemplate = () => {
  // const repository = useEmailTemplateRepository();

  return useCallback(async (template: {subject: string, content: string}) => {
    // await repository.saveTemplate(template)
  }, []);
};

export default useSaveEmailTemplate;
