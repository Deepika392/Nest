import * as bcrypt from 'bcrypt';

const SALT = 10;
// const password = 'random_password';
// const hash = await bcrypt.hash(password, saltOrRounds);

export async function encodePassword(rawPassword:string){
    const SALT = bcrypt.genSalt()
    return  bcrypt.hashSync(rawPassword,await SALT)

}

