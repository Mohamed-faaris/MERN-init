
export const statusEnum = ['notSeen', 'inProgress', 'completed', 'seen']

export const statusIntToString=(val)=>statusEnum[val];           

export const statusStringToInt = (str)=>statusEnum.indexOf(str);

export const roleEnum = ['student', 'faculty', 'classAdvisor', 'HOD', "admin" ,'dev'];

export const roleIntToString=(val)=>roleEnum[val]

export const roleStringToInt=(str)=>roleEnum.indexOf(str)