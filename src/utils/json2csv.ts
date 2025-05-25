import converter = require('json-2-csv')

export const json2Csv = (data: object[]) => {
  const csv = converter.json2csv(data)
  return csv
}
