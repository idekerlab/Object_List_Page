import React from "react";
import { Objects } from "@/types/objects";

interface ObjectsDetailProps {
  object: Objects | null;
}

const ObjectsDetail: React.FC<ObjectsDetailProps> = ({ object }) => {
  if (!object) {
    return (
      <div className="p-6 bg-gray-50 rounded-md">
        <p className="text-gray-500">Select an object to view details</p>
      </div>
    );
  }

  // Helper function to render different types of values
  const renderValue = (value: any) => {
    if (value === undefined || value === null) {
      return <span className="text-gray-400">Not available</span>;
    }

    if (Array.isArray(value)) {
      return (
        <ul className="list-disc pl-5">
          {value.map((item, index) => (
            <li key={index}>
              {typeof item === "object" ? JSON.stringify(item) : item}
            </li>
          ))}
        </ul>
      );
    }

    if (typeof value === "object") {
      return (
        <pre className="bg-gray-50 p-2 rounded overflow-auto text-sm">
          {JSON.stringify(value, null, 2)}
        </pre>
      );
    }

    // Handle strings that might be markdown or contain special formatting
    if (typeof value === "string" && value.startsWith("##")) {
      return <div className="font-semibold">{value}</div>;
    }

    return value;
  };

  // Get all keys from the object except 'id' which we already show in the header
  const keys = Object.keys(object).filter((key) => key !== "id");

  return (
    <div className="p-6 bg-white rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Object Details</h2>

      <div className="mb-4">
        <span className="text-gray-500">ID: </span>
        <span className="font-mono text-sm">{object.id}</span>
      </div>

      <div className="space-y-4">
        {keys.map((key) => (
          <div key={key} className="border-t pt-3">
            <h3 className="text-md font-medium capitalize mb-2">
              {key.replace(/_/g, " ")}
            </h3>
            <div className="text-gray-800">{renderValue(object[key])}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ObjectsDetail;
