
export const statusEnum = ['notSeen', 'inProgress', 'completed', 'seen']

export function statusIntToString(val){
    return statusEnum[val];
}           

export function statusStringToInt(str){
    return statusEnum.find(str);
}
const roleEnum = ['student', 'faculty', 'classAdvisor', 'HOD', "admin" ,'dev'];

export function roleIntToString(val){
    return roleEnum[val];
}

export function roleStringToInt(str){
    return roleEnum.find(str);
}