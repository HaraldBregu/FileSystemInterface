export default class Utils {
    
    static isBlankString(str: string) {
        return (!str || /^\s*$/.test(str));
    }
    
}