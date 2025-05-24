import { getUsers } from "@/actions/user";
import { UsersTable } from "@/components/pages/platform/admin/users-table";

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <>
      <h1 className="text-3xl font-bold">Usuários</h1>

      <UsersTable users={users} />
    </>
  );
}
