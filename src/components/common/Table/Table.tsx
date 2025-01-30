import { ReactNode } from "react";
import BootstrapTable from "react-bootstrap/Table";
import { NoRecordIcon } from "../../../assets/icons/icons";
import { clsx } from "../../../utils/utils";
import "./Table.scss";
import Shimmer from "../Shimmer/Shimmer";

export type field = {
  name?: ReactNode;
};

type PropTypes = {
  title?: string;
  className?: string;
  fields?: field[];
  children?: ReactNode;
  loading?: boolean;
};

const Table = ({
  children,
  loading = false,
  title,
  fields,
  className,
}: PropTypes) => {
  return (
    <div className={clsx("custom_table", className)}>
      {title && <h2>{title}</h2>}
      <BootstrapTable responsive>
        {fields && (
          <thead>
            <tr>
              {fields.map((item, index) => {
                return <th key={`${item.name}` + index}>{item.name}</th>;
              })}
            </tr>
          </thead>
        )}
        <tbody>
          {loading
            ? Array.from({ length: 5 }).map((_, index) => {
                return (
                  <tr className="shimmer_effect" key={index}>
                    {Array.from({ length: 1 }).map((_, index) => {
                      return (
                        <td key={index} colSpan={fields?.length}>
                          <Shimmer />
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            : children || (
                <tr>
                  <td colSpan={fields?.length}>
                    <div className="no_record_found">
                      <NoRecordIcon />
                      <p>No Record Found</p>
                    </div>
                  </td>
                </tr>
              )}
        </tbody>
      </BootstrapTable>
    </div>
  );
};

export default Table;
