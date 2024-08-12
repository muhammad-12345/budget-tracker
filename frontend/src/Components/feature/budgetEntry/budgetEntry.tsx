// BudgetEntryList
import React from 'react'

const budgetEntry = () => {
    const entries = [
        { id: 1, date: '2024-08-10', name: 'Groceries', price: 50 },
        { id: 2, date: '2024-08-11', name: 'Utilities', price: 100 },
      ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Budget Entries</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id} className="border-b p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">{entry.name}</p>
              <p className="text-sm text-gray-500">{entry.date}</p>
            </div>
            <div className="flex items-center">
              <p className="mr-4">${entry.price}</p>
              <button className="text-blue-500 mr-2">Edit</button>
              <button className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default budgetEntry
