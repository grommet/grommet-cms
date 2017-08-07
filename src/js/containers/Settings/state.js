export default {
  isLoading: false,
  error: null,
  data: null,
  message: null,
  form: {
    branding: {
      title: '',
      logo: null,
      theme: {
        value: { value: 'HPE', label: 'Hpe' },
        options: [
          { value: 'HPE', label: 'Hpe' },
          { value: 'GROMMET', label: 'Grommet' },
          { value: 'ARUBA', label: 'Aruba' }, 
          { value: 'HPI', label: 'HPInc' }
        ]
      }
    }
  }
};
