const { Router } = require("express");
const createMembershipRules = require("./middlewares/create-membership-rules");
const updateMembershipRules = require("./middlewares/update-membership-rules");

const MembershipModel = require("./memberships-model");

const membershipsRoute = Router();

membershipsRoute.get("/memberships", async(req, res) => {
    const allMemberships = await MembershipModel.find();
    if (!allMemberships) res.json([]);
    else res.json(allCustomers);
})

membershipsRoute.get("/memberships/:id", async (req, res) => {
    const membershipID = req.params.id;
    const foundMembership = await MembershipModel.findById(membershipID);
    if (!foundMembership) {
        return res.status(404).send(`Membership with ID ${membershipID} does not exist.`);
    } else {
        res.status(200).json(foundMembership);
    }
})

membershipsRoute.post("/memberships/:id", createMembershipRules, async (req, res) => {
    const addedMembership = await MembershipModel.create({
        name: "6-month Membership",
        duration: 180,
        cost: 70,
        rentalInclusion: true
    });
    if (!addedMembership) {
        return res.status(500).send(`Oops! Membership couldn't be added!`);
    }
    res.json(addedMembership)
});

membershipsRoute.put("/memberships/:id", updateMembershipRules, async (req, res) => {
    const membershipID = req.params.id
    const foundMembership = await MembershipModel.findById(membershipID);
    if (!foundMembership) {
        return res.status(404).send(`Customer with ID ${membershipID} does not exist.`);
    }
    const updatedMembership = await MembershipModel.findByIdAndUpdate(
        membershipID,
        { $set: { name: "6-month Membership"} },
        { new: true }
    )
    if (!updatedMembership) {
        return res.status(500).send(`Oops! Customer couldn't be updated!`);
    }
    res.json(updatedMembership);
});

membershipsRoute.delete("/memberships/:id", async (req, res) => {
    const membershipID = req.params.id;
    const foundMembership = await MembershipModel.findById(membershipID);
    if (!foundMembership) {
        return res.status(404).send(`Customer with ID ${membershipID} does not exist.`);
    }
    const deletedMembership = await MembershipModel.findByIdAndDelete(membershipID);
    if (!deletedMembership) {
        return res.status(500).send('Oops! Customer could not be deleted!');
    }
    res.json(deletedMembership);
});


module.exports = { membershipsRoute }