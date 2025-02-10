import yahooFinance from "yahoo-finance2";
import Quote from "../../models/quotes.js";
import Transaction from "../../models/transaction.js";
import modifyPortfolio from "../../utils/stock/modifyPortfolio.js";
import quote from "../../utils/stock/quote.js";

const addTransaction = async (req, res) => {
  try {
    const { stockSymbol, quantity, price, action, date } = req.body;
    const userEmail = req.user.email;

    if (!stockSymbol.endsWith(".NS") && !stockSymbol.endsWith(".BO")) {
      return res.status(400).json({
        message: "At the end, add .NS for NSE or .BO for BSE",
      });
    }

    const result = await yahooFinance.search(stockSymbol);
    if (result.quotes.length > 0) {
      const indianExchanges = result.quotes.filter(
        (quote) => quote.exchange === "NSI" || quote.exchange === "BSE"
      );

      if (indianExchanges.length === 0) {
        return res.status(400).json({
          message:
            "No stock with that symbol exists on NSE or BSE. Please check with yahoo finance website for the correct stock symbol",
        });
      }
    } else {
      return res.status(400).json({
        message:
          "No stock with that symbol exists on NSE or BSE. Please check with yahoo finance website for the correct stock symbol",
      });
    }

    const response = await modifyPortfolio({
      stockSymbol,
      qty: quantity,
      price,
      action,
      purchaseDate: date,
      investment: quantity * price,
      email: userEmail,
    });

    if (response.error) {
      return res.status(400).json({ message: response.message });
    }

    const newTransaction = new Transaction({
      stockSymbol,
      qty: quantity,
      price,
      action,
      date,
      email: userEmail,
    });

    await newTransaction.save();

    const stock = await Quote.findOne({ stockSymbol: stockSymbol });
    if (!stock) {
      const newStock = new Quote({ stockSymbol });
      await newStock.save();
    }

    await quote();

    return res.status(201).json({
      message: "Done!",
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "An unexpected error occurred" });
  }
};

export default addTransaction;
