import { http } from "../helpers/http";

const ContactApi = {
    async getAllContacts() {
        return await http.get("passenger");
    },
    async getContactsWithLimit(limit = 10, skip = 0) {
        return await http.get(`passenger?limit=${limit}&skip=${skip}`);
    },
    async getContact(contactId) {
        return await http.get(`passenger/${contactId}`);
    },
    async searchContact(query, limit = 10) {
        return await http.get(
            `/passenger/${query}` + `&sort=createdAt DESC&limit=${limit}`
        );
    },
};
export { ContactApi };
