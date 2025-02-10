import yahooFinance from "yahoo-finance2";
import Quote from "../../models/quotes.js";

const quote = async () => {
  try {
    const stocks = await Quote.find({}, "stockSymbol");
    const stockSymbols = stocks.map((stock) => stock.stockSymbol);

    for (const symbol of stockSymbols) {
      try {
        yahooFinance.suppressNotices(["yahooSurvey"]);
        const data = await yahooFinance.quoteCombine(symbol);

        await Quote.updateOne(
          { stockSymbol: symbol },
          {
            currentPrice: data.regularMarketPrice,
            lastUpdated: new Date(),
            previousClosePrice: data.regularMarketPreviousClose,
            currency: data.currency,
          }
        );
      } catch (error) {
        console.error(`Error fetching data for symbol: ${symbol}`, error);
      }
    }
  } catch (error) {
    console.error("Error updating stock prices:", error);
  }
};

export default quote;
