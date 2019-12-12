const transact = require('../models/statement')


module.exports = {
    save: function (userID, description, type, currency) {

        return new Promise(function (resolve, reject) {

            var tran = new transact();
            tran.userID = userID;
            tran.description = description;
            tran.currency = currency;
            tran.type = type;
            tran.save(function (err) {

                if (err) {
                    console.log(err);
                    reject(err)
                } else {
                    resolve(true)
                }

            });
        })


    },

    getStatement: function (userID) {
        return new Promise(function (resolve, reject) {
        transact.find({ userID: userID }, function (err, docs) {
            if (typeof docs === 'object' && docs.hasOwnProperty('length')) {
                resolve(docs);
            } else if (err) {
                console.log(err)
                reject(err);
            }
            else
            reject("something went wrong");

        });
    })
    }
};