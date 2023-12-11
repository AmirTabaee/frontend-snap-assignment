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
    async searchContact(query, limit = 30) {
        return await http.get(
            `/passenger/?where=${
                typeof query === "string"
                    ? `first-name:{contains:${query}}`
                    : `phoneNumber:{contains:${query}`
            }` + `&sort=createdAt DESC&limit=${limit}`
        );
    },
};
export { ContactApi };
