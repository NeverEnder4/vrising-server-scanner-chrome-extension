import * as yup from 'yup';

const getSchema = ({ NICKNAME_MAX_LENGTH, NOTES_MAX_LENGTH }) => yup.object().shape({
  nickname: yup.string().max(NICKNAME_MAX_LENGTH),
  notes: yup.string().max(NOTES_MAX_LENGTH),
});

export default getSchema;
