// @ flow
import type { SectionFormSubmission, SectionForm } from './flowTypes';
import { slugify } from 'grommet-cms/utils';

export default (sectionForm: SectionForm): SectionFormSubmission  => {
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
