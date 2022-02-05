import { Schema } from 'mongoose';

const HomeAddressSchema = new Schema({
  city: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  },
  addressLine1: {
    type: String,
  },
  addressLine2: {
    type: String,
  },
});

export const EmployeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
    },
    homeAddress: HomeAddressSchema,
    dateOfEmployment: {
      type: Date,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
