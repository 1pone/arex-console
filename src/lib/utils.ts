export function formatBytes(bytes?: number): string {
  if (!bytes) {
    return '0 Bytes'
  }
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const passwordRegStr = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$' // 注意双重转义
export const passwordReg = RegExp(passwordRegStr)
