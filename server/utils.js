//функция нужна для создания форматированного ответа на запрос
//для удобности использования закостылена так, чтобы при передаче первым аргументом числа возвращала обьект ошибки
//а если аргумент не число то возвращает обьект успешного ответа с данными
//соответственно нельзя передавать данные в виде чисел
function createResponse(data, code = 0) {
  if (typeof data === 'number') code = data
  if (code !== 0) data = {'errorMessage': getErrorMessageByCode(code)}
  return {code: code, data: data}
}

function getErrorMessageByCode(code) {
  switch (code) {
    case 1: return 'invalid mail'
    case 2: return 'unknown server error'
    case 3: return 'invalid mail uid'
    case 4: return 'get body invalid data'
    case 5: return 'invalid auth data'
    case 6: return 'wrong password'
    case 7: return 'unauthorized'
    case 8: return 'DB Error'
    default: return 'server error'
  }
}

module.exports = {
  createResponse
}