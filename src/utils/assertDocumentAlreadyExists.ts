export const assertDocumentExistByPhoneOrEmail = async (
  model: any,
  email: string,
  phone: number,
) => {
  const data = await model.findOne({
    $or: [{ email }, { phoneNumber: phone }],
  });
  if (data && data?._id)
    throw new Error(
      'Document Already Exist with the same email or phone Number',
    );
};
