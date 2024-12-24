const Usertable = require("../../Models/usertable");

const updateuser = async (req, res) => {
  const userId = req.params.id;
  console.log("Incoming Request:", req.body);
  try {
    const updatedUser = await Usertable.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    console.log("Updated User:", updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ status: "failed", message: "User not found" });
    }

    res.json({ status: "successfully update", data: updatedUser });
  } catch (err) {
    console.error(`Error: ${err}`);
    res.status(500).json({ status: "failed", errors: err.message });
  }
};

module.exports = updateuser;
