import gains from "../../models/gains.js";
import Portfolio from "../../models/portfolio.js";

const modifyPortfolio = async (props) => {
  const { stockSymbol, qty, price, action, purchaseDate, email } = props;

  if (action === "BUY") {
    const newStock = new Portfolio({
      stockSymbol,
      qty,
      purchasePrice: price,
      purchaseDate,
      investment: qty * price,
      email,
    });
    await newStock.save();
    return {
      error: false,
      message: `Successfully bought`,
    };
  } else if (action === "SELL") {
    const portfolioItems = await Portfolio.find({ stockSymbol, email }).sort({
      date: 1,
    });

    if (portfolioItems.length === 0) {
      return {
        error: true,
        message:
          "No portfolio items found for the given stock symbol and email",
      };
    }

    let totalQty = 0;
    portfolioItems.forEach((item) => {
      totalQty += item.qty;
    });
    let gain = 0;

    if (qty > totalQty) {
      return {
        error: true,
        message: `You only have ${totalQty} ${stockSymbol} stocks`,
      };
    }
    let remainingQty = qty;
    for (const item of portfolioItems) {
      if (remainingQty === 0) break;
      const sellQty = Math.min(remainingQty, item.qty);
      item.qty -= sellQty;
      remainingQty -= sellQty;
      gain += sellQty * (price - item.purchasePrice);
      if (item.qty === 0) {
        await Portfolio.findByIdAndDelete({ _id: item._id });
      } else {
        await item.save();
      }
    }

    await gains.create({
      stockSymbol,
      qty,
      sellPrice: price,
      gain,
      date: purchaseDate,
    });

    return {
      error: false,
      message: `Successfully sold`,
    };
  } else {
    return {
      error: true,
      message: `Action not received properly`,
    };
  }
};

export default modifyPortfolio;
