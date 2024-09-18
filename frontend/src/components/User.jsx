const User = ({ userId, name, email, role, dateCreated }) => {
  return (
    <tr data-id={userId} className="bg-white hover:bg-gray-50">
      <td className="py-3 px-6 border-b border-gray-200">{name}</td>
      <td className="py-3 px-6 border-b border-gray-200">{email}</td>
      <td className="py-3 px-6 border-b border-gray-200">{role}</td>
      <td className="py-3 px-6 border-b border-gray-200">{dateCreated}</td>
    </tr>
  );
};

export default User;
