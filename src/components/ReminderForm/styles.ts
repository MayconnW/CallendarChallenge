export const selectStyles = {
  container: (base: any) => ({
    ...base,
    height: 35,
    minHeight: 35,
    width: "100%",
    marginInlineStart: '0 !important'
  }),
  control: (base: any) => ({
    ...base,
    height: 35,
    minHeight: 35,
    marginTop: 0,
    borderColor: '#E2E8F0',
    hover: {
      borderColor: 'red'
    }
  }),
  indicatorsContainer: (base: any) => ({
    ...base,
    height: 35,
    minHeight: 35,
    marginTop: 0
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    height: 35,
    minHeight: 35,
    marginTop: 0
  }),
  placeholder: (base: any) => ({
    ...base,
    color: '#A0AEC0'
  }),
  valueContainer: (base: any) => ({
    ...base,
    paddingLeft: 32
  }),
  menuList: (base: any) => ({
    ...base,
    maxHeight: 120
  })
};
