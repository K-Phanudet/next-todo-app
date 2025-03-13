
const bonusObject = {
  "columns": [
    {
      "key": "id",
      "name": ""
    },
    {
      "key": "no",
      "name": "No."
    },
    {
      "key": "title",
      "name": "Title"
    },
    {
      "key": "desc",
      "name": "Description"
    },
    {
      "key": "date",
      "name": "Created Date"
    }
  ],
  "data": [
    [
      "f22ecad5-cbb6-402b-995f-6867792bc9c6",
      1,
      "Job 1",
      "This is job 1",
      "1 Oct 2023 12:03:48"
    ],
    [
      "6a412fa7-2c3b-4e38-8973-2b32479bffab",
      2,
      "Job 2",
      "This is job 2",
      "11 Oct 2023 10:03:48"
    ],
    [
      "2c302941-3ba7-413d-84a6-20503355b08a",
      3,
      "Job 3",
      "This is job 3",
      "14 Oct 2023 18:34:48"
    ],
    [
      "eff7e063-3e18-4790-95b4-abf62470e874",
      4,
      "Job 4",
      "This is job 4",
      "1 Oct 2023 09:26:48"
    ]
  ]
}

export default async function ServerTodoPage() {
  const { columns, data } = bonusObject
  //Data parsed
  const parsedData = data.map(todo => ({
    id: todo[0],
    no: todo[1],
    title: todo[2],
    desc: todo[3],
    date: todo[4]
  }))

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            {
              columns
                .filter(column => column.key !== 'id')
                .map(column =>
                  <th key={`column-${column.key}`} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {column.name}
                  </th>
                )
            }
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {parsedData.map(({ no, desc, title, date }) => {
            return (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{no}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{desc}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold">
                    {date}
                  </span>
                </td>
              </tr>
            )
          })}

        </tbody>
      </table>
    </div>
  );
}
