export default function SimulationHistory({ history }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Simulation History
      </h2>

      {history.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No simulations found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Policy</th>
                <th className="px-4 py-3 text-left">GDP</th>
                <th className="px-4 py-3 text-left">Inflation</th>
                <th className="px-4 py-3 text-left">Unemployment</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    {item.policy_name}
                  </td>

                  <td className="px-4 py-3">
                    {item.gdp}
                  </td>

                  <td className="px-4 py-3">
                    {item.inflation}
                  </td>

                  <td className="px-4 py-3">
                    {item.unemployment}
                  </td>

                  <td className="px-4 py-3">
                    {new Date(item.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

 