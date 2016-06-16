import GenericObject from '../types/genericObject';
export default function keys<T>(obj: GenericObject<T>): string[] {
    return Object.keys(obj);
}
