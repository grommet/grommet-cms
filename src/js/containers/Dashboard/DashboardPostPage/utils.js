// @ flow
import { slugify } from 'grommet-cms/utils';
import type { SectionFormSubmission, SectionForm } from './flowTypes';

export default (sectionForm: SectionForm): SectionFormSubmission => {
  const name = sectionForm.name.value || '';
  const id = slugify(name);
  return {
    name,
    id,
    padding: sectionForm.padding.value,
    basis: sectionForm.basis.value,
    wrap: sectionForm.wrap.value,
    selectedSection: sectionForm.selectedSection
  };
};
