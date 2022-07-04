import * as yup from 'yup';

const getSchema = ({ NICKNAME_MAX_LENGTH, NOTES_MAX_LENGTH }) => yup.object().shape({
  nickname: yup.string().max(NICKNAME_MAX_LENGTH),
  hostIp: yup.string().required('Required'),
  queryPort: yup.number().typeError('Required').required('Required'),
  notes: yup.string().max(NOTES_MAX_LENGTH),
});

export default getSchema;
