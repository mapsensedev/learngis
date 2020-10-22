export const csvToJson = (csv) => {
  let lines = [];
  const linesArray = csv.split('\n');

  linesArray.forEach((e) => {
    const row = e.replace(/[\s]+[,]+|[,]+[\s]+/g, ',').trim();
    lines.push(row);
  });

  lines.splice(lines.length - 1, 1);
  const result = [];
  const headers = lines[0].split(',');

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentline = lines[i].split(',');

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j] === undefined ? '' : currentline[j];
    }
    result.push(obj);
  }

  return result;
};
