import { contactRepository } from "../repositories";
import { IContact } from "../models/Contact";
import { CreateContactDTO } from "../dtos";
import { sendEmail } from "../utils/email";
import { NotFoundError } from "../errors";
import { config } from "../config/env.config";

export class ContactService {
  async submitContact(data: CreateContactDTO): Promise<IContact> {
    const contact = await contactRepository.create(data);

    // Notify Dr. Sudan Puri via email
    await sendEmail({
      to: config.admin.email,
      subject: `New Contact Message: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #1A3C6E;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message}</p>
          <hr />
          <p style="color: #999; font-size: 12px;">
            Dr. Sudan Puri — Personal Website
          </p>
        </div>
      `,
    });

    return contact;
  }

  async getAllContacts(): Promise<IContact[]> {
    return await contactRepository.findAll();
  }

  async markAsRead(id: string): Promise<IContact> {
    const contact = await contactRepository.markAsRead(id);
    if (!contact) {
      throw new NotFoundError("Contact message not found");
    }
    return contact;
  }
}

export default new ContactService();