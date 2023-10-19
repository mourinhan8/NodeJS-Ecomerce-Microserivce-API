import _ from 'lodash';

export const getIntoData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields);
};
