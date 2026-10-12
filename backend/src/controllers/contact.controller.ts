import { Request, Response, NextFunction } from "express";
import { contactService } from "../services";
import { sendSuccess } from "../utils";
import { CreateContactDTO } from "../dtos";

export class ContactController {
  async submitContact(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: CreateContactDTO = req.body;
      const contact = await contactService.submitContact(data);
      sendSuccess(res, "Message sent successfully", contact, 201);
    } catch (error) {
      next(error);
    }
  }

  async getAllContacts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const contacts = await contactService.getAllContacts();
      sendSuccess(res, "Contacts fetched successfully", contacts);
    } catch (error) {
      next(error);
    }
  }

  async markAsRead(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const contact = await contactService.markAsRead(id);
      sendSuccess(res, "Marked as read", contact);
    } catch (error) {
      next(error);
    }
  }
}

export default new ContactController();