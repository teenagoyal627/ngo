import React, { useMemo } from "react";
import "./TableFormate.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ColumnDef,
} from "material-react-table";
import { FaEdit, FaPrint } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import ImageWithModal from "./ImageWithModal";

export type Patient = {
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

const TableFormate = ({
  patients,
  editHandler,
  printHandler,
  deleteHandler,
  printRef,
}) => {
console.log(printHandler)
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
              PatientsDocments: patient.PatientsDocuments || [],
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
          {personalDetails && (
            <div className="subrow-section">
              <h4>Personal Details</h4>
              <table className="subrow-table">
                <thead>
                  <tr>
                    <th>Image of Patient</th>
                    <th>Name</th>
                    <th>Father's Name</th>
                    <th>Gender</th>
                    <th>Address</th>
                    <th>Language Known</th>
                    <th>Aadhar Number</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {personalDetails.ImageUrl ? (
                        <ImageWithModal
                          imageUrl={personalDetails.ImageUrl}
                          showIcon={false}
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>{personalDetails.Name}</td>
                    <td>{personalDetails.FatherName}</td>
                    <td>{personalDetails.Gender}</td>
                    <td>{personalDetails.Address}</td>
                    <td>{personalDetails.LanguageKnown}</td>
                    <td>{personalDetails.AadharNumber}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {ngoDetails && (
            <div className="subrow-section">
              <h4>NGO Details</h4>
              <table className="subrow-table">
                <thead>
                  <tr>
                    <th>Registration No</th>
                    <th>Registration Date</th>
                    <th>Mean Of Transportation</th>
                    <th>Patient Condition</th>
                    <th>Hospital Department</th>
                    <th>Anandam Center</th>
                    <th>Sent To Home</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{ngoDetails.RegistrationNo}</td>
                    <td>{ngoDetails.RegistrationDate}</td>
                    <td>{ngoDetails.MeanOfTransportation}</td>
                    <td>{ngoDetails.PatientCondition}</td>
                    <td>{ngoDetails.HospitalDepartment}</td>
                    <td>{ngoDetails.AnandamCenter}</td>
                    <td>{ngoDetails.SentToHome}</td>
                  </tr>
                </tbody>
              </table>

              <table className="subrow-table">
                <thead>
                  <tr>
                    <th>OPD</th>
                    <th>Inmate Number</th>
                    <th>Brought By</th>
                    <th>IO Name</th>
                    <th>IO Number</th>
                    <th>Patients Documents</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{ngoDetails.OPD}</td>
                    <td>{ngoDetails.InmateNumber}</td>
                    <td>{ngoDetails.BroughtBy}</td>
                    <td>{ngoDetails.IOName}</td>
                    <td>{ngoDetails.IONumber}</td>
                    <td>
                      {ngoDetails.PatientsDocments.length > 0
                        ? ngoDetails.PatientsDocments.map(
                            (docUrl, docIndex) => (
                              <div key={docIndex}>
                                <a
                                  href={docUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Document {docIndex + 1}
                                </a>
                              </div>
                            )
                          )
                        : "No Documents"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </>
      );
    },
  });

  return <MaterialReactTable table={table} />;
};

export default TableFormate;
