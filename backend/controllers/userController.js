const sqlite3 = require('sqlite3').verbose();
const Promise = require('bluebird');
const sqlite = require('sqlite');

const dbPromise = sqlite.open(__dirname+'/../db/users.db', { Promise });

class UserController {

    async getAllUsers(req, res) {
        const page = req.query.page || 0,
              limit = req.query.limit || 10,
              sort = req.query.sort || 'UserID',
              filter = req.query.filter,
              descend = req.query.descend;
        
        const order = descend ? 'DESC' : 'ASC';

        let sqlContacts = `
            SELECT
                Contact.UserID,
                Title,
                Name,
                BirthDate,
                IsFavorite,
                COUNT(ContactDetail.UserID) as ContactCount
            FROM Contact
            LEFT JOIN ContactDetail on Contact.UserID = ContactDetail.UserID
            ${filter ? `WHERE Name LIKE '%${filter}%'` : ''}
            GROUP BY 
                Contact.UserID,
                Title,
                Name,
                BirthDate,
                IsFavorite
            ORDER BY Contact.${sort} ${order} ${sort !== 'UserID' ? ', Contact.UserID' : ''}
            LIMIT ${(page - 1) * limit}, ${limit}
        `;

        let sqlContactsTotal = `
            SELECT COUNT(1) as Total
            FROM Contact
            ${filter ? `WHERE Name LIKE '%${filter}%'` : ''}
        `;

        const db = await dbPromise;
        const [contacts, totalPages] = await Promise.all([
            db.all(sqlContacts),
            db.get(sqlContactsTotal)
        ]);
        
        res.status(200).json({contacts: contacts, totalPages: Math.ceil(totalPages['Total']/limit)});
    }

    async getContactDetails(req, res) {
        const userID = req.params.id;

        let sql = `
            SELECT
                UserID,
                ContactDetailType,
                ContactDetailContent
            FROM ContactDetail
            WHERE UserID = ${userID}
            ORDER BY ContactDetailType, ContactDetailContent
        `;

        const db = await dbPromise;
        const contacts = await db.all(sql);
        res.status(200).json(contacts);
    }
}

module.exports = UserController;