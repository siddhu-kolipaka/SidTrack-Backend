import Portfolio from "../../models/portfolio.js";
import Quote from "../../models/quotes.js";
import quote from "../../utils/stock/quote.js";

const getPortfolio = async (req, res) => {
  const { email } = req.user;

  try {
    quote();
    const portfolios = await Portfolio.find({ email });

    const stockSymbols = portfolios.map((item) => item.stockSymbol);

    const quotes = await Quote.find(
      { stockSymbol: { $in: stockSymbols } },
      "stockSymbol currentPrice previousClosePrice"
    );

    const currentPriceMap = new Map();
    const previousPriceMap = new Map();

    quotes.forEach((quote) => {
      currentPriceMap.set(quote.stockSymbol, quote.currentPrice);
      previousPriceMap.set(quote.stockSymbol, quote.previousClosePrice);
    });

    const bulkOps = portfolios.map((portfolio) => {
      const currentPrice = currentPriceMap.get(portfolio.stockSymbol) || 0;
      const previousClosePrice = previousPriceMap.get(portfolio.stockSymbol);
      const worth = currentPrice * portfolio.qty;
      const gain = worth - portfolio.investment;

      return {
        updateOne: {
          filter: { _id: portfolio._id },
          update: { currentPrice, worth, gain, previousClosePrice },
        },
      };
    });

    if (bulkOps.length > 0) {
      await Portfolio.bulkWrite(bulkOps);
    }

    const groupedStocks = await Portfolio.aggregate([
      { $match: { email } },
      {
        $group: {
          _id: "$stockSymbol",
          stocks: { $push: "$$ROOT" },
        },
      },
    ]).sort({ _id: 1 });

    return res.status(200).json(groupedStocks);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
};

export default getPortfolio;
