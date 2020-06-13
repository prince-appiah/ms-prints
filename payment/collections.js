/* 
    This is yet to be worked on.
    Have no fair idea on the npm package.
    Your contributions are welcomed.
*/

const momo = require('mtn-momo');
require('dotenv').config({ path: '.env' });

const { Collections } = momo.create({
    callbackHost: process.env.CALLBACK_HOST,
    environment: process.env.ENVIRONMENT
});

const collections = Collections({
    userSecret: process.env.USER_SECRET,
    userId: process.env.USER_ID,
    primaryKey: process.env.PRIMARY_KEY
});

// Request to pay
collections
    .requestToPay({
        amount: "50",
        currency: "EUR",
        externalId: "123456",
        payer: {
            partyIdType: "MSISDN",
            partyId: "0541234567"
        },
        payerMessage: "testing",
        payeeNote: "hello"
    })
    .then(transactionId => {
        console.log('transactionId===', { transactionId });

        // Get transaction status
        return collections.getTransaction(transactionId);
    })
    .then(transaction => {
        console.log('transaction===', { transaction });

        // Get account balance
        return collections.getBalance();
    })
    .then(accountBalance => console.log('account-balance===',{ accountBalance }))
    .catch(error => {
        console.log('error===', error);
    });