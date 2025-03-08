"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import SearchBar from "@/components/SearchBar";
import ObjectDetail from "@/components/ObjectDetail";
import { AgGridReact } from "ag-grid-react";
import {
  fetchObjects,
  getObjectsById,
  deleteObjects,
} from "@/services/objectsService";
import { Objects, ObjectsResponse } from "@/types/objects";

// Import AG Grid styles
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function Home() {
  // State for objects data
  const [objects, setObjects] = useState<Objects[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State for pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  // State for search
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("quick");

  // State for selected object
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [selectedObject, setSelectedObject] = useState<Objects | null>(null);
  const [detailLoading, setDetailLoading] = useState<boolean>(false);
  const [panelExpanded, setPanelExpanded] = useState<boolean>(false);

  // AG Grid reference
  const gridRef = useRef<any>(null);

  // Column definitions for AG Grid
  const [colDefs, setColDefs] = useState<any[]>([
    {
      headerName: "",
      field: "checkbox",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      width: 50,
      sortable: false,
      filter: false,
    },
    {
      headerName: "Name",
      field: "name",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Created",
      field: "created",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "ID",
      field: "id",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Hypothesis Text",
      field: "hypothesis_text",
      sortable: true,
      filter: true,
      flex: 2,
    },
    {
      headerName: "Data",
      field: "data",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Biological Context",
      field: "biological_context",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Agent ID",
      field: "agent_id",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Dataset ID",
      field: "dataset_id",
      sortable: true,
      filter: true,
      flex: 1,
    },
  ]);

  // Row data for AG Grid
  const [rowData, setRowData] = useState<any[]>([]);

  // Fetch objects on initial load and when search/pagination changes
  useEffect(() => {
    loadObjects();
  }, [currentPage, pageSize, searchQuery, searchType]);

  // Fetch selected object details when ID changes
  useEffect(() => {
    if (selectedObjectId) {
      loadObjectDetails(selectedObjectId);
      setPanelExpanded(true);
    } else {
      setSelectedObject(null);
      setPanelExpanded(false);
    }
  }, [selectedObjectId]);

  // Function to load objects with current pagination and search
  const loadObjects = async () => {
    try {
      setLoading(true);
      const response = await fetchObjects(
        currentPage,
        pageSize,
        searchQuery,
        searchType
      );

      setObjects(response.hypotheses);
      setTotalItems(response.pagination.totalItems);
      setTotalPages(response.pagination.totalPages);

      // Transform objects to row data for AG Grid
      const rows = response.hypotheses.map((obj) => {
        // Create a new object with all properties from the original
        const row: any = { ...obj };

        // Handle specific fields with fallbacks
        row.hypothesis_text =
          "hypothesis_text" in obj
            ? obj.hypothesis_text
            : obj.Objects_text || "N/A";

        // Add optional fields with fallbacks
        row.data = "data" in obj ? obj.data : "N/A";
        row.biological_context =
          "biological_context" in obj ? obj.biological_context : "N/A";
        row.agent_id = "agent_id" in obj ? obj.agent_id : "N/A";
        row.dataset_id = "dataset_id" in obj ? obj.dataset_id : "N/A";

        return row;
      });

      setRowData(rows);

      // If we have objects but no selection, select the first one
      if (response.hypotheses.length > 0 && !selectedObjectId) {
        setSelectedObjectId(response.hypotheses[0].id);
      }

      setError(null);
    } catch (err) {
      setError("Failed to load objects. Please try again.");
      console.error("Error loading objects:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to load details for a specific object
  const loadObjectDetails = async (id: string) => {
    try {
      setDetailLoading(true);
      const object = await getObjectsById(id);
      setSelectedObject(object);
    } catch (err) {
      console.error("Error loading object details:", err);
    } finally {
      setDetailLoading(false);
    }
  };

  // Handler for search
  const handleSearch = (query: string, type: string) => {
    setSearchQuery(query);
    setSearchType(type);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handler for row click
  const onRowClicked = (event: any) => {
    setSelectedObjectId(event.data.id);
  };

  // Handler for selection changed
  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    if (selectedRows.length > 0) {
      setSelectedObjectId(selectedRows[0].id);
    }
  }, []);

  // Handler for grid size changed
  const onGridSizeChanged = useCallback((params: any) => {
    params.api.sizeColumnsToFit();
  }, []);

  // Handlers for header actions
  const handleNewObject = () => {
    alert("New object functionality would be implemented here");
  };

  const handleImportObject = () => {
    alert("Import object functionality would be implemented here");
  };

  const handleDeleteObject = async () => {
    if (!selectedObjectId) return;

    if (confirm("Are you sure you want to delete this object?")) {
      try {
        await deleteObjects(selectedObjectId);

        // Refresh the list
        loadObjects();

        // Clear selection
        setSelectedObjectId(null);
      } catch (err) {
        console.error("Error deleting object:", err);
        alert("Failed to delete object. Please try again.");
      }
    }
  };

  // Close panel handler
  const handleClosePanel = () => {
    setPanelExpanded(false);
  };

  return (
    <main className="p-4 max-w-7xl mx-auto">
      {/* Header with title and description */}
      <div className="bg-teal-100 p-6 rounded-md mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-2">objects</h1>
        <p className="text-gray-600">
          Objects are the product of the analysis process. Each object is
          self-contained meaning that all the information necessary to reproduce
          the object is stored within it. Objects are importable and exportable
          as a JSON file.
        </p>
      </div>

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Main Content */}
      <div
        className="flex flex-col md:flex-row gap-6"
        style={{ height: "70vh" }}
      >
        {/* AG Grid Table */}
        <div
          className={`panel-transition ${panelExpanded ? "w-1/2" : "w-full"}`}
        >
          {loading ? (
            <div className="text-center py-8">Loading objects...</div>
          ) : rowData.length === 0 ? (
            <div className="text-center py-8">No objects found.</div>
          ) : (
            <div
              className="ag-theme-alpine"
              style={{
                height: "100%",
                width: "100%",
                overflowX: "auto",
                overflowY: "auto",
              }}
            >
              <AgGridReact
                ref={gridRef}
                rowSelection="multiple"
                onSelectionChanged={onSelectionChanged}
                rowData={rowData}
                columnDefs={colDefs}
                paginationPageSize={50}
                onRowClicked={onRowClicked}
                pagination={true}
                onGridSizeChanged={onGridSizeChanged}
                suppressColumnVirtualisation={true}
                // domLayout="autoHeight"
                getRowHeight={() => 40}
              />
            </div>
          )}
        </div>

        {/* Object Detail Panel */}
        {panelExpanded && (
          <div className="panel-transition w-1/2 bg-gray-50 rounded-md overflow-hidden">
            {detailLoading ? (
              <div className="text-center py-8">Loading details...</div>
            ) : (
              <ObjectDetail
                object={selectedObject}
                onClose={handleClosePanel}
              />
            )}
          </div>
        )}
      </div>
    </main>
  );
}
