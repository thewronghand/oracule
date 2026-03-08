import { Input, TextArea, styled } from 'tamagui'

export const OraculeInput = styled(Input, {
  name: 'OraculeInput',
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$3',
  backgroundColor: '$background',
  color: '$color',
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  fontSize: '$4',
  focusStyle: {
    borderColor: '$accentBackground',
    outlineWidth: 0,
  },
  placeholderTextColor: '$placeholderColor',
})

export const OraculeTextArea = styled(TextArea, {
  name: 'OraculeTextArea',
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$3',
  backgroundColor: '$background',
  color: '$color',
  paddingHorizontal: '$3',
  paddingVertical: '$3',
  fontSize: '$4',
  minHeight: 120,
  focusStyle: {
    borderColor: '$accentBackground',
    outlineWidth: 0,
  },
  placeholderTextColor: '$placeholderColor',
})
