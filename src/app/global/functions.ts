export function isEmptyValue(value: any): boolean {
  if(value === null) return true;
  if(value === undefined) return true;
    if (typeof value === 'object' && value!== null) {
        if (!value.active) {
            return false;
          }
          if (!value.id) {
            return false;
          }
          if (!value.onactive || value.onactive === null ||!value.onaddtrack || value.onaddtrack === null ||!value.oninactive || value.oninactive === null ||!value.onremovetrack || value.onremovetrack === null) {
            return false;
          }
          return true;
    }
    let stringValue = String(value);
    return !(stringValue.trim().length!== 0);
}