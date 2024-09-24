import React, { useMemo } from "react";
import "./TableFormate.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ColumnDef,
} from "material-react-table";
import { FaEdit, FaPrint } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import ImageWithModal from "../../ImageWithModal/ImageWithModal";
import SubrowFullScreen from "./SubrowFullScreen";

export type Patient = {
  _id(_id: any): void;
  RegistrationNo: string;
  Name: string;
  RegistrationDate: string;
  HospitalDepartment: string;
  AnandamCenter: string;
  ImageUrl?: string;
  subRows?: SubRow[];
};

export type SubRow = {
  // subrows for personal details
  ImageUrl?: string;
  Name: string;
  FatherName: string;
  Address: string;
  LanguageKnown: string;
  Gender: string;
  AadharNumber: string;
  // subrow for NGO details
  RegistrationNo: string;
  RegistrationDate: string;
  MeanOfTransportation: string;
  PatientCondition: string;
  HospitalDepartment: string;
  AnandamCenter: string;
  SentToHome: string;
  OPD: string;
  InmateNumber: string;
  BroughtBy: string;
  IONumber: string;
  IOName: string;
  PatientsDocuments: string;
};

const TableFormateFullScreen = ({
  patients,
  editHandler,
  printHandler,
  deleteHandler,
  printRef,
}) => {

  console.log(patients)
  const columns = useMemo<MRT_ColumnDef<Patient>[]>(
    () => [
      {
        accessorKey: "ImageUrl",
        header: "Image",
        Cell: ({ cell, row }) => {
          if (row.depth === 0) {
            const imageUrl = cell.getValue();
            return <ImageWithModal imageUrl={imageUrl} showIcon={true} />;
          }
          return null;
        },
      },
      {
        accessorKey: "RegistrationNo",
        header: "Registration No",
      },
      {
        accessorKey: "Name",
        header: "Name",
      },
      {
        accessorKey: "RegistrationDate",
        header: "Registration Date",
      },
      {
        accessorKey: "HospitalDepartment",
        header: "Hospital Department",
      },
      {
        accessorKey: "AnandamCenter",
        header: "Anandam Center",
      },
      {
        id: "actions",
        header: "Actions",
        Cell: ({ row }) => {
          if (row.depth === 0) {
            return (
              <div className="action-icons" ref={printRef}>
                <FaEdit
                  onClick={() => editHandler(row.original._id)}
                  className="icon edit-icon"
                />
                <RiDeleteBin6Fill
                  onClick={() => deleteHandler(row.original._id)}
                  className="icon delete-icon"
                />
                <FaPrint
                  onClick={() => printHandler(row.original)}
                  className="icon print-icon"
                />
              </div>
            );
          }
          return null;
        },
      },
    ],
    [editHandler, deleteHandler, printHandler]
  );

  const generateSubRows = (patient) => {
    console.log(patient)
    if (!patient) {
      return null;
    }
    return patient
      ? [
          {
            personalDetails: {
              ImageUrl: patient.ImageUrl || "no image",
              Name: patient.Name || "Unknown",
              FatherName: patient.FatherName || "Unknown",
              Gender: patient.Gender || "Unknown",
              Address: patient.Address || "Unknown",
              LanguageKnown: patient.LanguageKnown || "Unknown",
              AadharNumber: patient.AadharNumber || "Unknown",
            },
            ngoDetails: {
              RegistrationNo: patient.RegistrationNo || "Unknown",
              RegistrationDate: patient.RegistrationDate || "Unknown",
              MeanOfTransportation: patient.MeanOfTransportation || "Unknown",
              PatientCondition: patient.PatientCondition || "Unknown",
              HospitalDepartment: patient.HospitalDepartment || "Unknown",
              AnandamCenter: patient.AnandamCenter || "Unknown",
              SentToHome: patient.SentToHome || "Unknown",
              OPD: patient.OPD || "Unknown",
              InmateNumber: patient.InmateNumber || "Unknown",
              BroughtBy: `${patient.BroughtBy?.Name || "Unknown"}, ${
                patient.BroughtBy?.Address || "Unknown"
              }, ${patient.BroughtBy?.MobileNumber || "Unknown"}, ${
                patient.BroughtBy?.Aadhar || "Unknown"
              }`,
              IONumber: patient.IONumber || "Unknown",
              IOName: patient.IOName || "Unknown",
              // PatientsDocments: patient.PatientsDocuments || [],
              PatientsDocuments: patient.PatientsDocuments?.map(doc => ({
                url: doc.url || "No URL",
                name: doc.name || "No Name",
                size: doc.size || "No Size"
              })) || []
            },
          },
        ]
      : [];
  };

  const tableData = useMemo(() => {
    return patients.map((patient) => {
      const subRows = generateSubRows(patient);
      return {
        ...patient,
        subRows,
      };
    });
  }, [patients]);

  const table = useMaterialReactTable({
    columns,
    data: tableData,
    enableExpanding: true,
    getCanExpand: ({ original }) => !!original.subRows?.length,
    renderDetailPanel: ({ row }) => {
      const { personalDetails, ngoDetails } = row.original.subRows?.[0] || {};
      if (!personalDetails && !ngoDetails) {
        return null;
      }
      return (
        <>
         <SubrowFullScreen personalDetails={personalDetails} ngoDetails={ngoDetails}/>
        </>
      );
    },
  });

  return <MaterialReactTable table={table} />;
};

export default TableFormateFullScreen;
