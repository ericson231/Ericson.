/*
Added loan and payloan
Modified by AceGerome
Credit to LøüFï/alrulex for source code
*/


const fs = require("fs");

module.exports = {
config: {
		name: "bank",
		version: "1.9",
		author: "LøüFï/alrulex | AceGerome",
		countDown: 5,
		role: 0,
		description: {
			en: "Virtual Bank System"
		},
		category: "game",
		guide: {
			en: "{pn} [ transfer | withdraw | show | deposit | interest | loan | payloan ]" 
			  + "\n{pn} transfer <amount> <Recipient's UID>: Transfer money to another user"
			  + "\n{pn} interest: Claim your interest"
			  + "\n{pn} show: Check your bank account balance"
			  + "\n{pn} deposit <amount>: Deposit money into your bank account"
			  + "\n{pn} withdraw <amount>: Withdraw money from your bank account"
			  + "\n{pn} loan <amount>: Borrow money from the bank"
			  + "\n{pn} payloan <amount>: Repay your loan"
		}
	},
	
	langs: {
	    en: {
	        commandNotFound: "========[💰Bank💰]========\nThe following services are available:\n❏ deposit: Put money into the bank.\n❏ withdraw: withdraw money from the bank in your account.\n❏ show: Show the amount of your bank account.\n❏ interest: You get good interest.\n❏ loan: Borrow money from the bank. \n❏ payloan: Repay the loan \n⭓Use %1help bank to know how to use.\n=========================", 
	        depositAmountNotFound: "Please enter the amount you wish to deposit in the bank", 
	        depositNotEnoughMoney: "You don't have enough money.", 
	        deposit: `%1 $ has been deposited into your bank account.`, 
	        withdrawAmountNotFound: "Please enter the amount you wish to withdraw from your bank account.", 
	        withdrawNotEnoughMoney: "The amount you want to withdraw is not available in your bank account.", 
	        withdraw: `%1 $ has been withdrawn from your bank account.`, 
	        showBank: `Your bank account balance is %1 $.`,
	        interest: "Interest has been added to your bank account balance. The interest earned is %1 $.", 
	        transferAmountNotFound: "Please enter the amount you wish to transfer to the recipient.", 
	        transferNotEnoughMoney: "The amount you wish to transfer is greater than your bank account balance.", 
	        recipientIDNotFound: "Please enter the correct recipient ID.", 
	        transfer: `%1 converted to the recipient with id %2.`,
	        loanAmountNotFound: "Please enter the amount you wish to borrow.", 
	        loanDone: "You already have an existing loan.", 
	        loanMaxAmount: "The maximum loan amount is 100000.", 
	        loan: `You have borrowed %1 $. The loan amount will be deducted from your bank account balance after 1 week.`, 
	        hindiPaNakaLoan: "You don't have an existing loan.",
	        payloanAmountNotFound: `Please enter the amount you wish to pay. The total amount due is %1 $.`, 
	        payloanNotEnoughMoney: "You don't have enough money to pay the loan.",
	        payloanFullAmount: `The amount you entered is less than the total amount due (%1 $). Please pay the full amount.`, 
	        payloan: `You have paid your loan of %1 $ plus interest of %2 $. The total amount paid is %3 $.`
	    }
 	}, 

  onStart: async function ({ args, message, event, usersData, getLang }) {
    const { senderID, messageID, threadID } = event;
    const { getPrefix } = global.utils;
    const prefix = getPrefix(threadID);
    const p = getPrefix(threadID);
    const userMoney = await usersData.get(senderID, "money");
    const user = parseInt(senderID);
    const bankData = JSON.parse(fs.readFileSync("bank.json", "utf8"));

    if (!bankData[user]) {
       bankData[user] = {
         bank: 0, 
         lastInterestClaimed: Date.now()
       };
       fs.writeFileSync("bank.json", JSON.stringify(bankData, null, 2), (err) => {
        if (err) throw err;
      });
    }
    const command = args[0];
    const amount = parseInt(args[1]);
    const recipientUID = parseInt(args[2]);

    /* - - - - DEPOSIT AREA - - - - */

    if (command === "deposit") {
      if (isNaN(amount) || amount <= 0) {
        return message.reply(getLang("depositAmountNotFound"));
      }
      if (userMoney < amount) {
        return message.reply(getLang("depositNotEnoughMoney"));
      }

      bankData[user].bank += amount;
      await usersData.set(event.senderID, {
        money: userMoney - amount
      });

      fs.writeFile("bank.json", JSON.stringify(bankData, null, 2), (err) => {
        if (err) throw err;
      });
      return message.reply(getLang("deposit", amount));
    }
    
    /* - - - - WITHDRAW AREA - - - - */
    
    else if (command === "withdraw") {
      const balance = bankData[user].bank || 0;

      if (isNaN(amount) || amount <= 0) {
        return message.reply(getLang("withdrawAmountNotFound"));
      }
      if (amount > balance) {
        return message.reply(getLang("withdrawNotEnoughMoney"));
      }
      bankData[user].bank = balance - amount;
      const userMoney = await usersData.get(event.senderID, "money");
      await usersData.set(event.senderID, {
        money: userMoney + amount
      });
       fs.writeFile("bank.json", JSON.stringify(bankData, null, 2), (err) => {
        if (err) throw err;
      });
      return message.reply(getLang("withdraw", amount));

    } 
    
    /* - - - - SHOW AREA - - - - */
    
    else if (command === "show") {

      const balance = bankData[user].bank !== undefined && !isNaN(bankData[user].bank) ? bankData[user].bank :0;

  return message.reply(getLang("showBank", balance));

    } 
    
    /* - - - - INTEREST AREA - - - - */
    
    else if (command === "interest") {
      const interestRate = 0.00004; 
      const lastInterestClaimed = bankData[user].lastInterestClaimed || Date.now();
      const currentTime = Date.now();
      const timeDiffInSeconds = (currentTime - lastInterestClaimed) / 1000;
      const interestEarned = bankData[user].bank * (interestRate / 365) * timeDiffInSeconds;
      
        bankData[user].lastInterestClaimed = currentTime;
        bankData[user].bank += interestEarned;
      fs.writeFile("bank.json", JSON.stringify(bankData, null, 2), (err) => {
         if (err) throw err;
     });
     return message.reply(getLang(`interest`, interestEarned.toFixed(2)));
    } 
 
    /* - - - - TRANSFER AREA - - - - */
 
    else if (command === "transfer") {
      const balance = bankData[user].bank || 0;
  
      if (isNaN(amount) || amount <= 0) {
        return message.reply(getLang("transferAmountNotFound"));
      }
      if (balance < amount) {
        return message.reply(getLang("transferNotEnoughMoney"));
      }
      if (isNaN(recipientUID)) {
        return message.reply(getLang("recipientIDNotFound"));
      }
      if (!bankData[recipientUID]) {
            bankData[recipientUID] = {
               bank: 0, 
               lastInterestClaimed: Date.now()
            };
            fs.writeFile("bank.json",     JSON.stringify(bankData, null, 2), (err) => {
                if (err) throw err;
        });
      }
      bankData[user].bank -= amount;
      bankData[recipientUID].bank += amount;
      fs.writeFile("bank.json", JSON.stringify(bankData, null, 2), (err) => {
          if (err) throw err;
      });
      return message.reply(getLang("transfer", amount, recipientUID));
      } 
    
      /* - - - - LOAN AREA - - - - */
    
      else if (command === "loan") {
        if (isNaN(amount) || amount <= 0) {
          return message.reply(getLang("loanAmountNotFound"));
      }
        if (bankData[user].loan > 0) {
          return message.reply(getLang("loanDone"));
      }
        if (amount > 100000) {
          return message.reply(getLang("loanMaxAmount"));
      }
      bankData[user].loan = amount;
      bankData[user].loanDueDate = Date.now() + 7 * 24 * 60 * 60 * 1000; // due date after 1 week
      bankData[user].bank += amount;
      await usersData.set(event.senderID, {
            money: userMoney + amount
      });
      fs.writeFileSync("bank.json", JSON.stringify(bankData, null, 2), (err) => {
         if (err) throw err;
      });
      return message.reply(getLang("loan", amount));
      } 
      
      /* - - - - PAYLOAN AREA - - - - */
      
      else if (command === "payloan") {
        const loan = bankData[user].loan || 0;
        const loanDueDate = bankData[user].loanDueDate || 0;
        
        if (loan <= 0 || loanDueDate <= 0) {
          return message.reply(getLang("hindiPaNakaLoan"));
        }
        const daysLate = Math.ceil((Date.now() - loanDueDate) / (24 * 60 * 60 * 1000));
        const interestRate = 0.0001; // 0.01% per day
        const interest = loan * interestRate * daysLate;
        const totalAmountDue = loan + interest;
        
        if (isNaN(amount) || amount <= 0) {
          return message.reply(getLang("payloanAmountNotFound", totalAmountDue));
        }
        if (amount > userMoney) {
          return message.reply(getLang("payloanNotEnoughMoney"));
        }
        if (amount < totalAmountDue) {
          return message.reply(getLang("payloanFullAmount", totalAmountDue));
        }
        bankData[user].loan = 0;
        bankData[user].loanDueDate = 0;
        bankData[user].bank -= loan;
        await usersData.set(event.senderID, {
             money: userMoney - amount
        });
        fs.writeFile("bank.json", JSON.stringify(bankData, null, 2), (err) => {
             if (err) throw err;
        });
        return message.reply(getLang("payloan", loan, interest.toFixed(2), totalAmountDue));
        } else {
            return message.reply(getLang(`commandNotFound`, prefix));
    } 
  }
}
