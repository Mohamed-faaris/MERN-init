
export const statusEnum = ['notSeen', 'inProgress', 'completed', 'seen']

export function statusIntToString(val){
    return statusEnum[val];
}           

export const statusStringToInt = (str)=>{
    return statusEnum.indexOf(str);
}

export const roleEnum = ['student', 'faculty', 'classAdvisor', 'HOD', "admin" ,'dev'];

export function roleIntToString(val){
    return roleEnum[val];
}

export function roleStringToInt(str){
    return roleEnum.indexOf(str);
}