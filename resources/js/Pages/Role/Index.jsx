import React, { useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { Link } from '@inertiajs/inertia-react';

function Roles() {
  const { roles } = usePage().props; // Mengambil data roles dari props
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredRoles = Array.isArray(roles) ? roles.filter(role => role.name.includes(search)) : [];

  return (
    <div>
      <h2>Roles</h2>
      <p>Daftar peran</p>
      <div className="mt-4 mb-5">
        <div className="flex flex-wrap justify-between mt-1">
          <div className="mt-1 md:w-1/3">
            <form>
              <div className="flex items-center w-full">
                <input
                  type="text"
                  name="search"
                  value={search}
                  onChange={handleSearch}
                  placeholder="Cari"
                  autoComplete="off"
                  className="p-2 rounded border"
                />
                <div className="ml-1">
                  <button type="submit" className="p-2 text-white bg-blue-500 rounded">
                    <i className="icon ion-md-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="mt-1 text-right md:w-1/3">
            <Link href="/roles/create">
              <button className="p-2 text-white bg-green-500 rounded">
                <i className="mr-1 icon ion-md-add"></i>
                Buat
              </button>
            </Link>
          </div>
        </div>
      </div>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border">Nama</th>
            <th className="border"></th>
          </tr>
        </thead>
        <tbody>
          {filteredRoles.map(role => (
            <tr key={role.id}>
              <td className="border">{role.name}</td>
              <td className="border">
                <div>
                  {role.status !== '2' ? (
                    <Link href={`/roles/${role.id}/edit`}>
                      <button className="p-2 text-white bg-yellow-500 rounded">
                        <i className="icon ion-md-create"></i>
                      </button>
                    </Link>
                  ) : (
                    <Link href={`/roles/${role.id}`}>
                      <button className="p-2 text-white bg-blue-500 rounded">
                        <i className="icon ion-md-eye"></i>
                      </button>
                    </Link>
                  )}
                  <form action={`/roles/${role.id}`} method="POST" style={{ display: 'inline' }}>
                    @csrf
                    @method('DELETE')
                    <button type="submit" className="p-2 text-white bg-red-500 rounded">
                      <i className="icon ion-md-trash"></i>
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-4 mt-10">
        {/* pagination */}
      </div>
    </div>
  );
}

export default Roles;
