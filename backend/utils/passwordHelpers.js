import bcrypt from "bcryptjs";

const saltRounds = 10;

export function hashPassword(password){
	const salt = bcrypt.genSaltSync(saltRounds);
	return bcrypt.hashSync(password, salt);
};

export function comparePassword (plain, hashed) {
	return bcrypt.compareSync(plain, hashed);
}