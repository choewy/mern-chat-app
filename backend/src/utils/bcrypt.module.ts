import bcrypt from 'bcrypt';

const bcryptModule = {
  hashPassword: (password: string) => {
    const saltkey = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, saltkey);
  },
  comparePassword: (password: string, userPassword: string) => {
    return bcrypt.compareSync(password, userPassword);
  },
};

export default bcryptModule;
