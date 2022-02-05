import { Types } from 'mongoose';

export const assertDocumentExistById = async (
  model: any,
  _id: Types.ObjectId | string,
) => {
  const data = await model.findOne({ _id, is_deleted: false });
  if (!data && !data?._id) throw new Error('Resource Not Found');
};
