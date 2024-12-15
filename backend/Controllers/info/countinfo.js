const user = require("../../Models/usertable");
const category = require("../../Models/category");
const order = require("../../Models/order");

const countinfo = async (req, res) => { 
  try {
    // Count the total number of customers
    const totalUsers = await user.countDocuments();

    // Fetch the top 10 latest customers (sorted by creation date in descending order)
    const latestCustomers = await user.find().sort({ createdAt: -1 }).limit(10);

    // Count the total number of categories
    const totalCategories = await category.countDocuments();

    // Count the total number of orders
    const totalOrders = await order.countDocuments();

    // Fetch the top 10 latest orders (sorted by creation date in descending order)
    const latestOrders = await order.find().sort({ createdAt: -1 }).limit(10);

    // Send the response
    res.send({
      status: "successful",
      totalUsers,
      totalOrders,
      totalCategories,
      latestCustomers,
      latestOrders // Include latest orders in the response
    });
  } catch (err) {
    console.log(`Error occurred: ${err}`);
    res.send({
      status: "failed",
      errors: err
    });
  }
};

module.exports = countinfo;
