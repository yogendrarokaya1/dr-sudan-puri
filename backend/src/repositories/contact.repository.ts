import Contact, { IContact } from "../models/Contact";
import { CreateContactDTO } from "../dtos";

export class ContactRepository {
  async create(data: CreateContactDTO): Promise<IContact> {
    return await Contact.create(data);
  }

  async findAll(): Promise<IContact[]> {
    return await Contact.find().sort({ createdAt: -1 });
  }

  async markAsRead(id: string): Promise<IContact | null> {
    return await Contact.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );
  }
}

export default new ContactRepository();