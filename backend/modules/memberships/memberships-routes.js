const { Router } = require("express");
const createMembershipRules = require("./middlewares/create-membership-rules");
const updateMembershipRules = require("./middlewares/update-membership-rules");
const authorize = require("../../shared/middlewares/authorize");

const MembershipModel = require("./memberships-model");

const membershipsRoute = Router();

membershipsRoute.get("/memberships", async (req, res) => {
  const allMemberships = await MembershipModel.find();
  // if (!allMemberships) {
  //     res.json([]);
  // }
  // else {
  //     console.log("All memberships found.");
  //     res.status(200).json(allMemberships);
  // }

  const search = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 5;

  await MembershipModel.syncIndexes();

  const filteredMemberships = await MembershipModel.find(
    { $text: { $search: search } },
    {
      name: 1,
      duration: 1,
      price: 1,
    },
    {
      sort: { duration: -1 },
      skip: (page - 1) * limit,
      limit: limit,
    }
  );

  const totalCount = await MembershipModel.countDocuments({
    $or: [{ membership_name: { $regex: `${search}`, $options: "i" } }],
  });

  if (search === "") {
    res.json(allMemberships);
  }

  res.json({
    currentPage: page,
    totalPages: totalCount / limit,
    dataPerPage: filteredMemberships.length,
    data: filteredMemberships,
  });
});

membershipsRoute.get("/memberships/:id", async (req, res) => {
  const membershipID = req.params.id;
  const foundMembership = await MembershipModel.findById(membershipID);
  if (!foundMembership) {
    return res
      .status(404)
      .send(`Membership with ID ${membershipID} does not exist.`);
  } else {
    console.log("Membership found.");
    res.status(200).json(foundMembership);
  }
});

membershipsRoute.post(
  "/memberships",
  createMembershipRules,
  authorize(["admin"]),
  async (req, res) => {
    const currentUser = req.account;

    if (currentUser.roles(!includes("admin"))) {
      return res.status(403).send({
        errorMessage: "User does not have valid authentication to add products",
        currentRoles: currentUser.roles,
      });
    }

    const addedMembership = await MembershipModel.create({
      name: "6-month Membership",
      duration: 180,
      cost: 70,
      rentalInclusion: true,
    });
    if (!addedMembership) {
      return res.status(500).send(`Oops! Membership couldn't be added!`);
    }
    console.log("Membership added.");
    res.status(201).json(addedMembership);
  }
);

membershipsRoute.put(
  "/memberships/:id",
  updateMembershipRules,
  authorize(["admin"]),
  async (req, res) => {
    const currentUser = req.account;

    if (currentUser.roles(!includes("admin"))) {
      return res.status(403).send({
        errorMessage: "User does not have valid authentication to add products",
        currentRoles: currentUser.roles,
      });
    }

    const membershipID = req.params.id;
    const foundMembership = await MembershipModel.findById(membershipID);
    if (!foundMembership) {
      return res
        .status(404)
        .send(`Membership with ID ${membershipID} does not exist.`);
    }
    const updatedMembership = await MembershipModel.findByIdAndUpdate(
      membershipID,
      { $set: { name: "6-month Membership" } },
      { new: true }
    );
    if (!updatedMembership) {
      return res.status(500).send(`Oops! Membership couldn't be updated!`);
    }
    console.log("Membership updated.");
    res.status(200).json(updatedMembership);
  }
);

membershipsRoute.delete(
  "/memberships/:id",
  authorize(["admin"]),
  async (req, res) => {
    const currentUser = req.account;

    if (currentUser.roles(!includes("admin", "seller"))) {
      return res.status(403).send({
        errorMessage: "User does not have valid authentication to add products",
        currentRoles: currentUser.roles,
      });
    }

    const membershipID = req.params.id;
    const foundMembership = await MembershipModel.findById(membershipID);
    if (!foundMembership) {
      return res
        .status(404)
        .send(`Membership with ID ${membershipID} does not exist.`);
    }
    const deletedMembership = await MembershipModel.findByIdAndDelete(
      membershipID
    );
    if (!deletedMembership) {
      return res.status(500).send("Oops! Membership could not be deleted!");
    }
    console.log("Membership deleted.");
    res.status(200).json(deletedMembership);
  }
);

module.exports = { membershipsRoute };
