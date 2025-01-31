import chalk from 'chalk';

const requestLogger = (req, res, next) => {
  const method = req.method;
  const url = req.originalUrl;

  let color;
  switch (method) {
    case 'GET':
      color = chalk.green;
      break;
    case 'POST':
      color = chalk.blue;
      break;
    case 'PUT':
      color = chalk.yellow;
      break;
    case 'DELETE':
      color = chalk.red;
      break;
    default:
      color = chalk.white;
  }

  console.log(color(`${method} request to ${url}`));

  next();
};

export default requestLogger;
