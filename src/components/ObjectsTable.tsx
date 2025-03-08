import React from "react";
import { Objects } from "@/types/objects";

interface ObjectsTableProps {
  objects: Objects[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onObjectSelect: (id: string) => void;
  selectedObjectId?: string;
}

const ObjectsTable: React.FC<ObjectsTableProps> = ({
  objects,
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onObjectSelect,
  selectedObjectId,
}) => {
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-10 p-2"></th>
              <th className="p-2 text-left">
                <div className="flex items-center">
                  Name
                  <button className="ml-1">▼</button>
                </div>
              </th>
              <th className="p-2 text-left">
                <div className="flex items-center">
                  Created
                  <button className="ml-1">▼</button>
                </div>
              </th>
              <th className="p-2 text-left">Id</th>
              <th className="p-2 text-left">Hypothesis_text</th>
              <th className="p-2 text-left">Data</th>
              <th className="p-2 text-left">Biological_context</th>
              <th className="p-2 text-left">Agent_id</th>
              <th className="p-2 text-left">Dataset_id</th>
            </tr>
          </thead>
          <tbody>
            {objects.map((object) => (
              <tr
                key={object.id}
                className={`border-t hover:bg-gray-50 cursor-pointer ${
                  selectedObjectId === object.id ? "bg-blue-50" : ""
                }`}
                onClick={() => onObjectSelect(object.id)}
              >
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedObjectId === object.id}
                    onChange={() => onObjectSelect(object.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
                <td className="p-2">{object.name || "Unnamed"}</td>
                <td className="p-2">{object.created || "Unknown"}</td>
                <td className="p-2 truncate max-w-[150px]">{object.id}</td>
                <td className="p-2 truncate max-w-[200px]">
                  {object.hypothesis_text || object.Objects_text || "N/A"}
                </td>
                <td className="p-2 truncate max-w-[150px]">
                  {object.data || "N/A"}
                </td>
                <td className="p-2 truncate max-w-[150px]">
                  {object.biological_context || "N/A"}
                </td>
                <td className="p-2 truncate max-w-[150px]">
                  {object.agent_id || "N/A"}
                </td>
                <td className="p-2 truncate max-w-[150px]">
                  {object.dataset_id || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <div>
          Showing {Math.min((currentPage - 1) * pageSize + 1, totalItems)} to{" "}
          {Math.min(currentPage * pageSize, totalItems)} of {totalItems} items
        </div>

        <div className="flex items-center space-x-2">
          <span>Page Size:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="border rounded p-1"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>

          <div className="flex ml-4">
            <button
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded-l disabled:opacity-50"
            >
              ⟪
            </button>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-1 border-t border-b disabled:opacity-50"
            >
              ⟨
            </button>

            <div className="px-4 py-1 border-t border-b">
              Page {currentPage} of {totalPages}
            </div>

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border-t border-b disabled:opacity-50"
            >
              ⟩
            </button>
            <button
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border rounded-r disabled:opacity-50"
            >
              ⟫
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectsTable;
