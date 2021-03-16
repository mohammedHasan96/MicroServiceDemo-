// create controller with given name
// append to last line and first line
const fs = require('fs');

const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};


const servicesContant = (pluralCapitalWord, pluralSmallWord, singleCapitalWord, singleSmallWord) => `
import database from 'database';

const { ${pluralSmallWord}: ${pluralCapitalWord} } = database;

export const getAll${pluralCapitalWord} = async (transaction) => {
  const ${pluralSmallWord} = await ${pluralCapitalWord}.findAll({ transaction });
  return ${pluralSmallWord};
};

export const get${singleCapitalWord} = async (filter, transaction) => ${pluralCapitalWord}.findOne({ ...filter, transaction });

export const create${singleCapitalWord} = async (data, transaction) => ${pluralCapitalWord}.create(data, { transaction });

export const update${singleCapitalWord} = async (filter, data, transaction) => ${pluralCapitalWord}.update(data, { ...filter, transaction });

export const delete${singleCapitalWord} = async (filter, transaction) => {
  const ${singleSmallWord} = await ${pluralCapitalWord}.destroy({ ...filter, transaction });
  return ${singleSmallWord};
};
`;

const controllersContant = (pluralCapitalWord, pluralSmallWord, singleCapitalWord, singleSmallWord) => `
import { ${pluralSmallWord}Services } from 'services';
import { dto, httpResponse } from 'helpers';

export const listAll${pluralCapitalWord} = async (request, response, _next, transaction) => {
  const ${pluralSmallWord} = await ${pluralSmallWord}Services.getAll${pluralCapitalWord}(transaction);
  transaction.commit();
  return httpResponse.ok(response, ${pluralSmallWord});
};

export const list${singleCapitalWord} = async (request, response, _next, transaction) => {
  const params = dto.generalDTO.paramsData(request);
  const id = dto.${pluralSmallWord}DTO.${pluralSmallWord}Id(params);
  const filter = dto.generalDTO.filterData({ id });
  const ${singleSmallWord} = await ${pluralSmallWord}Services.get${singleCapitalWord}(filter, transaction);
  if (!${singleSmallWord}) {
    transaction.commit();
    return httpResponse.badRequest(response, '${pluralCapitalWord} not exists');
  }
  transaction.commit();
  return httpResponse.ok(response, ${singleSmallWord});
};

export const create${pluralCapitalWord} = async (request, response, _next, transaction) => {
  const body = dto.generalDTO.bodyData(request);

  const ${singleSmallWord}Data = dto.${pluralSmallWord}DTO.${pluralSmallWord}Data(body);
  const ${singleSmallWord} = await ${pluralSmallWord}Services.create${singleCapitalWord}(
    ${singleSmallWord}Data,
    transaction
  );

  transaction.commit();

  return httpResponse.created(
    response,
    ${singleSmallWord},
    '${singleSmallWord} has been created'
  );
};

export const delete${pluralCapitalWord} = async (request, response, _next, transaction) => {
  const paramsData = dto.generalDTO.paramsData(request);
  const id = dto.${pluralSmallWord}DTO.${pluralSmallWord}Id(paramsData);
  const filter = dto.generalDTO.filterData({ id });

  const ${singleSmallWord} = await ${pluralSmallWord}Services.delete${singleCapitalWord}(filter, transaction);
  if (!${singleSmallWord}) {
    transaction.commit();
    return httpResponse.badRequest(response, '${pluralCapitalWord} not exists');
  }
  transaction.commit();
  return httpResponse.ok(response, {}, '${pluralCapitalWord} Deleted');
};

export const update${pluralCapitalWord} = async (request, response, _next, transaction) => {
  const bodyData = dto.generalDTO.bodyData(request);
  const paramsData = dto.generalDTO.paramsData(request);
  const id = dto.${pluralSmallWord}DTO.${pluralSmallWord}Id(paramsData);
  const ${singleSmallWord}Data = dto.${pluralSmallWord}DTO.${pluralSmallWord}Data(bodyData);
  const filter = dto.generalDTO.filterData({ id });
  const [count] = await ${pluralSmallWord}Services.update${singleCapitalWord}(filter, ${singleSmallWord}Data, transaction);

  let data = {};
  if (count) data = await ${pluralSmallWord}Services.get${singleCapitalWord}(filter, transaction);

  transaction.commit();
  return httpResponse.ok(response, data);
};
`

const routesContant = (pluralCapitalWord, pluralSmallWord, singleCapitalWord, singleSmallWord) => `
import express from 'express';
import { ${pluralSmallWord}Controllers } from 'controllers';
import asyncHandler from 'middleware/asyncHandler';
import { ${pluralSmallWord}Validation } from 'validations';
import { validateBody, validateParams } from 'middleware/validate';
const router = express.Router();

router
  .get('/${pluralSmallWord}', asyncHandler(${pluralSmallWord}Controllers.listAll${pluralCapitalWord}))
  .get(
    '/${pluralSmallWord}/:id',
    validateParams(${pluralSmallWord}Validation.${pluralSmallWord}ParamsValidation),
    asyncHandler(${pluralSmallWord}Controllers.list${singleCapitalWord})
  )
  .post(
    '/${pluralSmallWord}',
    validateBody(${pluralSmallWord}Validation.create${pluralCapitalWord}Validation),
    asyncHandler(${pluralSmallWord}Controllers.create${pluralCapitalWord})
  )
  .put(
    '/${pluralSmallWord}/:id',
    validateParams(${pluralSmallWord}Validation.${pluralSmallWord}ParamsValidation),
    validateBody(${pluralSmallWord}Validation.update${pluralCapitalWord}Validation),
    asyncHandler(${pluralSmallWord}Controllers.update${pluralCapitalWord})
  )
  .delete(
    '/${pluralSmallWord}/:id',
    validateParams(${pluralSmallWord}Validation.${pluralSmallWord}ParamsValidation),
    asyncHandler(${pluralSmallWord}Controllers.delete${pluralCapitalWord})
  );

export default router;
`;

const validationContant = (pluralCapitalWord, pluralSmallWord, singleCapitalWord, singleSmallWord) => `
import joi from '@hapi/joi';
import joiObject from 'joi-objectid';

joi.objectId = joiObject(joi);

export const ${pluralSmallWord}ParamsValidation = joi.object({
  id: joi.string().required(),
});
export const create${pluralCapitalWord}Validation = joi.object({
  name: joi.string().required(),
});

export const update${pluralCapitalWord}Validation = joi.object({
  name: joi.string().required(),
});

`;

const modelContant = (models) => (pluralCapitalWord, pluralSmallWord, singleCapitalWord, singleSmallWord) => `
const ${pluralSmallWord} = (sequelize, DataTypes) => {
  const ${pluralCapitalWord} = sequelize.define('${pluralSmallWord}', {
    name: {
      type: DataTypes.STRING,
    },
  });

  ${pluralCapitalWord}.associate = (models) => {
    ${models.map((model) => `${pluralCapitalWord}.hasMany(models.${model}, { foreignKey: '${singleSmallWord}', onDelete: 'CASCADE' });`).join("\n")}
  };

return ${pluralCapitalWord};
};

export default ${pluralSmallWord};
`;

const dtoContant = (pluralCapitalWord, pluralSmallWord, singleCapitalWord, singleSmallWord) => `
export const ${pluralSmallWord}Id = (data) => data.id;
export const ${pluralSmallWord}Data = (data) => ({ name: data.name });
`;

const servicesContantIndex = (pluralCapitalWord, pluralSmallWord, singleCapitalWord, singleSmallWord) => [
  `import * as ${pluralCapitalWord} from './${pluralCapitalWord}'; `,
  `export const ${pluralSmallWord}Services = ${pluralCapitalWord}; `
];
const controllersContantIndex = (pluralCapitalWord, pluralSmallWord, singleCapitalWord, singleSmallWord) => [
  `import * as ${pluralSmallWord} from './${pluralSmallWord}'; `,
  `export const ${pluralSmallWord}Controllers = ${pluralSmallWord}; `
];
const validationContantIndex = (pluralCapitalWord, pluralSmallWord, singleCapitalWord, singleSmallWord) => [
  `import * as ${pluralSmallWord} from './${pluralSmallWord}'; `,
  `export const ${pluralSmallWord}Validation = ${pluralSmallWord}; `
];
const dtoContantIndex = (pluralCapitalWord, pluralSmallWord, singleCapitalWord, singleSmallWord) => [
  `import * as ${pluralSmallWord} from './${pluralSmallWord}'; `,
  `export const ${pluralSmallWord}DTO = ${pluralSmallWord}; `
];

const routesContantIndex = (pluralCapitalWord, pluralSmallWord, singleCapitalWord, singleSmallWord) => [
  `import ${pluralSmallWord}Routers from './${pluralSmallWord}'; `,
  `  ${pluralSmallWord}Routers,`
];


const withJs = (word) => `${word}.js`;

const name = 'product';
const plural = false;

const pluralCapitalWord = capitalize(plural) || `${capitalize(name)}s`;
const pluralSmallWord = plural || `${name}s`;
const singleCapitalWord = capitalize(name);
const singleSmallWord = name;

const fileNameServices = withJs(pluralCapitalWord);
const fileNameControllers = withJs(pluralSmallWord);
const fileNameRoutes = withJs(pluralSmallWord);
const fileNameValidation = withJs(pluralSmallWord);
const fileNameDto = withJs(pluralSmallWord);
const fileNameModels = withJs(pluralCapitalWord);

const pathServices = './src/services';
const pathControllers = './src/controllers';
const pathRoutes = './src/routes';
const pathValidation = './src/validations';
const pathDto = './src/helpers/dto';
const pathModels = './src/models';

const createFile = async (Path, fileName, contant) => await fs.promises.writeFile(`${Path}/${fileName}`, contant(pluralCapitalWord, pluralSmallWord, singleCapitalWord, singleSmallWord));

const addlineEndFront = (path, [firstLine, secandLine]) => {
  const lines = fs.readFileSync(`${path}/index.js`, 'utf-8').split(/\r?\n/);
  lines.unshift(firstLine);
  lines.push(secandLine);
  const contant = lines.join('\n');
  fs.writeFileSync(`${path}/index.js`, contant, 'utf-8');
};

const addlineRoute = (path, arr) => {
  const start = arr[0];
  const middle = arr[1];
  const lines = fs.readFileSync(`${path}/index.js`, 'utf-8').split(/\r?\n/);
  lines.forEach((line, index) => {
    if (index === 1) lines.splice(index + 1, 0, start);
    if (line === 'router.use(\'/\', [') lines.splice(index + 1, 0, middle);
  });
  const contant = lines.join('\n');
  fs.writeFileSync(`${path}/index.js`, contant, 'utf-8');
};

(async () => {
  await createFile(pathServices, fileNameServices, servicesContant);
  await createFile(pathControllers, fileNameControllers, controllersContant);
  await createFile(pathRoutes, fileNameRoutes, routesContant);
  await createFile(pathValidation, fileNameValidation, validationContant);
  await createFile(pathDto, fileNameDto, dtoContant);
  await createFile(pathModels, fileNameModels, modelContant(['vehicles']));

  addlineRoute(pathRoutes, routesContantIndex(pluralCapitalWord, pluralSmallWord, singleCapitalWord, singleSmallWord));
  addlineEndFront(pathServices, servicesContantIndex(pluralCapitalWord, pluralSmallWord, singleCapitalWord, singleSmallWord));
  addlineEndFront(pathControllers, controllersContantIndex(pluralCapitalWord, pluralSmallWord, singleCapitalWord, singleSmallWord));
  addlineEndFront(pathValidation, validationContantIndex(pluralCapitalWord, pluralSmallWord, singleCapitalWord, singleSmallWord));
  addlineEndFront(pathDto, dtoContantIndex(pluralCapitalWord, pluralSmallWord, singleCapitalWord, singleSmallWord));
})();
