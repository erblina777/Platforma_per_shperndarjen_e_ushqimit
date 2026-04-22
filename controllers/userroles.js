const UserRoles = require('../models/userroles');

const ShtoUserRole = (req, res) => {
  const { user_id, role_id } = req.body;

  UserRoles.assign(user_id, role_id, (data) => {
    res.status(201).json(data);
  });
};

const MerrUserRoles = (req, res) => {
  UserRoles.getAll((data) => res.json(data));
};

const MerrUserRolesByUser = (req, res) => {
  UserRoles.findByUser(req.params.user_id, (data) => {
    res.json(data);
  });
};

const FshijUserRole = (req, res) => {
  UserRoles.delete(req.params.id, () => {
    res.json({ message: "UserRole u fshi" });
  });
};

module.exports = {
  ShtoUserRole,
  MerrUserRoles,
  MerrUserRolesByUser,
  FshijUserRole
};