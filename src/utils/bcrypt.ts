import bcrypt from 'bcrypt'

export const comparePass = (password: string, hashedPassword: string) =>
  bcrypt.compareSync(password, hashedPassword)

export const hashPassword = (password: string, saltRounds: number) =>
  bcrypt.hashSync(password, saltRounds)
