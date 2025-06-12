import { VALIDATION_FILES } from '../../../constants/validation'

export const UPLOAD_SCHEMA = {
  files: VALIDATION_FILES('body'),
}
